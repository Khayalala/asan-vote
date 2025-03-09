const express = require("express");
const Vote = require("../models/Vote");
const router = express.Router();
const requestIp = require("request-ip");

// Get all votes (for results)
router.get("/results", async (req, res) => {
  try {
    const votes = await Vote.aggregate([
      { $group: { _id: "$centerId", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    res.json(votes);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Cast a vote
router.post("/vote", async (req, res) => {
  const { centerId } = req.body;
  const ipAddress = requestIp.getClientIp(req); // Get user's IP

  if (centerId === undefined) {
    return res.status(400).json({ error: "Center ID is required" });
  }

  try {
    // Check if this IP has already voted
    const existingVote = await Vote.findOne({ ipAddress });
    if (existingVote) {
      return res.status(403).json({ error: "Siz artıq səs vermisiniz!" });
    }

    // Store the new vote
    const newVote = new Vote({ centerId, ipAddress });
    await newVote.save();

    res.json({ message: "Vote recorded successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
