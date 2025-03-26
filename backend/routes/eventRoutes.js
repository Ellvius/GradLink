const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', eventController.getAllEvents);
router.post('/', eventController.createEvent);
router.get('/:eventId', eventController.getEvent);
router.post('/:eventId/register', eventController.registerForEvent);

module.exports = router;
 