require('dotenv/config');
require('express-async-errors');

const { Server } = require('socket.io');
const http = require('http');
const express = require('express');
const cors = require("cors");
const { ExceptionHandler } = require('./middlewares/exceptionHandler');
const { ExceptionParams } = require('./middlewares/exceptionParams');
const uploadConfig = require('./config/upload');

const port = process.env.PORT ? process.env.PORT : 3000;
const app = express()
const routes = require('./routes/index');

app.use("/files", express.static(uploadConfig.directory))

app.use(cors())

app.use(express.json())

app.use(routes)

app.use(ExceptionParams)

app.use(ExceptionHandler)

const serverHttp = http.createServer(app)

const io = new Server(serverHttp, {
    cors: {
        origin: "*"
    }
})

io.on("connection", socket => {
    console.log(`Usuaário conectado no socket ${socket.id}`)
    socket.on("disconnect", () => {
        console.log("Usuário desconectado")
    })
})

serverHttp.listen(port, () => {
    console.log(`Server is running on PORT ${port}`)
})
