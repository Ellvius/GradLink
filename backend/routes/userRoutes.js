const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

// Add user
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Get user profile
router.get('/profile', authenticateUser, userController.getUserProfile);

// Update user profile (PATCH for partial update)
router.patch('/profile', authenticateUser, userController.updateProfile);

// Change user password (PATCH for partial update)
router.patch('/change-password', authenticateUser, userController.changePassword);

// Deactivate user account (PATCH for clarity)
router.patch('/deactivate-account', authenticateUser, userController.deactivateAccount);

// List all users (Admin only)
router.get('/', authenticateUser, authorizeRoles('admin'), userController.listUsers);

module.exports = router;
