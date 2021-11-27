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
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  photoUrl:{
    type: Sequelize.STRING,
    allowNull: true
  }
})

module.exports = User;