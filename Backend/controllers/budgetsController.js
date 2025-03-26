const { Budget } = require("../models/models");

const createBudget = async (req, res) => {
  try {
    const { name, amount, startDate, endDate } = req.body;
    // Ensure req.userId is defined
    if (!req.userId) {
      return res.status(401).json({ msg: "User not authenticated" });
    }
    const newBudget = new Budget({
      userId: req.userId,
      name,
      amount,
      startDate,
      endDate,
    });

    await newBudget.save();
    res.status(201).json({
      data: newBudget,
      msg: "Budget created successfully",
    });
  } catch (err) {
    // Handle duplicate key error
    if (err.code === 11000) {
      return res.status(400).json({
        msg: "Budget name must be unique for this user",
      });
    }

    return res.status(500).json({
      msg: "something went wrong",
      err: err.message,
    });
  }
};
const getBudgets = async (req, res) => {
  try {
    const allBudgets = await Budget.find({ userId: req.userId });
    if (allBudgets.lenght == 0) {
      return res.status(404).json({
        msg: "No budget found, please kindly create a new budget",
      });
    }

    return res.status(200).json({
      data: allBudgets,
      lenghtdata: allBudgets.length,
      msg: "Budgets Retrieved successfully",
    });
  } catch (err) {
    return res.status(500).json({
      msg: "something went wrong",
      err: err.message,
    });
  }
};
const getABudget = async (req, res) => {
  try {
    const userID = req.params.id;
    const ABudget = await Budget.find({ _id: userID, userId: req.userId });
    if (ABudget.length == 0) {
      return res.status(404).json({
        msg: "No budget found, please kindly create a new budget",
      });
    }

    return res.status(200).json({
      data: ABudget,
      msg: "Budgets Retrieved successfully",
    });
  } catch (err) {
    return res.status(500).json({
      msg: "something went wrong",
      err: err.message,
    });
  }
};
const updateBudget = async (req, res) => {
  try {
    const userID = req.params.id;
    const updatedBudget = await Budget.findByIdAndUpdate(
      { _id: userID, userId: req.userId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedBudget) {
      return res.status(404).json({
        msg: "Updated Budget not Found",
      });
    }

    return res.status(200).json({
      updatedBudget: updatedBudget,
      msg: "Edit successful",
    });
  } catch (err) {
    return res.status(500).json({
      msg: "something went wrong",
      err: err.message,
    });
  }
};
const deleteBudget = async (req, res) => {
  try {
    const userID = req.params.id;

    const deletedUser = await Budget.findByIdAndDelete({
      _id: userID,
      usserId: req.userId,
    });

    if (!deletedUser) {
      return res.status(404).json({
        msg: `Budget not Found with : ${userID}`,
      });
    }

    return res.status(200).json({
      deleteBudget: deletedUser,
      msg: "Budget sucessful deleted",
    });
  } catch (err) {
    return res.status(500).json({
      msg: "something went wrong",
      err: err.message,
    });
  }
};

module.exports = {
  getBudgets,
  createBudget,
  getABudget,
  updateBudget,
  deleteBudget,
};
