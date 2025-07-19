require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/db");

const app = express();
const port = process.env.PORT;

connectToDB();

app.use(express.json());

app.listen(port, () => {
  console.log(`App is successfully running on port ${port}`);
});
