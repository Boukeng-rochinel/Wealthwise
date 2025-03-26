const express = require("express");
const {
  createSavingsGoal,
  getAllSavingsGoal,
  getASavingsGoal,
  updateASavingsGoal,
  deleteASavingsGoal,
} = require("../controllers/savingController");
const router = express.Router();
const auth = require("../Middlewares/AuthMiddlewares");

router.route("/").post(auth, createSavingsGoal);
router.route("/").get(auth, getAllSavingsGoal);
router.route("/:id").get(auth, getASavingsGoal);
router.route("/:id").put(auth, updateASavingsGoal);
router.route("/:id").delete(auth, deleteASavingsGoal);

module.exports = router;
