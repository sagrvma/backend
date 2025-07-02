const Book = require("../models/book");

const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find({});
    if (allBooks?.length > 0) {
      return res.status(200).json({
        success: true,
        message: "All books fetched successfully.",
        data: allBooks,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No books present in the collection!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};

const getSingleBookById = async (req, res) => {
  try {
    const bookID = req.params.id;
    const foundBookByID = await Book.findById(bookID);

    if (!foundBookByID) {
      return res.status(404).json({
        success: false,
        message:
          "No book found with the given ID! Please try again with another ID.",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Book with the given ID found successfully",
        data: foundBookByID,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};

const addBook = async (req, res) => {
  try {
    const newBookFormData = req.body;
    const newlyCreatedBook = await Book.create(newBookFormData);
    if (newlyCreatedBook) {
      return res.status(201).json({
        success: true,
        message: "New book added successfully.",
        data: newlyCreatedBook,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const updatedFormData = req.body;
    const bookID = req.params.id;

    const updatedBook = await Book.findByIdAndUpdate(bookID, updatedFormData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message:
          "No book found with the given ID! Please try again with another ID.",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Book with the given ID updated successfully.",
        data: updatedBook,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookID = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(bookID);
    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message:
          "No book found with the given ID! Please try again with another ID.",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Book with the given id deleted successfully.",
        data: deletedBook,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};

module.exports = {
  getAllBooks,
  getSingleBookById,
  addBook,
  updateBook,
  deleteBook,
};
