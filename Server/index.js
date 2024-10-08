const express = require('express')
const { connectDB } = require('./config/db')
const { apiRoutes } = require('./routes')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieParser())
const port = 3000

connectDB()

app.use('/api', apiRoutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})