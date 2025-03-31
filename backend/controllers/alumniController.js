const AlumniProfile = require('../models/alumni-profile');
const { Op } = require('sequelize');

const User = require('../models/user');
const JobPosting = require('../models/job-posting');
const Event = require('../models/event');
const Application = require('../models/application');
const MentorshipRequest = require('../models/mentorship-request');

class AlumniController {
  // Create or Update Alumni Profile
  async createOrUpdateProfile(req, res) {
    try {
      const userId = req.user.id;
      const {
        firstName,
        lastName,
        gender,
        dateOfBirth,
        email,
        phone,
        graduationYear,
        degreeProgram,
        major,
        company,
        jobTitle,
        privacySettings,
        linkedinUrl,
        twitterUrl,
        facebookUrl,
        instagramUrl
      } = req.body;

      // Convert empty strings to null
      const sanitize = (value) => (value === '' ? null : value);

      const sanitizedData = {
        userId,
        firstName,
        lastName,
        gender,
        dateOfBirth,
        email,
        phone,
        graduationYear,
        degreeProgram,
        major,
        company,
        jobTitle,
        privacySettings,
        linkedinUrl: sanitize(linkedinUrl),
        twitterUrl: sanitize(twitterUrl),
        facebookUrl: sanitize(facebookUrl),
        instagramUrl: sanitize(instagramUrl)
      };

      console.log(sanitizedData);

      const [profile, created] = await AlumniProfile.findOrCreate({
        where: { userId },
        defaults: sanitizedData
      });

      if (!created) {
        // Update existing profile
        Object.assign(profile, sanitizedData);
        await profile.save();
      }

      res.status(created ? 201 : 200).json(profile);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
}

  

  // Get Alumni Profile
  async getProfile(req, res) {
    try {
      const profile = await AlumniProfile.findOne({
        where: { userId: req.user.id },
        include: [{
          model: User,
          as: 'user',
          attributes: ['email', 'role']
        }]
      });

      if (!profile) {
        return res.status(404).json({ error: 'Alumni profile not found' });
      }

      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Search Alumni Profiles
  async searchProfiles(req, res) {
    try {
      const { 
        company, 
        industry, 
        graduationYear, 
        degreeProgram,
        page = 1, 
        limit = 10 
      } = req.query;

      const whereClause = {};

      if (company) {
        whereClause.employmentInformation = {
          [Op.iLike]: `%${company}%`
        };
      }

      if (graduationYear) {
        whereClause.graduationYear = graduationYear;
      }

      if (degreeProgram) {
        whereClause.degreeProgram = {
          [Op.iLike]: `%${degreeProgram}%`
        };
      }

      const profiles = await AlumniProfile.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: (page - 1) * limit,
        order: [['graduationYear', 'DESC']],
        include: [{
          model: User,
          attributes: ['email', 'role']
        }]
      });

      res.json({
        profiles: profiles.rows,
        totalProfiles: profiles.count,
        totalPages: Math.ceil(profiles.count / limit),
        currentPage: page
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get Alumni Statistics
  async getAlumniStatistics(req, res) {
    try {
      const totalAlumni = await User.count({ where: { role: 'alumni' } });
      
      const employmentStats = await AlumniProfile.findAll({
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('id')), 'totalProfiles'],
          [sequelize.fn('COUNT', sequelize.col('employmentInformation')), 'employedAlumni']
        ],
        raw: true
      });

      const graduationYearStats = await AlumniProfile.findAll({
        attributes: [
          'graduationYear',
          [sequelize.fn('COUNT', sequelize.col('id')), 'alumniCount']
        ],
        group: ['graduationYear'],
        order: [['graduationYear', 'DESC']],
        limit: 10
      });

      res.json({
        totalAlumni: totalAlumni,
        employmentStats: employmentStats[0],
        graduationYearStats
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async postJob(req, res) {
    try {
        const { 
            jobTitle, 
            companyName, 
            jobType, 
            location, 
            description, 
            requirements, 
            applicationLink, 
            expirationDate, 
            postedBy 
        } = req.body;

        // Validate required fields
        if (!jobTitle || !companyName || !jobType || !location || !description || !requirements || !applicationLink || !expirationDate || !postedBy) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create job posting
        const job = await JobPosting.create({
            jobTitle,
            companyName,
            jobType,
            location,
            description,
            requirements,
            applicationLink,
            expirationDate,
            postedBy,
            status: 'active' // Default value
        });

        res.status(201).json({ message: 'Job posted successfully', job });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


  async createEvent(req, res) {
    try {
        const { title, description, date, location, organizer } = req.body;

        if (!title || !description || !date || !location || !organizer) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const event = await Event.create({
            title,
            description,
            date,
            location,
            organizer
        });

        res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }



  async viewApplications(req, res) {
    try {
        const alumniId = req.user.id; // Alumni's ID (who posted the job)

        // Find all job postings created by this alumni
        const jobs = await JobPosting.findAll({
            where: { userId: alumniId }, // Assuming JobPosting has a userId field
            attributes: ['id', 'title', 'company']
        });

        if (!jobs.length) {
            return res.status(404).json({ error: 'No jobs found for this alumni' });
        }

        const jobIds = jobs.map(job => job.id);

        // Find applications for those job postings
        const applications = await Application.findAll({
            where: { jobId: jobIds },
            include: [
                {
                    model: User,
                    as: 'student',
                    attributes: ['id', 'firstName', 'lastName', 'email']
                },
                {
                    model: JobPosting,
                    attributes: ['title', 'company']
                }
            ],
            order: [['dateApplied', 'DESC']]
        });

        res.json({
            applications,
            totalApplications: applications.length
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }


  async respondToMentorship(req, res) {
    try {
        const { requestId, status, responseMessage } = req.body;
        const alumniId = req.user.id; // Alumni responding

        // Validate status
        if (!['Accepted', 'Rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status. Use "Accepted" or "Rejected".' });
        }

        // Find mentorship request
        const request = await MentorshipRequest.findOne({
            where: { id: requestId, alumniId }
        });

        if (!request) {
            return res.status(404).json({ error: 'Mentorship request not found or unauthorized.' });
        }

        if (request.status !== 'Pending') {
            return res.status(400).json({ error: 'Request has already been processed.' });
        }

        // Update status and optional response message
        request.status = status;
        if (responseMessage) {
            request.responseMessage = responseMessage;
        }
        await request.save();

        res.json({ message: `Mentorship request ${status.toLowerCase()}.`, request });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AlumniController();