import 'dotenv/config'
import 'express-async-errors'
import './socket'

import { serverHttp } from './http'

const port = process.env.PORT ? process.env.PORT : 3000;

serverHttp.listen(port, () => {
    console.log(`Server is running on PORT ${port}`)
})