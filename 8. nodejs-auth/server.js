require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/db");
const authRouter = require("./routes/auth-routes");
const homeRouter = require("./routes/home-routes");
const app = express();

const PORT = process.env.PORT;

connectToDB();

app.use(express.json()); //Middleware

app.use("/api/auth", authRouter);
app.use("/api/home", homeRouter);

app.listen(PORT, () => {
  console.log(`Server is now successfully running on port ${PORT}`);
});
