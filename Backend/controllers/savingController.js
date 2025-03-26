const { SavingsGoal } = require("../models/models");

const createSavingsGoal = async (req, res) => {
  try {
    const { name, targetAmount, targetDate } = req.body;

    const newSavingsGoal = new SavingsGoal({
      userId: req.userId, // Authenticated user's ID
      name,
      targetAmount,
      targetDate,
    });

    await newSavingsGoal.save();
    res.status(201).json({
      msg: "Savings goal created successfully",
      savingsGoal: newSavingsGoal,
    });
  } catch (err) {
    res.status(500).json({
      msg: "something went wrong",
      err: err.message,
    });
  }
};
const getAllSavingsGoal = async (req, res) => {
  try {
    const getAllSavingsGoal = await SavingsGoal.find({
      userId: req.userId, // Authenticated user's ID
    });

    res.status(200).json({
      msg: "Savings goal Fetched successfully",
      savingsGoal: getAllSavingsGoal,
    });
  } catch (err) {
    res.status(500).json({
      msg: "something went wrong",
      err: err.message,
    });
  }
};
const getASavingsGoal = async (req, res) => {
  try {
    const savingID = req.params.id;
    const getASavingsGoal = await SavingsGoal.find({
      userId: req.userId, // Authenticated user's ID
      _id: savingID,
    });

    res.status(200).json({
      msg: "Saving goal Fetched successfully",
      savingsGoal: getASavingsGoal,
    });
  } catch (err) {
    res.status(500).json({
      msg: "something went wrong",
      err: err.message,
    });
  }
};
const updateASavingsGoal = async (req, res) => {
  try {
    const savingID = req.params.id;

    const updateSavingsGoal = await SavingsGoal.findByIdAndUpdate(
      {
        userId: req.userId, // Authenticated user's ID
        _id: savingID,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(201).json({
      msg: "Savings goal updated successfully",
      savingsGoal: updateSavingsGoal,
    });
  } catch (err) {
    res.status(500).json({
      msg: "something went wrong",
      err: err.message,
    });
  }
};
const deleteASavingsGoal = async (req, res) => {
  try {
    const savingID = req.params.id;
    const updateSavingsGoal = await SavingsGoal.findByIdAndDelete({
      userId: req.userId, // Authenticated user's ID
      _id: savingID,
    });

    res.status(200).json({
      msg: "Savings goal deleted successfully",
      savingsGoal: updateSavingsGoal,
    });
  } catch (err) {
    res.status(500).json({
      msg: "something went wrong",
      err: err.message,
    });
  }
};

module.exports = {
  createSavingsGoal,
  getAllSavingsGoal,
  getASavingsGoal,
  updateASavingsGoal,
  deleteASavingsGoal,
};
