import Sequelize from 'sequelize'
import { database } from '../db'

export interface UserAttributes {
  id: string
  name: string
  friendlyId: string
  email: string
  photoUrl: string | null
  status: string
  socketId: string | null
}

export interface UserInstance extends Sequelize.Model<UserAttributes, any>, UserAttributes { }

export const User = database.define<UserInstance>('Users', {
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
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'off'
  },
  socketId: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

