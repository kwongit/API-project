const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Spot, Review, SpotImage, sequelize } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// Validate latitude within -90 to 90 degrees
const validateLatitude = (value) => {
  if (!/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/.test(value)) {
    throw new Error("Latitude is not valid");
  }
  return true;
};

// Validate longitude within -180 to 180 degrees
const validateLongitude = (value) => {
  if (!/^[-+]?(180(\.0+)?|((1[0-7]\d)|(\d{1,2}))(\.\d+)?)$/.test(value)) {
    throw new Error("Longitude is not valid");
  }
  return true;
};

// Validation middleware for the spot creation
const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat").exists({ checkFalsy: true }).custom(validateLatitude),
  check("lng").exists({ checkFalsy: true }).custom(validateLongitude),
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isLength({ max: 49 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

// Route to get all spots
router.get("/", async (req, res) => {
  // Fetch all spots with avgRating and previewImage
  const spots = await Spot.findAll({
    include: [
      {
        model: Review,
        attributes: [],
        // attributes: [
        //   [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
        // ],
      },
      {
        model: SpotImage,
        attributes: ["url"],
        where: {
          preview: true,
        },
      },
    ],
    group: ["Spot.id"],
  });

  // Fetch all reviews from the Reviews table
  const allReviews = await Review.findAll({});

  // Calculate average ratings for each spot
  for (const spot of spots) {
    const spotId = spot.id;

    // Find reviews for the current spot
    const spotReviews = allReviews.filter((review) => review.spotId === spotId);

    // Calculate average stars
    if (spotReviews.length > 0) {
      const totalStars = spotReviews.reduce(
        (sum, review) => sum + review.stars,
        0
      );
      const avgStars = totalStars / spotReviews.length;
      spot.avgRating = avgStars;
    } else {
      spot.avgRating = 0; // Default value if no reviews are available
    }
  }

  const spotsWithAvgRatingAndPreviewImage = spots.map((spot) => {
    // const avgStarRating =
    //   spot.Reviews.length > 0
    //     ? parseFloat(spot.Reviews[0].dataValues.avgRating)
    //     : 0;
    const spotImageUrl = spot.SpotImages[0].url;
    return {
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      // avgRating: avgStarRating,
      avgRating: spot.avgRating,
      previewImage: spotImageUrl,
    };
  });

  return res.status(200).json(spotsWithAvgRatingAndPreviewImage);
});

// Route to create a new spot
router.post("/", requireAuth, validateSpot, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  // Create the new spot
  const newSpot = await Spot.create({
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  return res.status(201).json(newSpot);
});

module.exports = router;
