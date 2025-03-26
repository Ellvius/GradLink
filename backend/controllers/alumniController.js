const AlumniProfile = require('../models/alumni-profile');
const User = require('../models/user');
const { Op } = require('sequelize');

class AlumniController {
  // Create or Update Alumni Profile
  async upsertProfile(req, res) {
    try {
      const userId = req.user.id;
      const {
        firstName,
        lastName,
        gender,
        dateOfBirth,
        contactInformation,
        graduationYear,
        degreeProgram,
        major,
        employmentInformation,
        profilePicture,
        socialMediaLinks,
        privacySettings
      } = req.body;

      const [profile, created] = await AlumniProfile.findOrCreate({
        where: { userId },
        defaults: {
          userId,
          firstName,
          lastName,
          gender,
          dateOfBirth,
          contactInformation,
          graduationYear,
          degreeProgram,
          major,
          employmentInformation,
          profilePicture,
          socialMediaLinks,
          privacySettings
        }
      });

      if (!created) {
        // Update existing profile
        Object.assign(profile, {
          firstName,
          lastName,
          gender,
          dateOfBirth,
          contactInformation,
          graduationYear,
          degreeProgram,
          major,
          employmentInformation,
          profilePicture,
          socialMediaLinks,
          privacySettings
        });

        await profile.save();
      }

      res.status(created ? 201 : 200).json(profile);
    } catch (error) {
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
}

module.exports = new AlumniController();