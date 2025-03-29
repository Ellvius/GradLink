const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', forumController.getForums);
router.post('/', forumController.createForum);
router.get('/:forumId', forumController.getForumTopics);
router.post('/:forumId/topic', forumController.createTopic);
router.post('/topic/:topicId/reply', forumController.replyToTopic);

module.exports = router;
