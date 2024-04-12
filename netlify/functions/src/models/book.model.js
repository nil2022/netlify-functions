const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Not Provided"],
    unique: true
  },
  author: {
    type: String,
    required: [true, "Not Provided"]
  },
  ISBN: {
    type: String,
    required: [true, "Not Provided"],
    unique: true
  },
  publisher: {
    type: String,
    required: [true, "Not Provided"]
  },
  price: {
    type: Number
  },
  language: {
    type: String,
    required: [true, "Not Provided"]
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Book", bookSchema);
