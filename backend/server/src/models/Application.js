const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  applicantName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  aadharNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  type: {
    type: DataTypes.ENUM('Income', 'Caste', 'Residence', 'Birth', 'Death'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
    defaultValue: 'Pending'
  },
  appliedDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  documents: {
    type: DataTypes.JSONB, // For storing array of URLs
    defaultValue: []
  },
  remarks: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

// Associations
User.hasMany(Application, { foreignKey: 'userId' });
Application.belongsTo(User, { foreignKey: 'userId' });

module.exports = Application;
