const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Review, ReviewImage } = require("../../db/models");

const router = express.Router();

// delete a review image
router.delete("/:imageId", requireAuth, async (req, res) => {
  const imageId = req.params.imageId;
  const userId = req.user.id;

  // find review image by imageId
  const reviewImg = await ReviewImage.findByPk(imageId);

  // check if review image exists
  if (!reviewImg) {
    return res.status(404).json({
      message: "Review Image couldn't be found",
    });
  }

  // find review associated to review image
  const review = await Review.findByPk(reviewImg.reviewId);

  // check if review belongs to user
  if (userId !== review.userId) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  await reviewImg.destroy();

  return res.status(200).json({
    message: "Successfully deleted",
  });
});

module.exports = router;
