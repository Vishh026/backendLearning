const server = require('./src/App')
const ConnectToDb = require('./src/db/db')
require('dotenv').config()

ConnectToDb()

server.listen(3000,() => {
    console.log("server running on port 3000")  
})

