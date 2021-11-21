const Sequelize = require('sequelize');
const database = require('../db')

const Games = database.define('Games', {
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
  lastPlayerId: {
    type: Sequelize.UUID,
    allowNull: true
  },
  winnerId: {
    type: Sequelize.UUID,
    allowNull: true
  },
  loserId: {
    type: Sequelize.UUID,
    allowNull: true
  }
})

module.exports = Games;