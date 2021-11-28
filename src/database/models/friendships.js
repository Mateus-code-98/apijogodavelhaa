const Sequelize = require('sequelize');
const database = require('../db')

const Friendship = database.define('Friendships', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    unique: true
  },
  game: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userId_x: {
    type: Sequelize.UUID,
    allowNull: false
  },
  userId_o: {
    type: Sequelize.UUID,
    allowNull: false
  },
  victories_o: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  victories_x: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  turn: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Friendship;