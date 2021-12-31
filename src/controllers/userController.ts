import { Request, Response } from "express"
import { ReqProps } from "../interfaces/request_interface"
import { getAllUsersService, loginOrCreateUserService } from "../services/userService"

export const loginOrCreateUserController = async (req: Request, res: Response) => {
    const { name, email, photoUrl } = req.body

    const { user, token } = await loginOrCreateUserService(name, email, photoUrl)

    return res.json({ user, token })
}

export const getAllUsersController = async (req: Request, res: Response) => {
    const allUsers = await getAllUsersService()

    return res.json(allUsers)
}