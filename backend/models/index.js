const User = require('./user');
const AlumniProfile = require('./alumni-profile');
const Application = require('./application');
const MentorshipRequest = require('./mentorship-request');
const JobPosting = require('./job-posting');
const Event = require('./event');
const EventRegistration = require('./event-registration');

/**  
 * User ↔ AlumniProfile  
 * One-to-One: Each user can have one alumni profile  
 */
User.hasOne(AlumniProfile, { foreignKey: 'userId', as: 'alumniProfile' });
AlumniProfile.belongsTo(User, { foreignKey: 'userId', as: 'user' });

/**  
 * User ↔ Application  
 * One-to-Many: A student (user) can submit multiple job applications  
 */
User.hasMany(Application, { foreignKey: 'studentId', as: 'applications' });
Application.belongsTo(User, { foreignKey: 'studentId', as: 'student' });

/**  
 * User ↔ MentorshipRequest  
 * One-to-Many: A student (user) can send multiple mentorship requests  
 */
User.hasMany(MentorshipRequest, { foreignKey: 'studentId', as: 'mentorshipRequests' });
MentorshipRequest.belongsTo(User, { foreignKey: 'studentId', as: 'student' });

/**  
 * Application ↔ JobPosting  
 * Many-to-One: Each job application belongs to a specific job posting  
 */
Application.belongsTo(JobPosting, { foreignKey: 'jobId' });

/**  
 * User ↔ JobPosting  
 * One-to-Many: A user (alumni/admin) can post multiple jobs  
 */
JobPosting.belongsTo(User, { foreignKey: 'postedBy', as: 'poster' });
User.hasMany(JobPosting, { foreignKey: 'postedBy', as: 'jobPostings' });

/**  
 * Event ↔ EventRegistration  
 * One-to-Many: Each event can have multiple registrations  
 */
Event.hasMany(EventRegistration, { foreignKey: 'eventId', onDelete: 'CASCADE' });
EventRegistration.belongsTo(Event, { foreignKey: 'eventId' });

/**  
 * User ↔ EventRegistration  
 * One-to-Many: Each user can register for multiple events  
 */
User.hasMany(EventRegistration, { foreignKey: 'userId', onDelete: 'CASCADE' });
EventRegistration.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, AlumniProfile, Application, MentorshipRequest, JobPosting, Event, EventRegistration };
