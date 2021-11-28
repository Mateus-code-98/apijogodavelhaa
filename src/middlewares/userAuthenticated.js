const { verify } = require('jsonwebtoken')
const   AppError = require('../errors/AppError')

const UserAuthenticated = (req,res,next) => {
    const authHeader = req.headers.authorization

    if(!authHeader) throw new AppError('JWT_ERROR','400')

    const token = authHeader.split(' ')[1]

    try{
        const decoded = verify(token,process.env.JWT_SECRET)
        
        req.user = { id:decoded.sub }
        
        return next()
    }catch(err){
        throw new AppError("JWT_ERROR",'400')
    }
}

module.exports = { UserAuthenticated }