const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.error(" MongoDB Connection Failed:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectionDB;
