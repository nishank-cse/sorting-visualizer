const express = require("express");
const Run = require("../models/Run");

const router = express.Router();

// Save new run
router.post("/", async (req, res) => {
  try {
    const run = await Run.create(req.body);
    res.json(run);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all runs
router.get("/", async (req, res) => {
  try {
    const runs = await Run.find().sort({ createdAt: -1 });
    res.json(runs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
