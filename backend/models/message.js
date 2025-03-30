// models/message.js
const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');
const User = require('./user');

const Message = sequelize.define('Message', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    senderId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    },
    receiverId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: true
});

module.exports = Message;
