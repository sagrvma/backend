require("dotenv").config();
const mongoose = require("mongoose");

const MONGODBPWD = process.env.MONGODBPWD;

const connectToDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://sagrvma:${MONGODBPWD}@mongodb-basics.k0rywgn.mongodb.net/`
    );
    console.log("Connected to mongoDB successfully.");
  } catch (error) {
    console.log("Connection to mongoDB failed!", error);
    process.exit(1);
  }
};

module.exports = connectToDB;
