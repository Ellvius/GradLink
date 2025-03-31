const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');
const { READUNCOMMITTED } = require('sequelize/lib/table-hints');

router.use(authenticateUser);

router.post('/', authorizeRoles('alumni','admin'), jobController.createJobPosting);
router.get('/applied', jobController.appliedJobs);
router.put('/:jobId', authorizeRoles('alumni','admin'), jobController.updateJobPosting);
router.get('/', jobController.listJobPostings);
router.get('/:jobId', jobController.getJobPostingDetails);
router.post('/:jobId/apply', jobController.applyForJob);

module.exports = router;
