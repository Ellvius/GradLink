const Event = require('../models/event');
const EventRegistration = require('../models/event-registration');
const { Op } = require('sequelize');

class EventController {
  // Create Event (Alumni/Admin)
  async createEvent(req, res) {
    try {
      const {
        title,
        description,
        startDateTime,
        endDateTime,
        location,
        capacity
      } = req.body;

      const event = await Event.create({
        title,
        description,
        startDateTime,
        endDateTime,
        location,
        capacity,
        createdBy: req.user.id
      });

      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get Event Details
  async getEventDetails(req, res) {
    try {
      const event = await Event.findByPk(req.params.eventId, {
        include: [{
          model: EventRegistration,
          attributes: ['userId']
        }]
      });

      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      res.json(event);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Search and List Events
  async listEvents(req, res) {
    try {
      const { 
        search, 
        startDate, 
        endDate, 
        page = 1, 
        limit = 10 
      } = req.query;

      const whereClause = {};

      if (search) {
        whereClause[Op.or] = [
          { title: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } }
        ];
      }

      if (startDate && endDate) {
        whereClause.startDateTime = {
          [Op.between]: [startDate, endDate]
        };
      }

      const events = await Event.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: (page - 1) * limit,
        order: [['startDateTime', 'ASC']],
        include: [{
          model: EventRegistration,
          attributes: ['userId']
        }]
      });

      res.json({
        events: events.rows,
        totalEvents: events.count,
        totalPages: Math.ceil(events.count / limit),
        currentPage: page
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Register for Event
  async registerForEvent(req, res) {
    try {
      const eventId = req.params.eventId;
      const userId = req.user.id;

      // Check if event exists
      const event = await Event.findByPk(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      // Check event capacity
      const registrationCount = await EventRegistration.count({ 
        where: { eventId } 
      });

      if (registrationCount >= event.capacity) {
        return res.status(400).json({ error: 'Event is at full capacity' });
      }

      // Check if already registered
      const existingRegistration = await EventRegistration.findOne({
        where: { eventId, userId }
      });

      if (existingRegistration) {
        return res.status(400).json({ error: 'Already registered for this event' });
      }

      // Create registration
      const registration = await EventRegistration.create({
        eventId,
        userId,
        registrationDate: new Date()
      });

      res.status(201).json(registration);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Cancel Event Registration
  async cancelEventRegistration(req, res) {
    try {
      const eventId = req.params.eventId;
      const userId = req.user.id;

      const registration = await EventRegistration.findOne({
        where: { eventId, userId }
      });

      if (!registration) {
        return res.status(404).json({ error: 'Registration not found' });
      }

      await registration.destroy();

      res.json({ message: 'Event registration cancelled successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get User's Event Registrations
  async getUserEventRegistrations(req, res) {
    try {
      const registrations = await EventRegistration.findAll({
        where: { userId: req.user.id },
        include: [{
          model: Event,
          attributes: ['title', 'startDateTime', 'endDateTime', 'location']
        }],
        order: [['registrationDate', 'DESC']]
      });

      res.json(registrations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // List all the events
  async getAllEvents(req, res) {
    try {
      const events = await Event.findAll({
        order: [['date', 'ASC']]
      });
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
}

module.exports = new EventController();