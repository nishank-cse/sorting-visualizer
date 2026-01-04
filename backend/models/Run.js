const mongoose = require("mongoose");

const RunSchema = new mongoose.Schema({
  algorithm: String,
  timeTaken: Number,
  arraySize: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Run", RunSchema);
