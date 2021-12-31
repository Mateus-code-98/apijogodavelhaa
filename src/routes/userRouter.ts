import { Router } from 'express'
import { getAllUsersController } from '../controllers/userController'

const UserRouter = Router()

UserRouter.get('/', getAllUsersController) // Buscar todos os usuário

export { UserRouter }