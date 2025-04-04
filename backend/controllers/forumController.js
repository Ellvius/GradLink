const Forum = require('../models/forum');
const ForumTopic = require('../models/forum-topic');
const ForumReply = require('../models/forum-reply');
const User = require('../models/user'); 
const { Op, literal } = require('sequelize');
const { sequelize } = require('../config/database');


class ForumController {
  // Create Forum
  async createForum(req, res) {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ error: "Title and content are required" });
        }

        const forum = await Forum.create({
            userId: req.user.id,
            title,
            content,
            status: 'active', 
            timestamp: new Date()
        });

        res.status(201).json(forum);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  }


  // List Forums
  async listForums(req, res) {
    try {
        const { search, status = 'active', page = 1, limit = 10 } = req.query;

        const whereClause = { status };

        if (search) {
            whereClause[Op.or] = [
                { title: { [Op.iLike]: `%${search}%` } },
                { content: { [Op.iLike]: `%${search}%` } }
            ];
        }

        const { count, rows } = await Forum.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: (page - 1) * limit,
            order: [['createdAt', 'DESC']],
            attributes: {
                include: [
                    [literal(`(SELECT COUNT(*) FROM "ForumTopics" WHERE "ForumTopics"."forumId" = "Forum"."id")`), 'topicCount']
                ]
            }
        });

        res.json({
            forums: rows,
            totalForums: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }

  // Create Forum Topic
  async createForumTopic(req, res) {
    try {
      const { forumId } = req.params;
      const { title, content } = req.body;

      // Verify forum exists
      const forum = await Forum.findByPk(forumId);
      if (!forum) {
        return res.status(404).json({ error: 'Forum not found' });
      }

      const topic = await ForumTopic.create({
        forumId,
        title,
        content,
        createdBy: req.user.id,
        status: 'active'
      });

      res.status(201).json(topic);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // List Forum Topics
  async listForumTopics(req, res) {
    try {
        const { forumId } = req.params;
        const { search, page = 1, limit = 10 } = req.query;

        const whereClause = {
            forumId,
            status: 'active'
        };

        if (search) {
            whereClause[Op.or] = [
                { title: { [Op.iLike]: `%${search}%` } },
                { content: { [Op.iLike]: `%${search}%` } }
            ];
        }

        const topics = await ForumTopic.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: (page - 1) * limit,
            order: [['createdAt', 'DESC']],
            attributes: {
                include: [
                    // Count replies using a subquery
                    [literal(`(SELECT COUNT(*) FROM "ForumReplies" WHERE "ForumReplies"."topicId" = "ForumTopic"."id")`), 'replyCount']
                ]
            },
            include: [
                {
                    model: User,
                    as: 'creator',
                    attributes: ['username']
                }
            ]
        });

        res.json({
            topics: topics.rows,
            totalTopics: topics.count,
            totalPages: Math.ceil(topics.count / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


  // Add Reply to Topic
  async addTopicReply(req, res) {
    try {
      const { topicId } = req.params;
      const { content } = req.body;

      // Verify topic exists
      const topic = await ForumTopic.findByPk(topicId);
      if (!topic) {
        return res.status(404).json({ error: 'Topic not found' });
      }

      const reply = await ForumReply.create({
        topicId,
        content,
        createdBy: req.user.id
      });

      res.status(201).json(reply);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get Topic Details with Replies
  async getTopicDetails(req, res) {
    try {
      const { topicId } = req.params;
      const { 
        page = 1, 
        limit = 10 
      } = req.query;

      const topic = await ForumTopic.findByPk(topicId, {
        include: [{
          model: ForumReply,
          as: 'replies',
          include: [{
            model: User,
            as: 'creator',
            attributes: ['username']
          }],
          order: [['createdAt', 'ASC']],
          limit: parseInt(limit),
          offset: (page - 1) * limit
        }, {
          model: User,
          as: 'creator',
          attributes: ['username']
        }]
      });

      if (!topic) {
        return res.status(404).json({ error: 'Topic not found' });
      }

      const totalReplies = await ForumReply.count({ where: { topicId } });

      res.json({
        topic,
        totalReplies,
        totalPages: Math.ceil(totalReplies / limit),
        currentPage: page
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Moderate Forum Content (Admin)
  async moderateContent(req, res) {
    try {
      const { contentType, contentId } = req.params;
      const { status } = req.body;

      let content;
      switch (contentType) {
        case 'forum':
          content = await Forum.findByPk(contentId);
          break;
        case 'topic':
          content = await ForumTopic.findByPk(contentId);
          break;
        case 'reply':
          content = await ForumReply.findByPk(contentId);
          break;
        default:
          return res.status(400).json({ error: 'Invalid content type' });
      }

      if (!content) {
        return res.status(404).json({ error: 'Content not found' });
      }

      content.status = status;
      await content.save();

      res.json({message:'Status updated successfully',content});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ForumController();