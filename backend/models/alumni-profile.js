// models/alumni-profile.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./user');

const AlumniProfile = sequelize.define('AlumniProfile', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    gender: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    contactInformation: DataTypes.STRING,
    graduationYear: DataTypes.INTEGER,
    degreeProgram: DataTypes.STRING,
    major: DataTypes.STRING,
    employmentInformation: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    privacySettings: DataTypes.STRING,
    socialMediaLinks: DataTypes.JSON
}, {
    timestamps: true
});

module.exports = AlumniProfile;
