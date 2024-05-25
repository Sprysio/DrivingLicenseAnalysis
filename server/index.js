require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const sequelize = require('./db');
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")
const dataRoutes = require("./routes/data")
const tokenVerification = require('./middleware/tokenVerification')

//middleware
app.use(express.json())
app.use(cors())


 app.get("/api/data/",tokenVerification)
 app.get("/api/data/download-json",tokenVerification)


app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/data", dataRoutes)

const port = process.env.PORT || 8888

sequelize.sync().then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });
