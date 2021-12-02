const { Router } = require('express');
const { createFriendshipController, getFriendsController, getFriendshipController } = require('../controllers/friendshipsController');

const FriendshipRouter = Router()

FriendshipRouter.post('/', createFriendshipController)
FriendshipRouter.get('/', getFriendsController)
FriendshipRouter.get('/:friendshipId', getFriendshipController)

module.exports = { FriendshipRouter }