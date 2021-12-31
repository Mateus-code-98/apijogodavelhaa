import { UserInstance } from "../database/models/user"
import { User } from "../database/models"
import { sign } from "jsonwebtoken"
import { generateKey } from "./generalServices"
import { AppError } from "../errors/AppError"

export const authUserService = (user: UserInstance) => {
    const token = sign({}, process.env.JWT_SECRET as string, {
        subject: user.id,
        expiresIn: process.env.JWT_EXPIRESIN
    })
    return { user, token }
}

export const createUserService = async (name: string, email: string, photoUrl: string) => {
    const friendlyId = generateKey()
    const newUser = await User.create({ name, email, photoUrl, friendlyId })
    return newUser
}

export const loginOrCreateUserService = async (name: string, email: string, photoUrl: string) => {
    let user = await getUserService(email)
    if (!user) user = await createUserService(name, email, photoUrl)
    return authUserService(user)
}

export const getUserService = async (email: string, id: string | null = null) => {
    let user
    if (id) user = await User.findByPk(id)
    else user = await User.findOne({ where: { email } })
    return user
}

export const getAllUsersService = async () => {
    const user = await User.findAll()
    return user
}

export const findUserByFriendlyIdService = async (friendlyId: string, userId: string) => {
    if (!friendlyId) throw new AppError("Campo 'friendlyId' obrigatório!", 400, 'friendlyId')
    const user = await User.findOne({ where: { friendlyId } })
    if (!user) throw new AppError('Nenhum usuário encontrado!', 400, 'friendlyId')
    if (user.id === userId) throw new AppError("Você não pode se convidar!", 400, 'friendlyId')
    return user;
}

export const updateStatusOfUserService = async (userId: string, status: string, socketId: string | null) => {
    const user = await User.findByPk(userId)
    if (user) {
        user.status = status
        user.socketId = socketId
        await user.save()
    }
    return user
}