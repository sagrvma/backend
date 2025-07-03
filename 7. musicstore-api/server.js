require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/db");

const app = express();
const PORT = process.env.PORT;

connectToDB(); //Connect to the database

app.use(express.json()); //Middleware

app.listen(PORT, () => {
  console.log(`Server is now running at port ${PORT}`);
});
