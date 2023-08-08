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
    userId: 1,
    review: "first review for spotId 1 by userId 1",
    stars: 4,
  },
  {
    spotId: 1,
    userId: 2,
    review: "second review for spotId 1 by userId 2",
    stars: 5,
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
