const express = require('express')
const mainRoutes = require("./Routes/user.routes")

// creating server
const app = express()
// middleware
app.use(express.json())


app.use("/auth",mainRoutes)


module.exports = app

