/* all the jsonwebtoken or passport auth code will go here */

const jwt = require('jsonwebtoken');
const User = require('../models/user.models');


//for create token

const assignToken = async (user, expires_in) => {
  let payload = {
    id: user._id,
  };
  let token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

//for check-token

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(400).json({
        status: false,
        message: "Please send authentication token",
      });
    }
    if (token) {
      let decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({
        _id: decoded._id,
        'tokens.token': token
      });
      if (!user) {
        throw new Error();
      }
      req.token = token;
      req.user = user;
      next();
    }
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: "Unauthenticated!",
    });
  }
};



module.exports = assignToken, verifyToken;