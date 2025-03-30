const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const { authenticateUser, authorizeRoles} = require('../middleware/authMiddleware');

router.use(authenticateUser);

router.post('/', forumController.createForum);
router.get('/', forumController.listForums);
router.get('/topic/:topicId', forumController.getTopicDetails);
router.post('/topic/:topicId/reply', forumController.addTopicReply);
router.patch('/moderate/:contentType/:contentId', authorizeRoles('admin'),forumController.moderateContent);
router.post('/:forumId/topic', forumController.createForumTopic);
router.get('/:forumId/topics', forumController.listForumTopics);

module.exports = router;