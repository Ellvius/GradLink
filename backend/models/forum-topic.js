const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Forum = require('./forum');
const User = require('./user');

const ForumTopic = sequelize.define('ForumTopic', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    forumId: {
        type: DataTypes.UUID,
        references: {
            model: Forum,
            key: 'id'
        },
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
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
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
    }
}, {
    timestamps: true
});

module.exports = ForumTopic;
