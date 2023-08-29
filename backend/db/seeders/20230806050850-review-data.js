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
    review: "Really enjoyed the place, especially being watched by deer.",
    stars: 5,
  },
  {
    spotId: 1,
    userId: 3,
    review: "Nice place! Will book this spot again!",
    stars: 4,
  },
  {
    spotId: 2,
    userId: 2,
    review: "Beautiful, cozy home. The game room was extremely fun!",
    stars: 4,
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
    review: "Great stay! Highly recommend to anyone checking out the area!",
    stars: 5,
  },
  {
    spotId: 3,
    userId: 3,
    review: "Very quiet and private house. Great space and views.",
    stars: 3,
  },
  {
    spotId: 4,
    userId: 3,
    review: "Great location. Great parking. Very clean. Great host!",
    stars: 3,
  },
  {
    spotId: 4,
    userId: 1,
    review: "Nice neighborhood, close enough to Yosemite valley.",
    stars: 4,
  },
  {
    spotId: 5,
    userId: 1,
    review: "This place was perfect for our group of six.",
    stars: 4,
  },
  {
    spotId: 5,
    userId: 3,
    review:
      "We usually stay in Yosemite West or Wawona when coming to the park.",
    stars: 4,
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
