const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware);
router.use(roleMiddleware(['admin']));

router.get('/stats', adminController.getPlatformStatistics);
router.put('/users/:userId', adminController.manageUser);
router.get('/reports', adminController.generateReports);

module.exports = router;
