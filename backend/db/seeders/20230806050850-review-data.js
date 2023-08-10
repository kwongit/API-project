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
    review: "spot1 user1",
    stars: 1,
  },
  {
    spotId: 1,
    userId: 2,
    review: "spot1 user2",
    stars: 2,
  },
  {
    spotId: 2,
    userId: 3,
    review: "spot2 user3",
    stars: 3,
  },
  {
    spotId: 2,
    userId: 1,
    review: "spot2 user1",
    stars: 4,
  },
  {
    spotId: 3,
    userId: 2,
    review: "spot3 user2",
    stars: 5,
  },
  {
    spotId: 4,
    userId: 3,
    review: "spot4 user3",
    stars: 1,
  },
  {
    spotId: 5,
    userId: 1,
    review: "spot5 user1",
    stars: 2,
  },
  {
    spotId: 6,
    userId: 2,
    review: "spot6 user2",
    stars: 3,
  },
  {
    spotId: 7,
    userId: 3,
    review: "spot7 user3",
    stars: 4,
  },
  {
    spotId: 8,
    userId: 1,
    review: "spot8 user1",
    stars: 5,
  },
  {
    spotId: 9,
    userId: 2,
    review: "spot9 user2",
    stars: 1,
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
