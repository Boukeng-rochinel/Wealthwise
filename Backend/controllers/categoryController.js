const { Category, Budget } = require("../models/models");

const addCategory = async (req, res) => {
  try {
    const { budgetId, name, allocatedAmount } = req.body;
    const userId = req.userId; // Authenticated user's ID

    console.log(userId);
    console.log(budgetId);
    console.log(name);
    console.log(allocatedAmount);

    // Find the budget and ensure it belongs to the user
    const budget = await Budget.findOne({ _id: budgetId, userId: userId });
    if (!budget) {
      return res.status(404).json({
        msg: "Budget not found or you do not have permission to add categories",
      });
    }

    // Step 2: Calculate the total allocated amount for all categories in the budget
    const categories = await Category.find({ budgetId });
    const totalAllocated = categories.reduce(
      (sum, category) => sum + category.allocatedAmount,
      0
    );

    // Step 3: Check if adding the new category exceeds the budget amount
    if (totalAllocated + allocatedAmount > budget.amount) {
      return res.status(400).json({
        msg: "Adding this category exceeds the budget amount",
        totalAllocated,
        budgetAmount: budget.amount,
      });
    }

    // Step 4: Create and save the new category
    const newCategory = new Category({
      budgetId,
      name,
      allocatedAmount,
    });

    await newCategory.save();

    // Step 5: Return the new category
    res.status(201).json({
      msg: "Category added successfully",
      category: newCategory,
    });
  } catch (err) {
    res.status(500).json({
      msg: "something went wrong",
      err: err.message,
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const budgetId = req.params.budgetId; // Budget ID from URL params
    const userId = req.userId; // Authenticated user's ID

    // Find the budget and ensure that it belongs to the user
    const budget = await Budget.findOne({ _id: budgetId, userId });
    if (!budget) {
      return res.status(404).json({
        msg: "Budget not found or you do not have permission to view categories",
      });
    }

    //Fetch all categories for the budget
    const categories = await Category.find({ budgetId });

    //Return the categories
    res.status(200).json({
      msg: "Categories retrieved successfully",
      categories,
    });
  } catch (err) {
    res.status(500).json({
      msg: "something went wrong",
      err: err.message,
    });
  }
};
const getACategory = async (req, res) => {
  try {
    const budgetId = req.params.budgetId; // Budget ID from URL params
    const categoryId = req.params.budgetId; // Budget ID from URL params
    const userId = req.userId; // Authenticated user's ID

    // Find the budget and ensure that it belongs to the user
    const budget = await Budget.findOne({ _id: budgetId, userId });
    if (!budget) {
      return res.status(404).json({
        msg: "Budget not found or you do not have permission to view categories",
      });
    }

    //Fetch all categories for the budget
    const categories = await Category.find({
      budgetId: budgetId,
      _id: categoryId,
    });

    //Return the categories
    res.status(200).json({
      msg: "Categories retrieved successfully",
      categories,
    });
  } catch (err) {
    res.status(500).json({
      msg: "something went wrong",
      err: err.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id; // Category ID from URL params
    const { name, allocatedAmount } = req.body;
    const userId = req.userId; // Authenticated user's ID

    //Find the category and its associated budget
    const category = await Category.findById(categoryId).populate("budgetId");
    if (!category) {
      return res.status(404).json({
        msg: "Category not found",
      });
    }

    //Ensure the budget belongs to the user
    if (category.budgetId.userId.toString() !== userId) {
      return res.status(403).json({
        msg: "You do not have permission to update this category",
      });
    }

    //Calculate the total allocated amount for all categories in the budget
    const categories = await Category.find({ budgetId: category.budgetId._id });
    const totalAllocated = categories.reduce(
      (sum, cat) =>
        cat._id.toString() === categoryId ? sum : sum + cat.allocatedAmount,
      0
    );

    //Check if updating the category exceeds the budget amount
    if (totalAllocated + allocatedAmount > category.budgetId.amount) {
      return res.status(400).json({
        msg: "Updating this category exceeds the budget amount",
        totalAllocated,
        budgetAmount: category.budgetId.amount,
      });
    }

    //Update the category
    const updatedcategory = await Category.findByIdAndUpdate(
      { _id: categoryId },
      {
        name,
        allocatedAmount,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    //Return the updated category
    res.status(200).json({
      msg: "Category updated successfully",
      category: updatedcategory,
    });
  } catch (err) {
    res.status(500).json({
      msg: "something went wrong",
      err: err.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id; // Category ID from URL params
    const userId = req.userId; // Authenticated user's ID

    //Find the category
    const category = await Category.findById(categoryId).populate("budgetId");
    if (!category) {
      return res.status(404).json({
        msg: "Category not found",
      });
    }

    //Ensure the budget belongs to the user
    if (category.budgetId.userId.toString() !== userId) {
      return res.status(403).json({
        msg: "You do not have permission to delete this category",
      });
    }

    // Step 3: Delete the category
    await category.deleteOne();

    // Step 4: Return success message
    res.status(200).json({
      msg: "Category deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      msg: "something went wrong",
      err: err.message,
    });
  }
};

module.exports = {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getACategory,
};
