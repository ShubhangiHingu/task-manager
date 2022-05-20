const express = require('express')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express()


//database connection
require('./config/db')

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app