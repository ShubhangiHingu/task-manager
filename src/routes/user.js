const express = require("express");
const router = new express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
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



router.post('/', validateUserSignUp, userValidation, createUser);
router.route('/login').get(loginUser)
router.route('/logout').post(logoutUser)
router.route('/logoutAll').post(logoutAllUser)
router.route('/:id/avatar').delete(getAvatarId)
router.post('/me/avatar', upload.array('avatar[]'), avatarUser)
router.route('/me/avatar').delete(deleteAvatar)

router.route('/me').get(authUser).delete(deleteUser)
router.route('/:id').put(updateUser)


module.exports = router;
