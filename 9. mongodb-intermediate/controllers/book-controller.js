const Author = require("../models/author");
const Book = require("../models/book");

const createAuthor = async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    return res.status(200).json({
      success: true,
      message: "New author added successfully.",
      data: author,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

const createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    return res.status(200).json({
      success: true,
      message: "New book added successfully.",
      data: book,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("author");

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "No book found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book found successfully.",
      data: book,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};

module.exports = { createAuthor, createBook, getBook };
