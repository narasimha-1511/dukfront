const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const ConversationMessage = sequelize.define('ConversationMessage', {
  sessionId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  isUserMessage: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true 
  },
});

module.exports = ConversationMessage;
