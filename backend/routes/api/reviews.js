const express = require("express");

const { requireAuth } = require("../../utils/auth");
const {
  User,
  Spot,
  SpotImage,
  Review,
  ReviewImage,
} = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// Validation middleware for review creation
const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

// get reviews of current user
router.get("/current", requireAuth, async (req, res) => {
  const userId = req.user.id;

  // find all reviews by userId associated with users, spots, spotImages, reviewImages
  const reviews = await Review.findAll({
    where: {
      userId,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Spot,
        include: [
          {
            model: SpotImage,
            attributes: ["url", "preview"],
          },
        ],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });

  // map new reviews array to handle Spot > SpotImage > ReviewImage
  const newReviews = reviews.map((review) => {
    // destructure reviews
    const {
      id,
      userId,
      // spotId,
      // review,
      review: reviewText,
      stars,
      createdAt,
      updatedAt,
      User,
      Spot: {
        id: spotId,
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        price,
        SpotImages,
      },
      ReviewImages,
    } = review;

    let spotImageUrl = "";

    // check if there are SpotImages
    for (const spotImage of SpotImages) {
      if (spotImage.preview) {
        spotImageUrl = spotImage.url;
        break;
      }
    }

    const previewImage = spotImageUrl;

    // return new reviews array of objects
    return {
      id,
      userId,
      spotId,
      // review,
      review: reviewText,
      stars,
      createdAt,
      updatedAt,
      User,
      Spot: {
        id: spotId,
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        price,
        previewImage,
      },
      ReviewImages,
    };
  });

  // restructure Reviews response
  const response = { Reviews: newReviews };
  return res.status(200).json(response);
});

// create an image for a review
router.post("/:reviewId/images", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const reviewId = req.params.reviewId;
  const { url } = req.body;

  // find review by reviewId
  const review = await Review.findByPk(reviewId, {
    include: [
      {
        model: ReviewImage,
      },
    ],
  });

  // check if review exists
  if (!review) {
    return res.status(404).json({
      message: "Review couldn't be found",
    });
  }

  // check if review belongs to user
  if (userId !== review.userId) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  // cannot have more than 10 images
  if (review.ReviewImages.length >= 10) {
    return res.status(403).json({
      message: "Maximum number of images for this resource was reached",
    });
  }

  const image = await review.createReviewImage({
    url: url,
  });

  const response = {
    id: image.id,
    url: image.url,
  };

  return res.status(200).json(response);
});

// edit a review
router.put("/:reviewId", requireAuth, validateReview, async (req, res) => {
  const userId = req.user.id;
  const reviewId = req.params.reviewId;
  const { review, stars } = req.body;

  // find review by reviewId
  const reviewToEdit = await Review.findByPk(reviewId);

  // check if review exists
  if (!reviewToEdit) {
    return res.status(404).json({
      message: "Review couldn't be found",
    });
  }

  // check if review belongs to user
  if (userId !== reviewToEdit.userId) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  const updatedReview = await reviewToEdit.update({
    review,
    stars,
  });

  return res.status(200).json(updatedReview);
});

// delete a review
router.delete("/:reviewId", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const reviewId = req.params.reviewId;

  // find review by reviewId
  const review = await Review.findByPk(reviewId);

  // check if review exists
  if (!review) {
    return res.status(404).json({
      message: "Review couldn't be found",
    });
  }

  // check if review belongs to user
  if (userId !== review.userId) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  await review.destroy();

  return res.status(200).json({
    message: "Successfully deleted",
  });
});

module.exports = router;
