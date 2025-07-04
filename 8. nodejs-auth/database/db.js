require("dotenv").config();

const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to mongoDB successfully.");
  } catch (error) {
    console.log("Something went wrong", error);
    process.exit(1);
  }
};

module.exports = connectToDB;
