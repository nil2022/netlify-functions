const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Not Provided"]
  },
  userId: {
    type: String,
    required: [true, "Not Provided"],
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, "Not Provided"],
  },
  email: {
    type: String,
    required: [true, "Not Provided"],
    lowercase: true,
    unique: true
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

module.exports = mongoose.model("User", userSchema);
