const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Successfully connected to mongoDB database.");
  } catch (error) {
    console.log("Failed to connect to mongoDB database! Please try again.");
    process.exit(1);
  }
};

module.exports = connectToDB;
