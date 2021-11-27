const { getAllUsersService, loginOrCreateUserService } = require("../services/userService")

const loginOrCreateUserController = async (req, res, next) => {
    const { name, email, photoUrl } = req.body

    const { user, token } = await loginOrCreateUserService({ name, email, photoUrl })

    return res.json({ user, token })
}

const getAllUsersController = async (req, res, next) => {
    const allUsers = await getAllUsersService()

    return res.json(allUsers)
}

module.exports = { getAllUsersController, loginOrCreateUserController }