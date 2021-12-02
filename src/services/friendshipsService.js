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

module.exports = { createFriendshipService, getFriendsService, getFriendshipService }