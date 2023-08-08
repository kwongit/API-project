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
  // Fetch all spots
  const spots = await Spot.findAll({
    // attributes: {
    //   include: [
    //     [
    //       sequelize.literal(`(
    //           SELECT AVG(stars)
    //           FROM Reviews
    //           WHERE Reviews.spotId = Spot.id
    //         )`),
    //       "avgRating",
    //     ],
    //   ],
    // },
    // // Include the preview image URL using a subquery
    // include: [
    //   {
    //     model: SpotImage,
    //     attributes: ["url"],
    //     where: { preview: true },
    //     required: false,
    //   },
    // ],
  });

  return res.status(200).json({
    Spots: spots,
  });
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
