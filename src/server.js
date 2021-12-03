require('dotenv/config');
require('express-async-errors');
require('./socket')

const { serverHttp } = require('./http');
const { hasWinnerService } = require('./services/friendshipsService');

const port = process.env.PORT ? process.env.PORT : 3000;

console.log(hasWinnerService({game:[
    [1,0,0],
    [1,-1,0],
    [-1,0,1]
]}))

serverHttp.listen(port, '192.168.0.103', () => {
    console.log(`Server is running on PORT ${port}`)
})
