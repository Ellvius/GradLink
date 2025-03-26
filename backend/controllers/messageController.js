const Message = require('../models/message');
const User = require('../models/user');

class MessageController {
  // Send a new message
  async sendMessage(req, res) {
    try {
      const { senderId, receiverId, content } = req.body;

      if (!senderId || !receiverId || !content) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const sender = await User.findByPk(senderId);
      const receiver = await User.findByPk(receiverId);
      
      if (!sender || !receiver) {
        return res.status(404).json({ error: 'User not found' });
      }

      const message = await Message.create({ senderId, receiverId, content });

      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get messages between two users
  async getMessages(req, res) {
    try {
      const { userId1, userId2 } = req.params;

      const messages = await Message.findAll({
        where: {
          [Op.or]: [
            { senderId: userId1, receiverId: userId2 },
            { senderId: userId2, receiverId: userId1 }
          ]
        },
        order: [['createdAt', 'ASC']]
      });

      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete a message
  async deleteMessage(req, res) {
    try {
      const { messageId } = req.params;
      const message = await Message.findByPk(messageId);

      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }

      await message.destroy();
      res.json({ message: 'Message deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new MessageController();
