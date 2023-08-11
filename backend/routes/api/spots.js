const express = require("express");
const { Op } = require("sequelize");

const { requireAuth } = require("../../utils/auth");
const {
  User,
  Spot,
  SpotImage,
  Review,
  ReviewImage,
  Booking,
} = require("../../db/models");

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

// Validation middleware for spot creation
const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    // .isDecimal()
    // .isLatLong()
    // .withMessage("Latitude is not valid"),
    .custom(validateLatitude),
  check("lng")
    .exists({ checkFalsy: true })
    // .isDecimal()
    // .isLatLong()
    // .withMessage("Longitude is not valid"),
    .custom(validateLongitude),
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

// Validate date format
const validateDate = (value, { req }) => {
  if (new Date(value) <= new Date(req.body.startDate)) {
    throw new Error("endDate cannot be on or before startDate");
  }
  return true;
};

// Validation middleware for the booking creation
const validateBooking = [
  check("endDate").exists({ checkFalsy: true }).custom(validateDate),
  handleValidationErrors,
];

// Validation middleware for the query filters
const validateQueryFilters = [
  check("page")
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage("Page must be greater than or equal to 1"),
  check("size")
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage("Size must be greater than or equal to 1"),
  check("maxLat")
    .optional()
    .isDecimal()
    .withMessage("Maximum latitude is invalid"),
  check("minLat")
    .optional()
    .isDecimal()
    .withMessage("Minimum latitude is invalid"),
  check("maxLng")
    .optional()
    .isDecimal()
    .withMessage("Maximum longitude is invalid"),
  check("minLng")
    .optional()
    .isDecimal()
    .withMessage("Minimum longitude is invalid"),
  check("maxPrice")
    .optional()
    .isDecimal({ min: 0 })
    .withMessage("Maximum price must be greater than or equal to 0"),
  check("minPrice")
    .optional()
    .isDecimal({ min: 0 })
    .withMessage("Minimum price must be greater than or equal to 0"),
  handleValidationErrors,
];

// Function to calculate avgRating and previewImage for EACH spot
const calculateAvgRatingAndPreviewImage = (spots, reviews) => {
  const spotsWithAvgRatingAndPreviewImage = [];

  for (const spot of spots) {
    const spotId = spot.id;
    const spotReviews = [];
    let totalStars = 0;

    for (const review of reviews) {
      // check if review belongs to CURRENT spot
      if (review.spotId === spotId) {
        spotReviews.push(review);
        totalStars += review.stars;
      }
    }

    // calculate avgRating
    const avgRating =
      spotReviews.length > 0 ? totalStars / spotReviews.length : 0;

    let spotImageUrl = "";

    // check if there are SpotImages
    for (const spotImage of spot.SpotImages) {
      if (spotImage.preview) {
        spotImageUrl = spotImage.url;
        break;
      }
    }

    // construct updated spot object with avgRating and previewImage
    const updatedSpot = {
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
      avgRating: avgRating,
      previewImage: spotImageUrl,
    };

    // populate spotsWithAvgRatingAndPreviewImage array with updated spot objects
    spotsWithAvgRatingAndPreviewImage.push(updatedSpot);
  }

  return spotsWithAvgRatingAndPreviewImage;
};

// get all spots w/ query filters
router.get("/", validateQueryFilters, async (req, res) => {
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;

  page = parseInt(page);
  size = parseInt(size);

  if (Number.isNaN(page)) page = 1;
  if (Number.isNaN(size)) size = 20;

  // find all spots associated with reviews and spotImages
  const spots = await Spot.findAll({
    include: [
      {
        model: Review,
        attributes: [],
      },
      {
        model: SpotImage,
        attributes: ["url", "preview"],
      },
    ],
    limit: size,
    offset: size * (page - 1),
  });

  // find all reviews
  const reviews = await Review.findAll({});

  // call calculateAvgRatingAndPreviewImage helper function
  const spotsResponse = calculateAvgRatingAndPreviewImage(spots, reviews);

  // restructure Spots response
  const response = {
    Spots: spotsResponse,
    page: page,
    size: size,
  };
  return res.status(200).json(response);
});

// get spots of current user
router.get("/current", requireAuth, async (req, res) => {
  const ownerId = req.user.id;

  // find all spots by ownerId associated with reviews and spotImages
  const spots = await Spot.findAll({
    where: {
      ownerId,
    },
    include: [
      {
        model: Review,
        attributes: [],
      },
      {
        model: SpotImage,
        attributes: ["url", "preview"],
      },
    ],
  });

  // find all reviews
  const reviews = await Review.findAll({});

  // call calculateAvgRatingAndPreviewImage helper function
  const spotsResponse = calculateAvgRatingAndPreviewImage(spots, reviews);

  // restructure Spots response
  const response = { Spots: spotsResponse };
  return res.status(200).json(response);
});

