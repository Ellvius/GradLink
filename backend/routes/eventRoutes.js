const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authenticateUser);

router.get('/', eventController.getAllEvents);
router.post('/', authorizeRoles(['admin', 'alumni']), eventController.createEvent);
router.get('/:eventId', eventController.getEventDetails);
router.post('/:eventId/register', eventController.registerForEvent);
router.post('/:eventId/cancel-registration', eventController.cancelEventRegistration);
router.get('/search', eventController.listEvents);
router.get('/user-registrations', eventController.getUserEventRegistrations);

module.exports = router;
 