const express = require("express");
const router = express.Router();
const auth = require("../Middlewares/AuthMiddlewares");
const {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.route("/categories").post(auth, addCategory);
router.route("/budgets/:budgetId/categories").get(auth, getCategories);
router.route("/categories/:id").put(auth, updateCategory);
router.route("/categories/:id").delete(auth, deleteCategory);

module.exports = router;
