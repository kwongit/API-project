const express = require("express");

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

// Route to get all bookings of current user
router.get("/current", requireAuth, async (req, res) => {
  const bookings = await Booking.findAll({
    where: {
      userId: req.user.id,
    },
    include: [
      {
        model: Spot,
        include: [
          {
            model: SpotImage,
            attributes: ["url"],
          },
        ],
      },
    ],
  });

  // Transform the bookings
  const formattedBookings = bookings.map((booking) => ({
    id: booking.id,
    spotId: booking.spotId,
    userId: booking.userId,
    startDate: booking.startDate,
    endDate: booking.endDate,
    createdAt: booking.createdAt,
    updatedAt: booking.updatedAt,
    Spot: {
      id: booking.Spot.id,
      ownerId: booking.Spot.ownerId,
      address: booking.Spot.address,
      city: booking.Spot.city,
      state: booking.Spot.state,
      country: booking.Spot.country,
      lat: booking.Spot.lat,
      lng: booking.Spot.lng,
      name: booking.Spot.name,
      price: booking.Spot.price,
      previewImage:
        booking.Spot.SpotImages.length > 0
          ? booking.Spot.SpotImages[0].url
          : "",
    },
  }));

  const bookingsResponse = { Bookings: formattedBookings };

  return res.status(200).json(bookingsResponse);
});

// // Route to edit a review
// router.put("/:reviewId", requireAuth, validateReview, async (req, res) => {
//   const { user } = req;
//   const { review, stars } = req.body;

//   let reviewToEdit = await Review.findByPk(req.params.reviewId);

//   if (!reviewToEdit) {
//     return res.status(404).json({
//       message: "Review couldn't be found",
//     });
//   }

//   if (user.id !== reviewToEdit.userId) {
//     return res.status(403).json({
//       message: "Forbidden",
//     });
//   }

//   if (user.id === reviewToEdit.userId) {
//     const editReview = await reviewToEdit.update({
//       review,
//       stars,
//     });

//     return res.status(200).json(editReview);
//   }
// });

// // Route to delete a review
// router.delete("/:reviewId", requireAuth, async (req, res) => {
//   const { user } = req;

//   let reviewToDelete = await Review.findByPk(req.params.reviewId);

//   if (!reviewToDelete) {
//     return res.status(404).json({
//       message: "Review couldn't be found",
//     });
//   }

//   if (user.id !== reviewToDelete.userId) {
//     return res.status(403).json({
//       message: "Forbidden",
//     });
//   }

//   if (user.id === reviewToDelete.userId) {
//     reviewToDelete.destroy();

//     return res.status(200).json({
//       message: "Successfully deleted",
//     });
//   }
// });

module.exports = router;
