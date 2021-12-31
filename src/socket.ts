import { Server } from "socket.io"
import { serverHttp } from "./http"
import { newMoveService, requestService } from "./services/friendshipsService"
import { updateStatusOfUserService, getUserService } from "./services/userService"

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
        const user = await getUserService('', userId as string)
        if (user && (user.socketId === socket.id)) {
            const userOff = await updateStatusOfUserService(userId as string, 'off', null)
            socket.broadcast.emit(`${userId}`, userOff)
            console.log(`Emiti para - ${userId} - off`)
        }
    })

    socket.on("request", async (data) => {
        const newFriendship = await requestService(data.userId, data.friendshipId)
        socket.broadcast.emit(`new-move-${data.friendshipId}`, newFriendship)
        socket.emit(`new-move-${data.friendshipId}`, newFriendship)
    })

    socket.on("new-move", async (data) => {
        const newFriendship = await newMoveService(data.friendshipId, data.x, data.y)
        socket.broadcast.emit(`new-move-${data.friendshipId}`, newFriendship)
    })

    const userOn = await updateStatusOfUserService(userId as string, 'on', null)

    socket.broadcast.emit(`${userId}`, userOn)

    console.log(`Emiti para - ${userId} - on`)
})

export { io }