const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const {authenticateUser} = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authenticateUser);
router.use(roleMiddleware(['admin']));

router.get('/stats', adminController.getPlatformStatistics);
router.put('/users/:userId', adminController.manageUser);
router.get('/reports', adminController.generateReports);

module.exports = router;
