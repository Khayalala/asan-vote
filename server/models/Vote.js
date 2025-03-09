const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  centerId: Number, // The index of the voted center
  ipAddress: String, // User's IP address to prevent multiple votes
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;
