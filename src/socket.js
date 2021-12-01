const { Server } = require("socket.io")
const { serverHttp } = require("./http")

const io = new Server(serverHttp, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => {
    console.log(`Usuário conectado no socket ${socket.id}`)

    socket.on('new-friend', (data) => {
        socket.broadcast.emit(`new-friend-${data.friend.id}`, data.user)
    })

    socket.on("disconnect", () => {
        console.log(`Usuário desconectado do socket ${socket.id}`)
    })
})

module.exports = { io }