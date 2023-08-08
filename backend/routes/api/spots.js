const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Spot } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// Validation middleware for the spot creation
const validateSpot = [
  check("address").notEmpty().withMessage("Street address is required"),
  check("city").notEmpty().withMessage("City is required"),
  check("state").notEmpty().withMessage("State is required"),
  check("country").notEmpty().withMessage("Country is required"),
  check("lat")
    .notEmpty()
    .withMessage("Latitude is required")
    .isDecimal({ decimal_digits: "7" })
    .withMessage("Latitude is not valid"),
  check("lng")
    .notEmpty()
    .withMessage("Longitude is required")
    .isFloat({ decimal_digits: "7" })
    .withMessage("Longitude is not valid"),
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 49 })
    .withMessage("Name must be less than 50 characters"),
  check("description").notEmpty().withMessage("Description is required"),
  check("price").notEmpty().withMessage("Price per day is required"),
  handleValidationErrors,
];

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
