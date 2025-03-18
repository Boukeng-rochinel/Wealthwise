const express = require("express");
const router = express.Router();
const {
  getUsers,
  deleteUser,
  searchUser,
} = require("../controllers/usersController");

router.route("/").get(getUsers);
router.route("/:id").delete(deleteUser);
router.route("/search").post(searchUser);

module.exports = router;
