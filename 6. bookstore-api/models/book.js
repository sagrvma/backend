const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book title is mandatory"],
    trim: true,
    maxLength: [100, "Book title can not be more than 100 characters"],
  },
  author: {
    type: String,
    required: [true, "Author name is mandatory"],
    trim: true,
    maxLength: [100, "Author name can not be more than 100 characters"],
  },
  year: {
    type: Number,
    require: [true, "Publication year is mandatory"],
    min: [1000, "Publication year has to be after 1000"],
    max: [new Date().getFullYear, "Publication year can't be in the future"],
  },
  createdAt: {
    type: Date,
    default: new Date.now(),
  },
});

module.exports = mongoose.model("Book", BookSchema);
