const { User } = require("../database/models")
const { sign } = require("jsonwebtoken")
const { generateKey } = require("./generalServices")
const AppError = require("../errors/AppError")

const authUserService = (user) => {
    const token = sign({}, process.env.JWT_SECRET, {
        subject: user.id,
        expiresIn: process.env.JWT_EXPIRESIN
    })
    return { user, token }
}

const createUserService = async ({ name, email, photoUrl }) => {
    const friendlyId = generateKey()
    const newUser = await User.create({ name, email, photoUrl, friendlyId })
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

const findUserByFriendlyIdService = async ({ friendlyId, userId }) => {
    if (!friendlyId) throw new AppError("Campo 'friendlyId' obrigatório!", 400, 'friendlyId')
    const user = await User.findOne({ where: { friendlyId } })
    if (!user) throw new AppError('Nenhum usuário encontrado!', 400, 'friendlyId')
    if (user.id === userId) throw new AppError("Você não pode se convidar!", 400, 'friendlyId')
    return user;
}

module.exports = { loginOrCreateUserService, getUserService, getAllUsersService, findUserByFriendlyIdService }