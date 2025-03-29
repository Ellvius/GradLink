const JobPosting = require('../models/job-posting');
const { Op } = require('sequelize');
const User = require('../models/user');
const Application = require('../models/application'); 

class JobController {
  // Create Job Posting (Alumni)
  async createJobPosting(req, res) {
    try {
      const {
        companyName,  // Matches model
        jobTitle,     // Matches model
        description,
        requirements,
        location,
        jobType,      // Matches model
        expirationDate,
        applicationLink
      } = req.body;

      const jobPosting = await JobPosting.create({
        companyName,
        jobTitle,
        description,
        requirements,
        location,
        jobType,
        postedBy: req.User.id,
        expirationDate,
        applicationLink,
        status: 'active'
      });

      res.status(201).json(jobPosting);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update Job Posting (Alumni)
  async updateJobPosting(req, res) {
    try {
      const {
        companyName,
        jobTitle,
        description,
        requirements,
        location,
        jobType,
        expirationDate,
        applicationLink,
        status
      } = req.body;

      const jobPosting = await JobPosting.findByPk(req.params.jobId);

      if (!jobPosting) {
        return res.status(404).json({ error: 'Job posting not found' });
      }

      // Ensure only the poster or an admin can update
      if (jobPosting.postedBy.toString() !== req.User.id.toString() && req.User.role !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized to update this job posting' });
    }

      // Apply changes
      jobPosting.companyName = companyName || jobPosting.companyName;
      jobPosting.jobTitle = jobTitle || jobPosting.jobTitle;
      jobPosting.description = description || jobPosting.description;
      jobPosting.requirements = requirements || jobPosting.requirements;
      jobPosting.location = location || jobPosting.location;
      jobPosting.jobType = jobType || jobPosting.jobType;
      jobPosting.expirationDate = expirationDate || jobPosting.expirationDate;
      jobPosting.applicationLink = applicationLink || jobPosting.applicationLink;
      jobPosting.status = status || jobPosting.status;

      await jobPosting.save();

      res.json(jobPosting);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async listJobPostings(req, res) {
    try {
      const jobs = await JobPosting.findAll({
        include: [{ model: User, as: 'poster', attributes: ['id', 'username', 'email'] }],
      });
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  // Get details of a specific job posting (Newly added)
  async getJobPostingDetails(req, res) {
    try {
      const jobPosting = await JobPosting.findByPk(req.params.jobId, {
        include: [{ model: User, as: 'poster', attributes: ['id', 'username', 'email'] }],
      });

      if (!jobPosting) {
        return res.status(404).json({ error: 'Job posting not found' });
      }

      res.json(jobPosting);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async applyForJob(req, res) {
    try {
      const userId = req.User.id; // Get logged-in user ID
      const { jobId } = req.body; // Get job ID from request
  
      // 1. Ensure the user is a student
      if (req.User.role !== 'student') {
        return res.status(403).json({ error: 'Only students can apply for jobs' });
      }
  
      // 2. Check if the job exists
      const job = await JobPosting.findByPk(jobId);
      if (!job) {
        return res.status(404).json({ error: 'Job posting not found' });
      }
  
      // 3. Prevent duplicate applications
      const existingApplication = await Application.findOne({
        where: { studentId: userId, jobId }
      });
  
      if (existingApplication) {
        return res.status(400).json({ error: 'You have already applied for this job' });
      }
  
      // 4. Create a new application
      const application = await Application.create({
        studentId: userId,
        jobId
      });
  
      res.status(201).json(application);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new JobController();
