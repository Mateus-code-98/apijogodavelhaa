import http from 'http'
import express from 'express'
import cors from "cors"
import { ExceptionHandler } from './middlewares/exceptionHandler'
import { ExceptionParams } from './middlewares/exceptionParams'
import { routes } from './routes/index'

const app = express()

app.use(cors())

app.use(express.json())

app.use(routes)

app.use(ExceptionParams)

app.use(ExceptionHandler)

export const serverHttp = http.createServer(app)