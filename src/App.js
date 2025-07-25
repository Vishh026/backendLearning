const express = require('express')
const mainRoutes = require("./Routes/auth.routes")
const cookieParser = require('cookie-parser')
// creating server
const app = express()

// middleware
app.use(express.json())
app.use(cookieParser())


app.use("/auth",mainRoutes)


module.exports = app

