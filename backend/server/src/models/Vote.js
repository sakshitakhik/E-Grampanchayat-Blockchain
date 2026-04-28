const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');
const Poll = require('./Poll');

const Vote = sequelize.define('Vote', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  pollId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Poll,
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  optionIndex: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  indexes: [
    {
      unique: true,
      fields: ['pollId', 'userId']
    }
  ]
});

Poll.hasMany(Vote, { foreignKey: 'pollId' });
Vote.belongsTo(Poll, { foreignKey: 'pollId' });

User.hasMany(Vote, { foreignKey: 'userId' });
Vote.belongsTo(User, { foreignKey: 'userId' });

module.exports = Vote;
