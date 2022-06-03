require('dotenv').config()

const express = require('express');
const userRouter = require('./routes/user.routes');
const taskRouter = require('./routes/task.routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();


//database connection
require('../config/db')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// setup morgan
app.use(morgan("dev"));

//middleware

app.use(express.json());    
app.use(cors());


//routes
app.use(userRouter);
app.use(taskRouter);


// Routes which should handle requests

app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.use('/uploads', express.static('uploads'));



app.get("/", (req, res) => {
  res.status(200).send("Welcome 🙌");
});


module.exports = app;