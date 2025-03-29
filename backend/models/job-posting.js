const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const JobPosting = sequelize.define('JobPosting', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    companyName: { // Renamed from "company" to match the controller
        type: DataTypes.STRING,
        allowNull: false
    },
    jobTitle: { // Renamed from "title"
        type: DataTypes.STRING,
        allowNull: false
    },
    jobType: { // Added to match the controller
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    requirements: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    applicationLink: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expirationDate: { // Added to match the controller
        type: DataTypes.DATE,
        allowNull: false
    },
    postedBy: { // Added to match the controller
        type: DataTypes.UUID,
        allowNull: false
    },
    status: { // Added to match the controller
        type: DataTypes.ENUM('active', 'closed'),
        allowNull: false,
        defaultValue: 'active'
    }
}, {
    timestamps: true
});

module.exports = JobPosting;
