const express = require("express");
const router = express.Router();
const auth = require("../Middlewares/AuthMiddlewares");
const {
  addExpense,
  getAllExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");

router.route("/createExpense").post(auth, addExpense);
router.route("/").get(auth, getAllExpenses);
router.route("/:id").get(auth, getExpense);
router.route("/:id").put(auth, updateExpense);
router.route("/:id").delete(auth, deleteExpense);

module.exports = router;
