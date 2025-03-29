const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Event = require('./event');
const User = require('./user'); // Assuming you have a User model

const EventRegistration = sequelize.define('EventRegistration', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    eventId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Event,
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    registrationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: true
});

// Associations
Event.hasMany(EventRegistration, { foreignKey: 'eventId', onDelete: 'CASCADE' });
EventRegistration.belongsTo(Event, { foreignKey: 'eventId' });

User.hasMany(EventRegistration, { foreignKey: 'userId', onDelete: 'CASCADE' });
EventRegistration.belongsTo(User, { foreignKey: 'userId' });

module.exports = EventRegistration;
