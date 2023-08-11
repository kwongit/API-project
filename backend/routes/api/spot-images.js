const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Spot, SpotImage } = require("../../db/models");

const router = express.Router();

// delete a spot image
router.delete("/:imageId", requireAuth, async (req, res) => {
  const imageId = req.params.imageId;
  const userId = req.user.id;

  let spotImg = await SpotImage.findByPk(imageId);

  // check if spot image exists
  if (!spotImg) {
    return res.status(404).json({
      message: "Spot Image couldn't be found",
    });
  }

  // find spot associated to spot image
  const spot = await Spot.findByPk(spotImg.spotId);

  // check if spot belongs to owner
  if (userId !== spot.ownerId) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  if (userId === spot.ownerId) {
    spotImg.destroy();

    return res.status(200).json({
      message: "Successfully deleted",
    });
  }
});
module.exports = router;
