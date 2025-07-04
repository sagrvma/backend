require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/db");
const app = express();

const PORT = process.env.PORT;

connectToDB();

app.listen(PORT, () => {
  console.log(`Server is now successfully running on port ${PORT}`);
});
