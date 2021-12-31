import e, { Router } from 'express'
import { loginOrCreateUserController } from '../controllers/userController'
import { UserAuthenticated } from '../middlewares/userAuthenticated'
import { FriendshipRouter } from './friendshipRouter'
import { UserRouter } from './userRouter'
const routes = Router()

routes.use('/users', UserRouter)
routes.use('/friendships', UserAuthenticated, FriendshipRouter)
routes.post('/login', loginOrCreateUserController)

export { routes }