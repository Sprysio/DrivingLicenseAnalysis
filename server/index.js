require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")
const tokenVerification = require('./middleware/tokenVerification')

//middleware
app.use(express.json())
app.use(cors())

const connection = require('./db')
connection()
// app.get("/api/users/",tokenVerification)


app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)


const port = process.env.PORT || 8888
app.listen(port, () => console.log(`Nasłuchiwanie na porcie ${port}`))
