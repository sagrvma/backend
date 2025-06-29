const express = require("express");

const app = express();

//Middleware
app.use(express.json());
//When cient sends json data to my server, it arrives as a raw stream of bytes, which the server won't
//be able to understand as it is. So this middleware parses incoming JSON data from the HTTP request bodies
//and makes it available as req.body in my route handlers.
/*express.json() does this internally:
// 1. Checks Content-Type header
// 2. If it's "application/json", reads the raw body
// 3. Parses the JSON string into a JavaScript object
// 4. Assigns the object to req.body
// 5. Calls next() to continue to your route handler
*/

let books = [
  {
    id: 1,
    title: "Book 1",
  },
  {
    id: 2,
    title: "Book 2",
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

//Get a single book
app.get("/get/:id", (req, res) => {
  const book = books.find((book) => book.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({
      message: "Book not found!",
    });
  }
});

//Add a book
app.post("/add", (req, res) => {
  const newId =
    books.length > 0 ? Math.max(...books.map((book) => book.id)) + 1 : 1;
  const newBook = {
    id: newId,
    title: `Book ${books.length + 1}`,
  };
  books.push(newBook);
  res.status(201).json({
    data: newBook,
    message: "New book added successfully!",
  });
});

//Update a book
app.put("/update/:id", (req, res) => {
  const book = books.find((book) => book.id === parseInt(req.params.id));
  if (book) {
    book.title = req.body.title || book.title;
    res.status(200).json({
      message: `Book with id ${req.params.id} updated successfully!`,
      data: book,
    });
  } else {
    res.status(404).json({
      message: "Book not found!",
    });
  }
});

//Delete a book
app.delete("/delete/:id", (req, res) => {
  const bookIndex = books.findIndex(
    (book) => book.id === parseInt(req.params.id)
  );

  if (bookIndex !== -1) {
    const deletedBook = books.splice(bookIndex, 1)[0];
    res.status(200).json({
      message: `Book with id ${req.params.id} deleted successfully!`,
      data: deletedBook,
    });
  } else {
    res.status(404).json({
      message: "Book not found!",
    });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is now running at port ${port}`);
});
