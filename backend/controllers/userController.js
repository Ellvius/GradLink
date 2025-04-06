const User = require('../models/user');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { generateAuthToken } = require('../middleware/authMiddleware');

class UserController {

    async registerUser (req, res) {
      // console.log("registering");
    try {
      const { username, email, password, role } = req.body;
      // console.log(role);
      if (!['student', 'alumni', 'admin'].includes(role)) {
        return res.status(400).json({ error: 'Invalid role' });
      }
  
      const newUser = await User.create({ username, email, password, role });

      const token = generateAuthToken(newUser);
      res.status(201).json({ message: 'User registered successfully',token, userId: newUser.id, role: newUser.role });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Failed to register user' });
    }
  };

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
  
      // Find user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
  
      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
  
      // Generate JWT token
      const token = generateAuthToken(user);
  
      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to login" });
    }
  }
  

  // Get user profile
  async getUserProfile(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ['password'] }
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
          [Op.or]: [{ username }, { email }],
          id: { [Op.ne]: user.id }
        }
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Username or email already in use' });
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

      // Hash new password before saving
      user.password = await bcrypt.hash(newPassword, 10);
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
      let { page = 1, limit = 10, role } = req.query;
      
      // Ensure `page` and `limit` are numbers with reasonable defaults
      const pageNumber = Math.max(parseInt(page) || 1, 1);
      const limitNumber = Math.min(Math.max(parseInt(limit) || 10, 1), 100);

      const whereClause = role ? { role } : {};

      const users = await User.findAndCountAll({
        where: whereClause,
        attributes: { exclude: ['password'] },
        limit: limitNumber,
        offset: (pageNumber - 1) * limitNumber,
        order: [['createdAt', 'DESC']]
      });

      res.json({
        users: users.rows || [],
        totalUsers: users.count,
        totalPages: Math.ceil(users.count / limitNumber),
        currentPage: pageNumber
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
