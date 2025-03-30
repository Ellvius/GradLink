const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { authenticateUser } = require('../middleware/authMiddleware');

router.use(authenticateUser);

router.post('/', messageController.sendMessage);
router.get('/', messageController.getMessages);
router.delete('/:messageId', messageController.deleteMessage);

module.exports = router;
