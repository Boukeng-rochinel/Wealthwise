const express = require("express");
const router = express.Router();
const { signUp, login } = require("../controllers/authController");
const { getUsers } = require("../controllers/usersController");

router.route("/login").post(login);
router.route("/signup").post(signUp);

module.exports = router;
