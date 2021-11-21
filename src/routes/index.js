const { Router } = require('express');
const { Login } = require('../controllers/authController');
const { GameRouter } = require('./gameRouter');
const { UserRouter } = require('./userRouter');
const routes = Router()

routes.use('/users', UserRouter)
routes.use('/games', GameRouter)
routes.get('/login', Login)

module.exports = routes