// get details of a spot by id
router.get("/:spotId", async (req, res) => {
  const spotId = req.params.spotId;

  // find spot by spotId associated with reviews, spotImages, users
  const spot = await Spot.findByPk(spotId, {
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

  // check if spot exists
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  // find all reviews by spotId
  const reviews = await Review.findAll({
    where: { spotId },
  });

  // calculate avgStarRating
  let totalStars = 0;
  for (const review of reviews) {
    totalStars += review.stars;
  }
  const avgStarRating = reviews.length > 0 ? totalStars / reviews.length : 0;

  // construct the spotImageDetails array
  const spotImageDetails = [];
  for (const image of spot.SpotImages) {
    spotImageDetails.push({
      id: image.id,
      url: image.url,
      preview: image.preview,
    });
  }

  // construct spot details object with numReviews, avgStarRating, SpotImages, Owner
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
    numReviews: reviews.length,
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

// create a spot
router.post("/", requireAuth, validateSpot, async (req, res) => {
  const userId = req.user.id;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  // create new spot
  const spot = await Spot.create({
    ownerId: userId,
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

  return res.status(201).json(spot);
});

// create an image for a spot
router.post("/:spotId/images", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const spotId = req.params.spotId;
  const { url, preview } = req.body;

  // find spot by spotId
  const spot = await Spot.findByPk(spotId);

  // check if spot exists
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  // check if spot belongs to user
  if (userId !== spot.ownerId) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  const image = await spot.createSpotImage({
    url,
    preview,
  });

  // restructure response
  const response = {
    id: image.id,
    url: image.url,
    preview: image.preview,
  };

  return res.status(200).json(response);
});

// edit a spot
router.put("/:spotId", requireAuth, validateSpot, async (req, res) => {
  const userId = req.user.id;
  const spotId = req.params.spotId;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  // find spot by spotId
  const spot = await Spot.findByPk(spotId);

  // check if spot exists
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  // check if spot belongs to user
  if (userId !== spot.ownerId) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  const updateSpot = await spot.update({
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

  return res.status(200).json(updateSpot);
});

// delete a spot
router.delete("/:spotId", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const spotId = req.params.spotId;

  // find spot by spotId
  const spot = await Spot.findByPk(spotId);

  // check if the spot exists
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  // check if spot belongs to user
  if (userId !== spot.ownerId) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  await spot.destroy();

  return res.status(200).json({
    message: "Successfully deleted",
  });
});

// create a review for a spot
router.post(
  "/:spotId/reviews",
  requireAuth,
  validateReview,
  async (req, res) => {
    const userId = req.user.id;
    const spotId = req.params.spotId;
    const { review, stars } = req.body;

    // find spot by spotId
    const spot = await Spot.findByPk(spotId);

    // check if spot exists
    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    }

    // check if user already has a review for THIS spot
    const existingReview = await Review.findOne({
      where: {
        spotId,
        userId,
      },
    });

    if (existingReview) {
      return res.status(500).json({
        message: "User already has a review for this spot",
      });
    }

    const newReview = await spot.createReview({
      userId,
      spotId,
      review,
      stars,
    });

    return res.status(201).json(newReview);
  }
);

// get reviews by spot id
router.get("/:spotId/reviews", async (req, res) => {
  const spotId = req.params.spotId;

  // find spot by spotId
  const spot = await Spot.findByPk(spotId);

  // check if spot exists
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  // find all reviews by spotId associated with users, reviewImages
  const reviews = await Review.findAll({
    where: {
      spotId: spotId,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });

  // construct formattedReviews array
  const formattedReviews = [];
  for (const review of reviews) {
    formattedReviews.push({
      id: review.id,
      userId: review.userId,
      spotId: review.spotId,
      review: review.review,
      stars: review.stars,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      User: review.User,
      ReviewImages: review.ReviewImages,
    });
  }

  // restructure Reviews response
  const response = { Reviews: formattedReviews };

  return res.status(200).json(response);
});

// create booking based on a spot id
router.post(
  "/:spotId/bookings",
  requireAuth,
  validateBooking,
  async (req, res) => {
    const userId = req.user.id;
    const spotId = req.params.spotId;
    let { startDate, endDate } = req.body;

    // convert to Date objects
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    // find spot by spotId
    const spot = await Spot.findByPk(spotId);

    // check if spot exists
    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    }

    // Spot must NOT belong to the current user
    if (userId === spot.ownerId) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    // check booking conflicts by spotId
    const existingBooking = await Booking.findOne({
      where: {
        spotId,
        [Op.or]: [
          {
            startDate: {
              [Op.between]: [startDate, endDate],
            },
          },
          {
            endDate: {
              [Op.between]: [startDate, endDate],
            },
          },
        ],
      },
    });

    if (existingBooking) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
    }

    const newBooking = await spot.createBooking({
      spotId,
      userId,
      startDate,
      endDate,
    });

    return res.status(200).json(newBooking);
  }
);

// get all bookings for a spot by id
router.get("/:spotId/bookings", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const spotId = req.params.spotId;

  // find spot by spotId
  const spot = await Spot.findByPk(spotId);

  // check if spot exists
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  // If you ARE NOT the owner of the spot.
  if (userId !== spot.ownerId) {
    // find all bookings by spotId
    const bookings = await Booking.findAll({
      where: {
        spotId,
      },
      attributes: ["spotId", "startDate", "endDate"],
    });

    // restructure Bookings response
    const response = { Bookings: bookings };
    return res.status(200).json(response);
  }

  // If you ARE the owner of the spot.
  if (userId === spot.ownerId) {
    // find all bookings by spotId associated with users
    const bookings = await Booking.findAll({
      where: {
        spotId,
      },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
      ],
      attributes: [
        "id",
        "spotId",
        "userId",
        "startDate",
        "endDate",
        "createdAt",
        "updatedAt",
      ],
    });

    return res.status(200).json({ Bookings: bookings });
  }
});

module.exports = router;
