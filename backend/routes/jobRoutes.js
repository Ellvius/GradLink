const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', jobController.getAllJobs);
router.post('/', jobController.createJob);
router.get('/:jobId', jobController.getJob);
router.post('/:jobId/apply', jobController.applyForJob);

module.exports = router;
