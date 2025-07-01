const express = require("express");
const {
  getAllBooks,
  getSingleBookById,
  addBook,
  updateBook,
  deleteBook,
} = require("../controllers/book-controller");

//Create Express router
const router = express.Router();

//All routers that are related to books only
router.get("/get", getAllBooks);
router.get("/get/:id", getSingleBookById);
router.post("/add", addBook);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);

module.exports = router;
