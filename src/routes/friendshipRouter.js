const { Router } = require('express');
const { createFriendshipController, getFriendsController } = require('../controllers/friendshipsController');

const FriendshipRouter = Router()

FriendshipRouter.post('/',createFriendshipController)
FriendshipRouter.get('/',getFriendsController)
 
module.exports = { FriendshipRouter }