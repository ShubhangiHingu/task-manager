const express = require("express");
const router = new express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { validateUserSignUp, userValidation } = require('../utils/validator');


// Handle incoming POST requests to /user

const {
  createUser,
  getUser,
  loginUser,
  logoutUser,
  logoutAllUser,
  updateUser,
  avatarUser,
  deleteAvatar,
  getAvatarId,
  deleteUser,
} = require('../controllers/user');


router.post('/', validateUserSignUp, userValidation, createUser);
router.post('/login',  loginUser);
router.post('/logout', auth, logoutUser);
router.delete('/logoutAll', auth, logoutAllUser);
router.post('/me/avatar', upload.array('avatar[]'), avatarUser);
router.delete('/:id/avatar', getAvatarId);
router.get('/me/avatar', deleteAvatar);
router.get('/me', auth, getUser);
router.delete('/me', auth, deleteUser);
router.put('/:id', auth, updateUser);


module.exports = router;
