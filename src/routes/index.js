const { Router } = require('express');
const { loginOrCreateUserController } = require('../controllers/userController');
const { UserAuthenticated } = require('../middlewares/userAuthenticated');
const { FriendshipRouter } = require('./friendshipRouter');
const { UserRouter } = require('./userRouter');
const routes = Router()

routes.use('/users', UserRouter)
routes.use('/friendships', UserAuthenticated, FriendshipRouter)
routes.post('/login', loginOrCreateUserController)

module.exports = routes