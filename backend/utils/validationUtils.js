const { body } = require('express-validator');

module.exports = {
    registerValidation: [
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('role').isIn(['student', 'alumni', 'admin']).withMessage('Invalid role')
    ],
    loginValidation: [
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').notEmpty().withMessage('Password is required')
    ]
};
