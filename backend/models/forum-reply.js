const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const ForumTopic = require('./forum-topic');
const User = require('./user');

const ForumReply = sequelize.define('ForumReply', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    topicId: {
        type: DataTypes.UUID,
        references: {
            model: ForumTopic,
            key: 'id'
        },
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'pending', 'hidden', 'deleted'),
        defaultValue: 'active',
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = ForumReply;
