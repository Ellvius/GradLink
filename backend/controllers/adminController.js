const User = require('../models/user');
const JobPosting = require('../models/job-posting');
const Event = require('../models/event');
const ForumTopic = require('../models/forum-topic');
const ForumReply = require('../models/forum-reply');
const Forum = require('../models/forum');
const { sequelize } = require('../config/database');
const { Op } = require('sequelize');

class AdminController {
  // User Management
  async manageUser(req, res) {
    try {
      const { userId } = req.params;
      const { role, accountStatus } = req.body;
      
      const user = await User.findByPk(userId);
      if (!user) return res.status(404).json({ error: 'User not found' });
      
      if (role) user.role = role;
      if (accountStatus) user.accountStatus = accountStatus;
      
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Platform-wide Statistics
  async getPlatformStatistics(req, res) {
    try {
      const statistics = {
        users: await this.getUserStatistics(),
        jobPostings: await this.getJobPostingStatistics(),
        events: await this.getEventStatistics(),
        forums: await this.getForumStatistics()
      };
      res.json(statistics);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get User Statistics
  async getUserStatistics() {
    const userStats = await User.findAll({
      attributes: ['role', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['role']
    });
    const totalUsers = await User.count();
    const activeUsers = await User.count({ where: { accountStatus: 'active' } });
    return { totalUsers, activeUsers, usersByRole: userStats };
  }

  // Get Job Posting Statistics
  async getJobPostingStatistics() {
    const jobStats = await JobPosting.findAll({
      attributes: ['jobType', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['jobType']
    });
    const totalJobPostings = await JobPosting.count();
    const activeJobPostings = await JobPosting.count({
      where: { status: 'active', expirationDate: { [Op.gt]: new Date() } }
    });
    return { totalJobPostings, activeJobPostings, jobTypeStats: jobStats };
  }

  // Get Event Statistics
  async getEventStatistics() {
    const totalEvents = await Event.count();
    const upcomingEvents = await Event.count({ where: { startDate: { [Op.gt]: new Date() } } });
    const pastEvents = await Event.count({ where: { endDate: { [Op.lt]: new Date() } } });
    return { totalEvents, upcomingEvents, pastEvents };
  }

  // Get Forum Statistics
  async getForumStatistics() {
    const totalForums = await Forum.count();
    const totalTopics = await ForumTopic.count();
    const totalReplies = await ForumReply.count();
    return { totalForums, totalTopics, totalReplies };
  }


  async generateReports(req, res) {
    try {
      // Gather statistics
      const userStats = await this.getUserStatistics();
      const jobStats = await this.getJobPostingStatistics();
      const eventStats = await this.getEventStatistics();
      const forumStats = await this.getForumStatistics();
  
      // Construct the report
      const report = {
        generatedAt: new Date(),
        userStatistics: userStats,
        jobPostingStatistics: jobStats,
        eventStatistics: eventStats,
        forumStatistics: forumStats,
      };
  
      res.json(report);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
}

module.exports = new AdminController();
