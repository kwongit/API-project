"use strict";

/** @type {import('sequelize-cli').Migration} */

const { Review } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const reviews = [
  {
    spotId: 1,
    userId: 2,
    review: "Really enjoyed the place, especially being watched by deer",
    stars: 2,
  },
  {
    spotId: 1,
    userId: 3,
    review: "Nice place!",
    stars: 3,
  },
  {
    spotId: 2,
    userId: 2,
    review: "Beautiful, cozy home. The game room was extremely fun!",
    stars: 2,
  },
  {
    spotId: 2,
    userId: 3,
    review:
      "Loved our stay here. Great location about 45 min away from Yosemite.",
    stars: 3,
  },
  {
    spotId: 3,
    userId: 2,
    review: "Great stay!",
    stars: 2,
  },
  {
    spotId: 3,
    userId: 3,
    review: "Very quiet and private house",
    stars: 3,
  },
  {
    spotId: 4,
    userId: 3,
    review: "Great location.",
    stars: 3,
  },
  {
    spotId: 4,
    userId: 1,
    review: "Nice neighborhood, close enough to Yosemite valley.",
    stars: 1,
  },
  {
    spotId: 5,
    userId: 1,
    review: "This place was perfect for our group of six.",
    stars: 1,
  },
  {
    spotId: 5,
    userId: 3,
    review:
      "We usually stay in Yosemite West or Wawona when coming to the park.",
    stars: 3,
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate(reviews, {
      validate: true,
    });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    await queryInterface.bulkDelete(
      options,
      {
        review: reviews.map((review) => review.review),
      },
      {}
    );
  },
};
