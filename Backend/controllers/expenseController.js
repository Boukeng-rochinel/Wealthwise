const { Expense } = require("../models/models");

const addExpense = async (req, res) => {
  try {
    const { budgetId, categoryId, amount, description, date } = req.body;
    const newExpense = await new Expense({
      userId: req.userId,
      budgetId,
      categoryId,
      amount,
      description,
      date,
    });

    newExpense.save();

    return res.status(201).json({
      data: newExpense,
      msg: "Expense added sucessful",
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Something went wrong",
      err: err.message,
    });
  }
};

const getAllExpenses = async (req, res) => {
  try {
    const getExpenses = await Expense.find({ userId: req.userId });

    if (getExpenses.length == 0) {
      return res.status(401).json({
        msg: "No Expense found for this user please create one",
      });
    }

    return res.status(200).json({
      data: getExpenses,
      msg: "Expenses Fetched Sucessfully",
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Something went wrong",
      err: err.message,
    });
  }
};
const getExpense = async (req, res) => {
  try {
    const getExpenses = await Expense.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (getAllExpenses.length == 0) {
      return res.status(401).json({
        msg: "No Expense found for this user please create one",
      });
    }

    return res.status(200).json({
      data: getAllExpenses,

      msg: "Expense Fetched Sucessfully",
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Something went wrong",
      err: err.message,
    });
  }
};

const updateExpense = async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      {
        _id: req.params.id,
        userId: req.userId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      data: updatedExpense,
      msg: "Expense updated sucessfully",
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Something went wrong",
      err: err.message,
    });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const ExpenseId = req.params.id;
    const deletedExpense = await Expense.findByIdAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!deletedExpense) {
      return res.status.json({
        msg: "Expense not Found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      msg: "Something went wrong",
      err: err.message,
    });
  }
};

module.exports = {
  addExpense,
  getAllExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
};
