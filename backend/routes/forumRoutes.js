const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const { authenticateUser } = require('../middleware/authMiddleware');

router.use(authenticateUser);

router.post('/', forumController.createForum);
router.get('/', forumController.listForums);
router.post('/:forumId/topic', forumController.createForumTopic);
router.get('/:forumId/topics', forumController.listForumTopics);
router.post('/topic/:topicId/reply', forumController.addTopicReply);
router.get('/topic/:topicId', forumController.getTopicDetails);
router.patch('/moderate/:contentType/:contentId', forumController.moderateContent);

module.exports = router;