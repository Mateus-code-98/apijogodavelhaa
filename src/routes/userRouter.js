const { Router } = require('express');
const { getAllUsersController } = require('../controllers/userController');

const UserRouter = Router()

UserRouter.get('/', getAllUsersController) // Buscar todos os usuário

module.exports = { UserRouter }