const { Router } = require('express');
const { createGameController, getAllGamesController } = require('../controllers/gameController');

const GameRouter = Router()

GameRouter.post('/', createGameController)
GameRouter.get('/:userId', getAllGamesController)

module.exports = { GameRouter }