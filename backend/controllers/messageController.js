const { Op } = require('sequelize');
const Message = require('../models/message');
const User = require('../models/user');

class MessageController {
  // 📩 Send a new message
  async sendMessage(req, res) {
    try {
      const { receiverId, content } = req.body;
      const senderId = req.user.id; // Get sender ID from auth middleware

      if (!receiverId || !content) {
        return res.status(400).json({ error: 'Receiver and content are required' });
      }

      const receiver = await User.findByPk(receiverId);
      if (!receiver) {
        return res.status(404).json({ error: 'Receiver not found' });
      }

      const message = await Message.create({ senderId, receiverId, content });
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 💬 Get messages between logged-in user and another user

async getMessages(req, res) {
    try {
        const userId = req.user.id; // Logged-in user

        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    { senderId: userId },
                    { receiverId: userId }
                ]
            },
            order: [['createdAt', 'ASC']]
        });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


  // 🗑️ Delete a message (Only the sender can delete)
  async deleteMessage(req, res) {
    try {
      const { messageId } = req.params;
      const userId = req.user.id; // Logged-in user

      const message = await Message.findByPk(messageId);
      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }

      if (message.senderId !== userId) {
        return res.status(403).json({ error: 'You can only delete your own messages' });
      }

      await message.destroy();
      res.json({ message: 'Message deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new MessageController();
