const Book = require("../models/book");

const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find({});
    if (allBooks?.length > 0) {
      res.status(200).json({
        success: true,
        message: "All books fetched successfully.",
        data: allBooks,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No books present in the collection!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};

const getSingleBookById = async (req, res) => {};

const addBook = async (req, res) => {
  try {
    const newBookFormData = req.body;
    const newlyCreatedBook = await Book.create(newBookFormData);
    if (newlyCreatedBook) {
      res.status(201).json({
        success: true,
        message: "New book added successfully.",
        data: newlyCreatedBook,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};

const updateBook = async (req, res) => {};

const deleteBook = async (req, res) => {};

module.exports = {
  getAllBooks,
  getSingleBookById,
  addBook,
  updateBook,
  deleteBook,
};
