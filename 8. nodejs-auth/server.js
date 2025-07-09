require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/db");
const authRouter = require("./routes/auth-routes");
const homeRouter = require("./routes/home-routes");
const adminRouter = require("./routes/admin-routes");
const uploadImageRouter = require("./routes/image-routes");
const app = express();

const PORT = process.env.PORT;
//Database connection
connectToDB();
//Middleware
app.use(express.json());
//Routes
app.use("/api/auth", authRouter);
app.use("/api/home", homeRouter);
app.use("/api/admin", adminRouter);
app.use("/api/image", uploadImageRouter);

app.listen(PORT, () => {
  console.log(`Server is now successfully running on port ${PORT}`);
});
