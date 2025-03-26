const JobPosting = require('../models/job-posting');
const { Op } = require('sequelize');

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
        expirationDate
      } = req.body;

      const jobPosting = await JobPosting.create({
        companyName,
        jobTitle,
        description,
        requirements,
        location,
        jobType,
        postedBy: req.user.id,
        postingDate: new Date(),
        expirationDate,
        status: 'active'
      });

      res.status(201).json(jobPosting);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Search and List Job Postings
  async listJobPostings(req, res) {
    try {
      const { 
        search, 
        jobType, 
        location, 
        page = 1, 
        limit = 10 
      } = req.query;

      const whereClause = {
        status: 'active',
        expirationDate: { [Op.gt]: new Date() }
      };

      if (search) {
        whereClause[Op.or] = [
          { companyName: { [Op.iLike]: `%${search}%` } },
          { jobTitle: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } }
        ];
      }

      if (jobType) {
        whereClause.jobType = jobType;
      }

      if (location) {
        whereClause.location = { [Op.iLike]: `%${location}%` };
      }

      const jobPostings = await JobPosting.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: (page - 1) * limit,
        order: [['postingDate', 'DESC']],
        include: [{
          model: User,
          as: 'poster',
          attributes: ['username', 'email']
        }]
      });

      res.json({
        jobPostings: jobPostings.rows,
        totalJobPostings: jobPostings.count,
        totalPages: Math.ceil(jobPostings.count / limit),
        currentPage: page
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get Job Posting Details
  async getJobPostingDetails(req, res) {
    try {
      const jobPosting = await JobPosting.findByPk(req.params.jobId, {
        include: [{
          model: User,
          as: 'poster',
          attributes: ['username', 'email']
        }]
      });

      if (!jobPosting) {
        return res.status(404).json({ error: 'Job posting not found' });
      }

      res.json(jobPosting);
    } catch (error) {
      res.status(500).json({ error: error.message });
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

      jobPosting.companyName = companyName || jobPosting.companyName;
      jobPosting.jobTitle = jobTitle || jobPosting.jobTitle;
      jobPosting.description = description || jobPosting.description;
      jobPosting.requirements = requirements || jobPosting.requirements;
      jobPosting.location = location || jobPosting.location;
      jobPosting.jobType = jobType || jobPosting.jobType;
      jobPosting.expirationDate = expirationDate || jobPosting.expirationDate;
      jobPosting.status = status || jobPosting.status;

      await jobPosting.save();

      res.json(jobPosting);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete Job Posting (Alumni/Admin)
  async deleteJobPosting(req, res) {
    try {
      const jobPosting = await JobPosting.findByPk(req.params.jobId);

      if (!jobPosting) {
        return res.status(404).json({ error: 'Job posting not found' });
      }

      // Ensure only the poster or an admin can delete
      if (jobPosting.postedBy !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized to delete this job posting' });
      }

      await jobPosting.destroy();

      res.json({ message: 'Job posting deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Job Posting Statistics (Admin)
  async getJobPostingStatistics(req, res) {
    try {
      const totalJobPostings = await JobPosting.count();
      const activeJobPostings = await JobPosting.count({ 
        where: { 
          status: 'active',
          expirationDate: { [Op.gt]: new Date() }
        } 
      });

      const jobTypeStats = await JobPosting.findAll({
        attributes: [
          'jobType',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['jobType'],
        order: [[sequelize.col('count'), 'DESC']]
      });

      res.json({
        totalJobPostings,
        activeJobPostings,
        jobTypeStats
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new JobController();