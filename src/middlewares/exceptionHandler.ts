import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors/AppError"

export const ExceptionHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            path: err.path
        })
    }
    else if (err.message === "Cannot destructure property 'filename' of 'req.file' as it is undefined.") {
        return res.status(400).json({
            status: 'error',
            message: `Imagem não enviada!`,
            path: "photograph"
        })
    }
    else if (err.message === "Unexpected field") {
        return res.status(400).json({
            status: 'error',
            message: `Imagem enviada com um nome diferente de 'photograph'!`,
            path: "photograph"
        })
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error!'
    })
}