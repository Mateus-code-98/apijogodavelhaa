const { createGameService, getAllGamesService } = require("../services/gameService")

const createGameController = async (req, res, next) => {
    const { userId_x, userId_o } = req.body

    const newGame = await createGameService({ userId_x, userId_o })

    return res.json(newGame)
}

const getAllGamesController = async (req, res, next) => {
    const { userId } = req.params

    const games = await getAllGamesService({ userId })

    return res.json(games)
}

module.exports = { createGameController, getAllGamesController }