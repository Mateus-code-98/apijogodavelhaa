const { literal } = require("sequelize")
const { Friendship, User } = require("../database/models")
const AppError = require("../errors/AppError")

const createFriendshipService = async ({ userId_x, userId_o }) => {
    const friendship = await Friendship.findOne({ where: [{ userId_x }, { userId_o }] })
    if (friendship) throw new AppError('Você já tem uma amizade com este usuário!', 400)
    const dataNewFriendship = {
        game: JSON.stringify([[0, 0, 0], [0, 0, 0], [0, 0, 0]]),
        status: "inProgress",
        victories_o: 0,
        victories_x: 0,
        turn: userId_x,
        userId_o,
        userId_x
    }
    const newFriendship = await Friendship.create(dataNewFriendship)
    return newFriendship
}

const getFriendsService = async ({ userId }) => {
    const friends = []
    const query = `(\`userId_x\` = '${userId}') OR (\`userId_o\` = '${userId}')`

    const friendships = await Friendship.findAll({
        where: literal(query),
        include: [
            { model: User, as: 'playerX' },
            { model: User, as: 'playerO' }
        ]
    })

    friendships.forEach((friendship) => {
        if (friendship.userId_x === userId) friends.push({ ...friendship.playerO.dataValues, friendshipId: friendship.id })
        else friends.push({ ...friendship.playerX.dataValues, friendshipId: friendship.id })
    })

    return friends
}

const getFriendshipService = async ({ friendshipId }) => {
    const friendship = await Friendship.findByPk(friendshipId,
        {
            include: [
                { model: User, as: 'playerX' },
                { model: User, as: 'playerO' }
            ]
        }
    )
    return friendship
}

const newMoveService = async ({ friendshipId, x, y }) => {
    const friendship = await getFriendshipService({ friendshipId })

    const newMoveType = friendship.turn === friendship.playerO.id ? 1 : -1
    const newTurn = friendship.turn === friendship.playerO.id ? friendship.playerX.id : friendship.playerO.id

    const gameArray = JSON.parse(friendship.game)
    gameArray[y][x] = newMoveType

    const hasWinner = hasWinnerService({ game: gameArray })

    if (hasWinner.status) {
        friendship.status = 'finished'
        friendship.winner = hasWinner.type
        if (hasWinner.type === 'X') friendship.victories_x += 1
        else friendship.victories_o += 1
    }
    else {
        const isEnd = isFinished({ game: gameArray })
        if (isEnd) friendship.status = 'finished'
    }

    friendship.turn = newTurn
    friendship.game = JSON.stringify(gameArray)

    await friendship.save()

    return friendship
}

const hasWinnerService = ({ game }) => {

    for (let i = 0; i < 3; i++) {
        const line = []
        const column = []
        for (let j = 0; j < 3; j++) {
            line.push(game[i][j])
            column.push(game[j][i])
        }
        const resu_line = thisLineIsCompletedService(line)
        const resu_column = thisLineIsCompletedService(column)
        if (resu_line.status) return resu_line
        if (resu_column.status) return resu_column
    }

    const case_especific_1 = thisLineIsCompletedService([game[0][0], game[1][1], game[2][2]])
    const case_especific_2 = thisLineIsCompletedService([game[0][2], game[1][1], game[2][0]])
    if (case_especific_1.status) return case_especific_1
    if (case_especific_2.status) return case_especific_2

    return { status: false }
}

const thisLineIsCompletedService = (line) => {
    let contX = 0;
    let contO = 0;
    line.forEach((item) => {
        if (item === 1) contO++
        else if (item === -1) contX++
    })

    if (contO === 3) return { status: true, type: 'O' }
    if (contX === 3) return { status: true, type: 'X' }
    return { status: false }
}

const isFinished = ({ game }) => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (game[i][j] === 0) return false
        }
    }
    return true
}

const requestService = async ({ userId, friendshipId }) => {
    const friendship = await getFriendshipService({ friendshipId })
    
    if (friendship.userId_o === userId) friendship.request_o = "required"
    else friendship.request_x = "required"

    if (friendship.request_x === "required" && friendship.request_o === "required") {
        friendship.request_x = null
        friendship.request_o = null
        friendship.winner = null
        friendship.status = "inProgress"
        friendship.game = JSON.stringify([[0, 0, 0], [0, 0, 0], [0, 0, 0]])
    }

    await friendship.save()

    return friendship
}

module.exports = { createFriendshipService, hasWinnerService, getFriendsService, getFriendshipService, newMoveService, requestService }