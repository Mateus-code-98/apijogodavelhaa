const { Router } = require('express');
const { loginOrCreateUserController } = require('../controllers/userController');
const { GameRouter } = require('./gameRouter');
const { UserRouter } = require('./userRouter');
const routes = Router()

routes.use('/users', UserRouter)
routes.use('/games', GameRouter)
routes.post('/login', loginOrCreateUserController)

module.exports = routes