import { createFriendshipService, getFriendsService, getFriendshipService } from "../services/friendshipsService"
import { findUserByFriendlyIdService } from "../services/userService"
import { Request, Response } from "express"

export const createFriendshipController = async (req: Request, res: Response) => {
    const { friendlyId } = req.body
    const userId = req.user.id
    const friend = await findUserByFriendlyIdService(friendlyId, userId)
    const newFriendship = await createFriendshipService(userId, friend.id)
    return res.json({ newFriendship, friend })
}

export const getFriendsController = async (req: Request, res: Response) => {
    const userId = req.user.id
    const friends = await getFriendsService(userId)
    return res.json(friends)
}

export const getFriendshipController = async (req: Request, res: Response) => {
    const { friendshipId } = req.params
    const friendship = await getFriendshipService(friendshipId)
    return res.json(friendship)
}