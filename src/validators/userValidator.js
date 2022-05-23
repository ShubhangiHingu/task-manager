

const User = require('../controllers/user');


exports.validate = (method) =>{
  switch(method) {
      case 'createUser' : {
          return [
              body('userName' , 'userName dosent exists').exists(),
              body('email' , 'email dosent exists').exists().isEmail(),
              body('password' , 'password dosent exists').exists()
          ]
      }
  }
}





// router.get("/users", UserController.validate('createUser'),UserController.createUser);
