const { Router } = require('express');
const { GameRouter } = require('./gameRouter');
const { UserRouter } = require('./userRouter');
const routes = Router()

routes.use('/users', UserRouter)
routes.use('/games', GameRouter)
routes.get('/', (req,res,next) => {
    console.log('Cheguei')
    res.json({message:"Olá Vei"})
})

module.exports = routes