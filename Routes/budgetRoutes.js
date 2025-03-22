const express = require("express");
const router = express.Router();
const {
  createBudget,
  getBudgets,
  getABudget,
  updateBudget,
  deleteBudget,
} = require("../controllers/budgetsController");
const authenticateUser = require("../Middlewares/AuthMiddlewares");

router.route("/").post(authenticateUser, createBudget);
router.route("/").get(authenticateUser, getBudgets);
router.route("/:id").get(authenticateUser, getABudget);
router.route("/:id").put(authenticateUser, updateBudget);
router.route("/:id").delete(authenticateUser, deleteBudget);

module.exports = router;
