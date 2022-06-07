const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const { validateUserSignUp, userValidation } = require('../utils/validator');


// Handle incoming POST requests to /user

const {
  createUser,
  getAllUser,
  loginUser,
  logoutUser,
  logoutAllUser,
  updateUser,
  avatarUser,
  deleteAvatar,
  getAvatarId,
  deleteUser,
} = require('../controllers/user.controller');


router.post('/', validateUserSignUp, userValidation, createUser);
router.post('/login', loginUser);
router.post('/logout', auth, logoutUser);
router.delete('/logoutAll', auth, logoutAllUser);
router.post('/me/avatar', upload.array('avatar[]'), avatarUser);
router.delete('/:id/avatar', getAvatarId);
router.get('/me/avatar', deleteAvatar);
router.get('/me', auth, getAllUser);
router.delete('/me', auth, deleteUser);
router.put('/:id', updateUser);


module.exports = router;
