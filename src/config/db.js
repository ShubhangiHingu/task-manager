//create connection to database
require('dotenv').config();

const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,

})





