const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "Book title is mandatory"],
    trim: true,
    maxLength: [100, "Book title can not be more than 100 characters"],
  },
  author: {
    type: String,
    require: [true, "Author name is mandatory"],
    trim: true,
    maxLength: [100, "Author name can not be more than 100 characters"],
  },
  year: {
    type: Number,
    require: [true, "Publication year is mandatory"],
    min: [1000, "Publication year has to be after 1000"],
    max: [new Date().getFullYear(), "Publication year can't be in the future"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Book", BookSchema);
