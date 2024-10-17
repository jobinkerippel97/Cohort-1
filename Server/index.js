const express = require('express')
const { connectDB } = require('./config/db')
const { apiRoutes } = require('./routes')
const cookieParser = require('cookie-parser')
const { handleError } = require('./utils/error')

const app = express()
app.use(express.json())
app.use(cookieParser())
const port = 3000

connectDB()

app.use('/api', apiRoutes)
app.use(handleError)

app.all("*",(req,res)=> {
  res.status(404).json({message: "end point does not exist"})
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})