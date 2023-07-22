/**
 * import all necesarry packages
 */
require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const router = require("./routes/routes")

const app = express()

/**
 * environment variables
 */
const PORT = process.env.PORT
const DB_URL = process.env.DB_URL

/**
 * connect nodejs to mongoDB
 */
mongoose.connect(DB_URL);
const db = mongoose.connection

db.on('error', (err) => {
  console.log(err)
})

db.on('connected', () => {
  console.log("Database connected")
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use('/api/v1', router)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

/**
 * DRY: Don't repeat yourself
 */