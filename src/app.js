const express = require('express');
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');

const app = express();

//database connection
require('./config/db')

//middleware

app.use(express.json());

//routes
app.use(userRouter);
app.use(taskRouter);



module.exports = app;