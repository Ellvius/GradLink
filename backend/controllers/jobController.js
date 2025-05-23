const JobPosting = require('../models/job-posting');
const { Op } = require('sequelize');
const User = require('../models/user');
const Application = require('../models/application');

class JobController {
  // Create Job Posting (Alumni)
  async createJobPosting(req, res) {
    try {
      const {
        companyName,
        jobTitle,
        description,
        requirements,
        location,
        jobType,
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
        postedBy: req.user.id, // Matches the model
        expirationDate,
        applicationLink,
        status: 'active' // Matches ENUM('active', 'closed')
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
      if (jobPosting.postedBy !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized to update this job posting' });
      }

      // Apply changes (ensure it matches the model)
      jobPosting.companyName = companyName || jobPosting.companyName;
      jobPosting.jobTitle = jobTitle || jobPosting.jobTitle;
      jobPosting.description = description || jobPosting.description;
      jobPosting.requirements = requirements || jobPosting.requirements;
      jobPosting.location = location || jobPosting.location;
      jobPosting.jobType = jobType || jobPosting.jobType;
      jobPosting.expirationDate = expirationDate || jobPosting.expirationDate;
      jobPosting.applicationLink = applicationLink || jobPosting.applicationLink;
      jobPosting.status = status || jobPosting.status; // Only 'active' or 'closed' allowed
      console.log(jobPosting);
      await jobPosting.save();

      res.json(jobPosting);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // List all job postings
  async listJobPostings(req, res) {
    try {
      const jobs = await JobPosting.findAll({
        include: [{ model: User, as: 'poster', attributes: ['id', 'username', 'email'] }]
      });
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get details of a specific job posting
  async getJobPostingDetails(req, res) {
    try {
      const jobPosting = await JobPosting.findByPk(req.params.jobId, {
        include: [{ model: User, as: 'poster', attributes: ['id', 'username', 'email'] }]
      });

      if (!jobPosting) {
        return res.status(404).json({ error: 'Job posting not found' });
      }

      res.json(jobPosting);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Apply for a job (Students only)
  async applyForJob(req, res) {
    try {
      const userId = req.user.id; // Get logged-in user ID
      const jobId = req.params.jobId; // Get job ID from request params
      // console.log(userId);
      // Ensure only students can apply
      if (req.user.role !== 'student') {
        return res.status(403).json({ error: 'Only students can apply for jobs' });
      }

      // Check if the job exists
      const job = await JobPosting.findByPk(jobId);
      if (!job) {
        return res.status(404).json({ error: 'Job posting not found' });
      }

      // Prevent duplicate applications
      const existingApplication = await Application.findOne({
        where: { studentId: userId, jobId } // Ensure jobId is correctly used
      });

      if (existingApplication) {
        return res.status(201).json({ message: 'You have already applied for this job' });
      }

      // Create a new application
      const application = await Application.create({
        studentId: userId,
        jobId
      });

      res.status(201).json(application);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async appliedJobs(req, res) {
    try {
      const userId = req.user.id; // Get logged-in user ID
  
      // Ensure only students can view their applications
      if (req.user.role !== 'student') {
        return res.status(403).json({ error: 'Only students can view job applications' });
      }
  
      // Fetch applications along with job details
      const applications = await Application.findAll({
        where: { studentId: userId },
        include: [
          {
            model: JobPosting,
            as: 'JobPosting', // Ensure this matches the alias in your associations
            attributes: ['id', 'jobTitle', 'companyName', 'location', 'createdAt']
          }
        ]
      });
  
      res.status(200).json(applications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
}

module.exports = new JobController();
