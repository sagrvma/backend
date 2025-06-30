require("dotenv").config();
const mongoose = require("mongoose");

const MONGODBPWD = process.env.MONGODBPWD;

// console.log("PORT:", process.env.PORT);
// console.log("MONGODBPWD loaded:", process.env.MONGODBPWD ? "✅ Yes" : "❌ No");
// console.log("Password length:", process.env.MONGODBPWD?.length);
const connectToDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://sagrvma:${MONGODBPWD}@mongodb-basics.k0rywgn.mongodb.net/`
    );
    console.log("Connection to mongoDB successful!");
  } catch (error) {
    console.log("Connection to mongoDB failed.", error);
    process.exit(1);
  }
};

module.exports = connectToDB;
