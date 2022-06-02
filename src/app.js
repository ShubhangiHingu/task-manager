const express = require('express');
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');
const bodyParser = require('body-parser');

const app = express();

//database connection
require('../config/db')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//middleware

app.use(express.json());

//routes
app.use(userRouter);
app.use(taskRouter);


// Routes which should handle requests

app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.use('/uploads', express.static('uploads'));


module.exports = app;