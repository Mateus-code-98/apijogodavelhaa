import { Router } from 'express'
import { createFriendshipController, getFriendsController, getFriendshipController } from '../controllers/friendshipsController'

const FriendshipRouter = Router()

FriendshipRouter.post('/', createFriendshipController)
FriendshipRouter.get('/', getFriendsController)
FriendshipRouter.get('/:friendshipId', getFriendshipController)

export { FriendshipRouter }