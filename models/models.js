const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const taskSchema = new Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const budgetSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

budgetSchema.index({ userId: 1, name: 1 }, { unique: true });

const categorySchema = new Schema(
  {
    budgetId: { type: Schema.Types.ObjectId, ref: "Budget", required: true },
    name: { type: String, required: true },
    allocatedAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

const expenseSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    budgetId: { type: Schema.Types.ObjectId, ref: "Budget", required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    amount: { type: Number, required: true },
    description: { type: String },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const savingsGoalSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    currentAmount: { type: Number, default: 0 },
    targetDate: { type: Date, required: true },
    status: { type: String, enum: ["Active", "Completed"], default: "Active" },
  },
  { timestamps: true }
);

const contributionSchema = new Schema(
  {
    goalId: { type: Schema.Types.ObjectId, ref: "SavingsGoal", required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const budgetAnalyticsSchema = new Schema(
  {
    budgetId: { type: Schema.Types.ObjectId, ref: "Budget", required: true },
    totalSpent: { type: Number, required: true },
    totalBudgeted: { type: Number, required: true },
    period: { type: String, required: true }, // e.g "2023-10"
  },
  { timestamps: true }
);

const savingsAnalyticsSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    savingsRate: { type: Number, required: true },
    totalSavings: { type: Number, required: true },
    period: { type: String, required: true }, // e.g., "2023-10"
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoPath: {
    type: String,
    required: true, // Ensures video path is always provided when creating a course
  },
});

const Course = mongoose.model("Course", courseSchema);
const User = mongoose.model("User", userSchema);
const Task = mongoose.model("Task", taskSchema);
const Budget = mongoose.model("Budget", budgetSchema);
const Category = mongoose.model("Category", categorySchema);
const Expense = mongoose.model("Expense", expenseSchema);
const SavingsGoal = mongoose.model("SavingsGoal", savingsGoalSchema);
const Contribution = mongoose.model("Contribution", contributionSchema);
const BudgetAnalytics = mongoose.model(
  "BudgetAnalytics",
  budgetAnalyticsSchema
);
const SavingsAnalytics = mongoose.model(
  "SavingsAnalytics",
  savingsAnalyticsSchema
);

module.exports = {
  User,
  Task,
  Budget,
  Category,
  Expense,
  SavingsGoal,
  Contribution,
  BudgetAnalytics,
  SavingsAnalytics,
  Course,
};
