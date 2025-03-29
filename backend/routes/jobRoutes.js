const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.use(authenticateUser);

router.post('/', authorizeRoles(['alumni']), jobController.createJobPosting);
router.put('/:jobId', authorizeRoles(['alumni']), jobController.updateJobPosting);
router.get('/', jobController.listJobPostings);
router.get('/:jobId', jobController.getJobPostingDetails);
router.post('/:jobId/apply', jobController.applyForJob);

module.exports = router;
