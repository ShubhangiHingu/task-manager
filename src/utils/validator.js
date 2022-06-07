//check validation

const { check, validationResult } = require('express-validator/check');

exports.validateUserSignUp = [
  check('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Name is required!')
    .isString()
    .withMessage('Must be a valid name!')
    .isLength({ min: 3, max: 20 })
    .withMessage('Name must be within 3 to 20 character!'),
  check('email').isEmail().withMessage('Invalid email!'),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password is empty!')
    .isLength({ min: 8, max: 20 })
    .withMessage('Password must be 3 to 20 characters long!')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(' password must!');
      }
      return true;
    })
];


exports.validateTask = [
  check('description')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Description is required!')
    .isString()
    .withMessage('Must be a valid name!')
    .isLength({ min: 20, max: 50 })
    .withMessage('Description must be within 20 to 50 character!'),
  check('completed')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Completed is required!')
    
];

//exports errors

exports.userValidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();
  const error = result.msg;
  res.json({ success: false, message: error });
}

