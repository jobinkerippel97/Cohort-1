const express = require('express')
const { connectDB } = require('./config/db')
const { apiRoutes } = require('./routes')

const app = express()
const port = 3000

connectDB()

app.use('/api', apiRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})