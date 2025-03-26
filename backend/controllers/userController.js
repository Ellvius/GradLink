const User = require('../models/user');
const { Op } = require('sequelize');
const { generateAuthToken } = require('../middleware/authMiddleware');

class UserController {
  // Get user profile
  async getUserProfile(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: { 
          exclude: ['password'] 
        }
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update user profile
  async updateProfile(req, res) {
    try {
      const { username, email } = req.body;

      const user = await User.findByPk(req.user.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if new username or email already exists
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [
            { username: username || user.username },
            { email: email || user.email }
          ],
          id: { [Op.ne]: user.id }
        }
      });

      if (existingUser) {
        return res.status(400).json({ 
          error: 'Username or email already in use' 
        });
      }

      // Update user fields
      user.username = username || user.username;
      user.email = email || user.email;

      await user.save();

      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Change user password
  async changePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;

      const user = await User.findByPk(req.user.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Verify current password
      const isMatch = await user.validatePassword(currentPassword);

      if (!isMatch) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }

      // Update password
      user.password = newPassword;
      await user.save();

      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Soft delete user account
  async deactivateAccount(req, res) {
    try {
      const user = await User.findByPk(req.user.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.accountStatus = 'inactive';
      await user.save();

      res.json({ 
        message: 'Account deactivated successfully',
        status: user.accountStatus 
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // List all users (admin only)
  async listUsers(req, res) {
    try {
      const { page = 1, limit = 10, role } = req.query;
      
      const whereClause = role ? { role } : {};

      const users = await User.findAndCountAll({
        where: whereClause,
        attributes: { exclude: ['password'] },
        limit: parseInt(limit),
        offset: (page - 1) * limit,
        order: [['createdAt', 'DESC']]
      });

      res.json({
        users: users.rows,
        totalUsers: users.count,
        totalPages: Math.ceil(users.count / limit),
        currentPage: page
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();