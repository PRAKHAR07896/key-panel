const mongoose = require("mongoose");

const keySchema = new mongoose.Schema({
  key: String,
  userId: String,
  expiresAt: Date
});

module.exports = mongoose.model("Key", keySchema);