const express = require("express");

const app = express();

//Middleware
app.use(express.json());

let books = [
  {
    id: "1",
    title: "Book 1",
  },
  {
    id: "1",
    title: "Book 1",
  },
];

//Intro route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to our bookstore API",
  });
});

//Get all routes
app.get("/get", (req, res) => {
  res.json(books);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is now running at port ${port}`);
});
