const { User } = require("../database/models")
const AppError = require("../errors/AppError");
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken")

const authUserService = (user) => {
    const token = sign({}, process.env.JWT_SECRET, {
        subject: user.id,
        expiresIn: process.env.JWT_EXPIRESIN
    })
    return { user, token }
}

const createUserService = async ({ name, email, photoUrl }) => {

    const newUser = await User.create({ name, email, photoUrl})

    return newUser
}

const loginOrCreateUserService = async ({ name, email, photoUrl }) => {
    let user = await getUserService({ email })
    if (!user) user = await createUserService({ name, email, photoUrl })
    return authUserService(user)
}

const getUserService = async ({ email }) => {
    const user = await User.findOne({ where: { email } })
    return user
}

const getAllUsersService = async () => {
    const user = await User.findAll()
    return user
}


module.exports = { loginOrCreateUserService, getUserService, getAllUsersService }