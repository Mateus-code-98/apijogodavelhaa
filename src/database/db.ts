import { Sequelize } from 'sequelize';
import { config } from '../config/database'

export const database = new Sequelize(config as any)