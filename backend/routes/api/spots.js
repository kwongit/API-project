const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Spot, Review, SpotImage, User } = require("../../db/models");

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

// Validation middleware for the review creation
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

// Route to get all spots
router.get("/", async (req, res) => {
  const spots = await Spot.findAll({
    include: [
      {
        model: Review,
        attributes: [],
      },
      {
        model: SpotImage,
        attributes: ["url"],
      },
    ],
  });

  // Fetch all reviews from the Reviews table
  const allReviews = await Review.findAll({});

  // Calculate average ratings for each spot
  const spotsWithAvgRatingAndPreviewImage = spots.map((spot) => {
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

    const spotImageUrl =
      spot.SpotImages.length > 0 ? spot.SpotImages[0].url : "";

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
      avgRating: spot.avgRating,
      previewImage: spotImageUrl,
    };
  });

  const spotsResponse = { Spots: spotsWithAvgRatingAndPreviewImage };

  return res.status(200).json(spotsResponse);
});

// Route to get all spots owned by current user
router.get("/current", requireAuth, async (req, res) => {
  const spots = await Spot.findAll({
    where: {
      ownerId: req.user.id,
    },
    include: [
      {
        model: Review,
        attributes: [],
      },
      {
        model: SpotImage,
        attributes: ["url"],
      },
    ],
  });

  // Fetch all reviews from the Reviews table
  const allReviews = await Review.findAll({});

  // Calculate average ratings for each spot
  const spotsWithAvgRatingAndPreviewImage = spots.map((spot) => {
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

    const spotImageUrl =
      spot.SpotImages.length > 0 ? spot.SpotImages[0].url : "";

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
      avgRating: spot.avgRating,
      previewImage: spotImageUrl,
    };
  });

  const spotsResponse = { Spots: spotsWithAvgRatingAndPreviewImage };

  return res.status(200).json(spotsResponse);
});

// Route to get details of a spot from an id
router.get("/:spotId", async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    include: [
      {
        model: Review,
        attributes: [],
      },
      {
        model: SpotImage,
        attributes: ["id", "url", "preview"],
      },
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });

  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  // Fetch all reviews from the Reviews table and filter by id
  const allReviews = await Review.findAll({
    where: { spotId: spot.id },
  });

  const totalStars = allReviews.reduce((sum, review) => sum + review.stars, 0);
  const avgStarRating =
    allReviews.length > 0 ? totalStars / allReviews.length : 0;

  const spotImageDetails = spot.SpotImages.map((image) => {
    return {
      id: image.id,
      url: image.url,
      preview: image.preview,
    };
  });

  const spotDetails = {
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
    numReviews: allReviews.length,
    avgStarRating: avgStarRating,
    SpotImages: spotImageDetails,
    Owner: {
      id: spot.User.id,
      firstName: spot.User.firstName,
      lastName: spot.User.lastName,
    },
  };

  return res.status(200).json(spotDetails);
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

// Route to add an image to pot based on spot's id
router.post("/:spotId/images", requireAuth, async (req, res) => {
  const { user } = req;
  const { url, preview } = req.body;

  let spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  if (user.id !== spot.ownerId) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  if (user.id === spot.ownerId) {
    const image = await spot.createSpotImage({
      url: url,
      preview: preview,
    });

    let response = {};
    response.id = image.id;
    response.url = image.url;
    response.preview = image.preview;

    return res.status(200).json(response);
  }
});

// Route to edit a spot
router.put("/:spotId", requireAuth, validateSpot, async (req, res) => {
  const { user } = req;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  let spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  if (user.id !== spot.ownerId) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  if (user.id === spot.ownerId) {
    const editSpot = await spot.update({
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

    return res.status(200).json(editSpot);
  }
});

// Route to delete a spot
router.delete("/:spotId", requireAuth, async (req, res) => {
  const { user } = req;

  let spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  if (user.id !== spot.ownerId) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  if (user.id === spot.ownerId) {
    spot.destroy();

    return res.status(200).json({
      message: "Successfully deleted",
    });
  }
});

// Route to create review for spot based on spot id
router.post(
  "/:spotId/reviews",
  requireAuth,
  validateReview,
  async (req, res) => {
    const { spotId } = req.params;
    const { review, stars } = req.body;
    const userId = req.user.id;

    // Check if the spot exists
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    }

    // Check if the user already has a review for this spot
    const existingReview = await Review.findOne({
      where: {
        spotId: spotId,
        userId: userId,
      },
    });

    if (existingReview) {
      return res.status(500).json({
        message: "User already has a review for this spot",
      });
    }

    // Create a new review
    const newReview = await spot.createReview({
      userId: userId,
      spotId: spotId,
      review: review,
      stars: stars,
    });

    return res.status(201).json(newReview);
  }
);

module.exports = router;
