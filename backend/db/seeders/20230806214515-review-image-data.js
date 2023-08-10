"use strict";

/** @type {import('sequelize-cli').Migration} */

const { ReviewImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const reviewImages = [
  {
    reviewId: 1,
    url: "image url 1",
  },
  {
    reviewId: 2,
    url: "image url 2",
  },
  {
    reviewId: 3,
    url: "image url 3",
  },
  {
    reviewId: 4,
    url: "image url 4",
  },
  {
    reviewId: 5,
    url: "image url 5",
  },
  {
    reviewId: 6,
    url: "image url 6",
  },
  {
    reviewId: 7,
    url: "image url 7",
  },
  {
    reviewId: 8,
    url: "image url 8",
  },
  {
    reviewId: 9,
    url: "image url 9",
  },
  {
    reviewId: 10,
    url: "image url 10",
  },
  {
    reviewId: 11,
    url: "image url 11",
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await ReviewImage.bulkCreate(reviewImages, {
      validate: true,
    });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    await queryInterface.bulkDelete(
      options,
      {
        url: reviewImages.map((reviewImage) => reviewImage.url),
      },
      {}
    );
  },
};
