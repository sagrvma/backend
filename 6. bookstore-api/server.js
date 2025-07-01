require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/db");
const bookRoutes = require("./routes/book-route");

const app = express();

const PORT = process.env.PORT;

//Connect to database
connectToDB();

//Middleware - express.json()
app.use(express.json());

//Routes here
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is now running at port ${PORT}`);
});
