/* all the jsonwebtoken or passport auth code will go here */

const jwt = require('jsonwebtoken');
const User = require('../models/user.models');


// for creating a token

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');

    //for check-token

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate!' });
  }
};

module.exports = auth;



