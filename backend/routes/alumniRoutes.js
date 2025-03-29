const express = require('express');
const router = express.Router();
const alumniController = require('../controllers/alumniController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware.authenticateUser);
router.use(roleMiddleware(['alumni']));

router.post('/profile', alumniController.createOrUpdateProfile);
router.get('/profile', alumniController.getProfile);
router.post('/job', alumniController.postJob);
router.post('/event', alumniController.createEvent);
// router.get('/applications', alumniController.viewApplications);
// router.post('/mentor-request', alumniController.respondToMentorship);

module.exports = router;
