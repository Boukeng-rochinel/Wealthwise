const express = require("express");
const app = express();
const authentication = require("./Routes/authRoutes.js");
const users = require("./Routes/usersRoutes.js");
const connectionDB = require("./config/database");
const Dotenv = require("dotenv");
const cors = require("cors");

Dotenv.config();

connectionDB();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());

app.use("/users", users);
app.use("/", authentication);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
