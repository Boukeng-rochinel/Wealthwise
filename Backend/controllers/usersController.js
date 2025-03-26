const { User } = require("../models/models");

const getUsers = async (req, res) => {
  try {
    const user = await User.find({});
    return res.status(200).json({
      data: user,
      message: "Users retrieved successfully",
    });
  } catch {
    return res.status(500).json({
      message: "Error retrieving user",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch {
    return res.status(500).json({
      message: "Error deleting user",
    });
  }
};

const searchUser = async (req, res) => {
  try {
    const searchEmail = req.body.email;
    const users = await User.find({ email: searchEmail });
    if (!users) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error searching", error });
  }
};

module.exports = { getUsers, deleteUser, searchUser };
