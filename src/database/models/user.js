const Sequelize = require('sequelize');
const database = require('../db')

const User = database.define('Users', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    unique: true
  },
  friendlyId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  photoUrl: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

module.exports = User;