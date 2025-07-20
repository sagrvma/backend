require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/db");
const productRouter = require("./routes/product-routes");
const bookRouter = require("./routes/book-routes");

const app = express();
const port = process.env.PORT;

//Connect to mongoDB
connectToDB();

//Middleware
app.use(express.json());

app.use("/products", productRouter);
app.use("/reference", bookRouter);

app.listen(port, () => {
  console.log(`App is successfully running on port ${port}`);
});
