const express = require("express");

const { requireAuth } = require("../../utils/auth");
const {
  Review,
  User,
  Spot,
  ReviewImage,
  SpotImage,
} = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// Route to get all reviews of current user
router.get("/current", requireAuth, async (req, res) => {
  const reviews = await Review.findAll({
    where: {
      userId: req.user.id,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Spot,
        attributes: [
          "id",
          "ownerId",
          "address",
          "city",
          "state",
          "country",
          "lat",
          "lng",
          "name",
          "price",
        ],
        include: [
          {
            model: SpotImage,
            attributes: ["url"],
          },
        ],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
    attributes: [
      "id",
      "userId",
      "spotId",
      "review",
      "stars",
      "createdAt",
      "updatedAt",
    ],
  });

  // Transform the reviews
  const formattedReviews = reviews.map((review) => ({
    id: review.id,
    userId: review.userId,
    spotId: review.spotId,
    review: review.review,
    stars: review.stars,
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
    User: review.User,
    Spot: {
      id: review.Spot.id,
      ownerId: review.Spot.ownerId,
      address: review.Spot.address,
      city: review.Spot.city,
      state: review.Spot.state,
      country: review.Spot.country,
      lat: review.Spot.lat,
      lng: review.Spot.lng,
      name: review.Spot.name,
      price: review.Spot.price,
      previewImage:
        review.Spot.SpotImages.length > 0 ? review.Spot.SpotImages[0].url : "",
    },
    ReviewImages: review.ReviewImages,
  }));

  const reviewsResponse = { Reviews: formattedReviews };

  return res.status(200).json(reviewsResponse);
});

module.exports = router;
