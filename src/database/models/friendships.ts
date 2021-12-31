import Sequelize from 'sequelize'
import { database } from '../db'

export interface FriendshipAttributes {
  id: string
  game: string
  status: string
  userId_x: string
  userId_o: string
  victories_o: string
  victories_x: string
  turn: string
  winner: string | null
  request_x: string | null
  request_o: string | null
  playerO?: any
  playerX?: any
}

interface FriendshipInstance extends Sequelize.Model<FriendshipAttributes, any>, FriendshipAttributes { }

export const Friendship = database.define<FriendshipInstance>('Friendships', {
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
  },
  winner: {
    type: Sequelize.STRING,
    allowNull: true
  },
  request_x: {
    type: Sequelize.STRING,
    allowNull: true
  },
  request_o: {
    type: Sequelize.STRING,
    allowNull: true
  }
})