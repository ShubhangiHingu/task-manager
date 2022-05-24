const express = require("express");
const router = new express.Router();

const { validateUserSignUp, userValidation } = require('../utils/validator');


const {
  createUser,
  authUser,
  loginUser,
  logoutUser,
  logoutAllUser,
  updateUser,
  avatarUser,
  deleteAvatar,
  getAvatarId,
  deleteUser,
} = require('../controllers/user')


router.get('/users', validateUserSignUp, userValidation, createUser);
// router.route('/users').get(createUser)
router.route('/users/login').get(loginUser)
router.route('/users/logout').post(logoutUser)
router.route('/users/logoutAll').post(logoutAllUser)
router.route('/users/me/avatar').post(avatarUser)
router.route('/users/me/avatar').delete(deleteAvatar)
router.route('/users/:id/avatar').delete(getAvatarId)

router.route('/users/me').get(authUser).delete(deleteUser)
router.route('/users/:id').put(updateUser)


module.exports = router;
