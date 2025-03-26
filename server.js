const express = require("express");
const app = express();
const Dotenv = require("dotenv");
const cors = require("cors");
const connectionDB = require("./config/database");
const authentication = require("./Routes/authRoutes.js");
const users = require("./Routes/usersRoutes.js");
const budgets = require("./Routes/budgetRoutes.js");
const savings = require("./Routes/savingsRoutes.js");
const category = require("./Routes/categoryRoutes.js");
const expense = require("./Routes/expenseRoute.js");
const course = require("./Routes/courseRoutes.js");

Dotenv.config();

connectionDB();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());

app.use("/", authentication);
app.use("/expense", expense);
app.use("/", category);
app.use("/savings", savings);
app.use("/users", users);
app.use("/budgets", budgets);
app.use("/", course);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
