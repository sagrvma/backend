const express = require("express");
const {
  createAuthor,
  createBook,
  getBook,
} = require("../controllers/book-controller");

const router = express.Router();

router.post("/author", createAuthor);
router.post("/book", createBook);
router.get("/book/:id", getBook);

module.exports = router;
