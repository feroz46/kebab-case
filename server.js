const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema({
  tokenNumber: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Queue", queueSchema);
