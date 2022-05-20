const express = require("express");
const UserController = require('../controllers/user');
const auth = require('../middleware/auth');

const router = new express.Router();


router.post("/users", UserController.users_signup);
router.get("/users/me", UserController.users_auth);
router.post("/users/login", UserController.users_login);
router.post("/users/logout",auth, UserController.users_logout);
router.post("/users/logoutAll", UserController.users_logoutAll);
router.put("/users/:id", UserController.users_update);
router.post("/users/me/avatar", UserController.users_avatar_upload);
router.delete("/users/me/avatar", UserController.users_avatar_delete);
router.get("/users/:id/avatar", UserController.users_avatar_id);
router.delete("/users/me", auth, UserController.users_delete);

module.exports = router;

