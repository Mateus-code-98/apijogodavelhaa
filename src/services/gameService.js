const { literal } = require("sequelize")
const { Game } = require("../database/models")

const createGameService = async ({ userId_x, userId_o }) => {
    const game = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]
    const newGame = await Game.create({ userId_x, userId_o, game: JSON.stringify(game), status: 'Pendente' })
    return newGame
}

const getAllGamesService = async ({ userId }) => {
    const query = `(\`userId_x\` = '${userId}') OR (\`userId_o\` = '${userId}')`
    const games = await Game.findAll({ where: literal(query) })
    return games
}

module.exports = { createGameService, getAllGamesService }