const User = require('./user');
const AlumniProfile = require('./alumni-profile');
const Application = require('./application');
const MentorshipRequest = require('./mentorship-request');
const JobPosting = require('./job-posting');
const Event = require('./event');
const EventRegistration = require('./event-registration');
const Forum = require('./forum');
const ForumTopic = require('./forum-topic');
const ForumReply = require('./forum-reply');

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

/**  
 * User ↔ Forum  
 * One-to-Many: A user can create multiple forums  
 */
User.hasMany(Forum, { foreignKey: 'userId', as: 'forums' });
Forum.belongsTo(User, { foreignKey: 'userId', as: 'creator' });

/**  
 * Forum ↔ ForumTopic  
 * One-to-Many: A forum can have multiple topics  
 */
Forum.hasMany(ForumTopic, { foreignKey: 'forumId', as: 'topics', onDelete: 'CASCADE' });
ForumTopic.belongsTo(Forum, { foreignKey: 'forumId', as: 'forum' });

/**  
 * User ↔ ForumTopic  
 * One-to-Many: A user can create multiple topics  
 */
User.hasMany(ForumTopic, { foreignKey: 'createdBy', as: 'forumTopics' });
ForumTopic.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

/**  
 * ForumTopic ↔ ForumReply  
 * One-to-Many: A topic can have multiple replies  
 */
ForumTopic.hasMany(ForumReply, { foreignKey: 'topicId', as: 'replies', onDelete: 'CASCADE' });
ForumReply.belongsTo(ForumTopic, { foreignKey: 'topicId', as: 'topic' });

/**  
 * User ↔ ForumReply  
 * One-to-Many: A user can post multiple replies  
 */
User.hasMany(ForumReply, { foreignKey: 'createdBy', as: 'forumReplies' });
ForumReply.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

module.exports = { 
    User, 
    AlumniProfile, 
    Application, 
    MentorshipRequest, 
    JobPosting, 
    Event, 
    EventRegistration, 
    Forum, 
    ForumTopic, 
    ForumReply 
};
