require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/db");
const authRouter = require("./routes/auth-routes");
const app = express();

const PORT = process.env.PORT;

connectToDB();

app.use(express.json()); //Middleware

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is now successfully running on port ${PORT}`);
});
