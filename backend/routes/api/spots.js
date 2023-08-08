const express = require("express");
const { Spot } = require("../../db/models");

const router = express.Router();

// Get all spots
router.get("/", async (req, res) => {
  const spots = await Spot.findAll();

  return res.status(200).json({
    Spots: spots,
  });
});

module.exports = router;
