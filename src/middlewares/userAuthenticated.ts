import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { UserInstance } from '../database/models/user'
import { AppError } from '../errors/AppError'
import { ReqProps } from '../interfaces/request_interface'

export const UserAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader) throw new AppError('JWT_ERROR', 400)

    const token = authHeader.split(' ')[1]

    try {
        const decoded = verify(token, process.env.JWT_SECRET as string)

        req.user = { id: decoded.sub } as UserInstance

        return next()
    } catch (err) {
        throw new AppError("JWT_ERROR", 400)
    }
}