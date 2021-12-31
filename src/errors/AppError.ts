export class AppError {
    message;
    path;
    statusCode;
    constructor(message: string, statusCode: number = 400, path: string | null = null) {
        this.message = message
        this.statusCode = statusCode
        this.path = path
    }
}