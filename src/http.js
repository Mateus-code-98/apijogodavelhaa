const http = require('http');
const express = require('express');
const cors = require("cors");
const { ExceptionHandler } = require('./middlewares/exceptionHandler');
const { ExceptionParams } = require('./middlewares/exceptionParams');

const app = express()
const routes = require('./routes/index');

app.use(cors())

app.use(express.json())

app.use(routes)

app.use(ExceptionParams)

app.use(ExceptionHandler)

const serverHttp = http.createServer(app)

module.exports = { serverHttp }
