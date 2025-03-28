const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./user');

const MentorshipRequest = sequelize.define('MentorshipRequest', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    studentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    alumniId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Accepted', 'Rejected'),
        defaultValue: 'Pending'
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    responseMessage: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = MentorshipRequest;

