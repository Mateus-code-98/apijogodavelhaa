require('dotenv/config');
require('express-async-errors');
require('./socket')

const { serverHttp } = require('./http');

const port = process.env.PORT ? process.env.PORT : 3000;

serverHttp.listen(port, '192.168.0.103', () => {
    console.log(`Server is running on PORT ${port}`)
})
