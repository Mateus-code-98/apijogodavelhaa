const { createFriendshipService, getFriendsService } = require("../services/friendshipsService")
const { findUserByFriendlyIdService } = require("../services/userService")

const createFriendshipController = async (req, res, next) => {
    const { friendlyId } = req.body
    const userId = req.user.id
    const friend = await findUserByFriendlyIdService({ friendlyId,userId })
    const newFriendship = await createFriendshipService({ userId_x: userId, userId_o: friend.id })
    return res.json(newFriendship)
}

const getFriendsController = async (req, res, next) => {
    const userId = req.user.id
    const friends = await getFriendsService({ userId })
    return res.json(friends)
}

module.exports = { createFriendshipController, getFriendsController }