require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/db");

const app = express();

const PORT = process.env.PORT;

//Connect to database
connectToDB();

//Middleware - express.json()
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is now running at port ${PORT}`);
});
