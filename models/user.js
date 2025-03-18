const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);
const Task = mongoose.model("Task", taskSchema);
module.exports = { User, Task };
