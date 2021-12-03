const { Server } = require("socket.io")
const { serverHttp } = require("./http")
const { newMoveService } = require("./services/friendshipsService")
const { updateStatusOfUserService, getUserService } = require("./services/userService")

const io = new Server(serverHttp, {
    cors: {
        origin: "*"
    }
})

io.on("connection", async (socket) => {
    console.log(`Usuário conectado no socket ${socket.id}`)

    const { userId } = socket.handshake.query

    socket.on('new-friend', (data) => {
        socket.broadcast.emit(`new-friend-${data.friend.id}`, data.user)
    })

    socket.on("disconnect", async () => {
        console.log(`Usuário desconectado do socket ${socket.id}`)
        const user = await getUserService({ id: userId })
        if (user && (user.socketId === socket.id)) {
            const userOff = await updateStatusOfUserService({ status: 'off', socketId: null, userId })
            socket.broadcast.emit(`${userId}`, userOff)
            console.log(`Emiti para - ${userId} - off`)
        }
    })

    socket.on("new-move", async (data) => {
        const newFriendship = await newMoveService(data)
        socket.broadcast.emit(`new-move-${data.friendshipId}`, newFriendship)
    })

    const userOn = await updateStatusOfUserService({ status: 'on', socketId: socket.id, userId })

    socket.broadcast.emit(`${userId}`, userOn)

    console.log(`Emiti para - ${userId} - on`)
})

module.exports = { io }