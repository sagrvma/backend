const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Album title is mandatory."],
    trim: true,
    maxlength: [100, "Album title can't be more than a 100 characters."],
  },
  artist: {
    type: String,
    required: [true, "Album artist is mandatory."],
    trim: true,
    maxlength: [100, "Artist's name can't be more than 100 characters."],
  },
  year: {
    type: Number,
    required: [true, "Album release year is mandatory."],
    min: [1000, "Album release year has to be after 1000."],
    max: [new Date().getFullYear(), "Album release can't be in the future."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Album", AlbumSchema);
