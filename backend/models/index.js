const User = require('./user');
const AlumniProfile = require('./alumni-profile');
const Application = require('./application');
const MentorshipRequest = require('./mentorship-request');
const JobPosting = require('./job-posting');
const Event = require('./event');
const EventRegistration = require('./event-registration');

// Define associations
User.hasOne(AlumniProfile, { foreignKey: 'userId', as: 'alumniProfile' });
AlumniProfile.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Application, { foreignKey: 'studentId', as: 'applications' });
Application.belongsTo(User, { foreignKey: 'studentId', as: 'student' });

User.hasMany(MentorshipRequest, { foreignKey: 'studentId', as: 'mentorshipRequests' });
MentorshipRequest.belongsTo(User, { foreignKey: 'studentId', as: 'student' });

Application.belongsTo(JobPosting, { foreignKey: 'jobId' });


//association for event and eventreg
Event.hasMany(EventRegistration, { foreignKey: 'eventId', onDelete: 'CASCADE' });
EventRegistration.belongsTo(Event, { foreignKey: 'eventId' });

User.hasMany(EventRegistration, { foreignKey: 'userId', onDelete: 'CASCADE' });
EventRegistration.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, AlumniProfile, Application, MentorshipRequest, JobPosting };
