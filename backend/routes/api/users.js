const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// Validation middleware for the signup request
const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  // check("firstName")
  //   .exists({ checkFalsy: true })
  //   .withMessage("First Name is required"),
  // check("lastName")
  //   .exists({ checkFalsy: true })
  //   .withMessage("Last Name is required"),
  handleValidationErrors,
];

// Route to sign up a user
router.post("/", validateSignup, async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;

  // Check if a user with the same email or username already exists
  const existingUserEmail = await User.findOne({
    where: { email: email },
  });
  if (existingUserEmail) {
    return res.status(500).json({
      message: "User already exists",
      errors: { email: "User with that email already exists" },
    });
  }

  const existingUsername = await User.findOne({
    where: { username: username },
  });
  if (existingUsername) {
    return res.status(500).json({
      message: "User already exists",
      errors: { username: "User with that username already exists" },
    });
  }

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password);

  // Create the new user
  const user = await User.create({
    firstName,
    lastName,
    email,
    username,
    hashedPassword,
  });

  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  };

  await setTokenCookie(res, safeUser);

  return res.status(200).json({
    user: safeUser,
  });
});

module.exports = router;
