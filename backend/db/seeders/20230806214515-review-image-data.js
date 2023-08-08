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
    url: "image_url_1",
  },
  {
    reviewId: 2,
    url: "image_url_2",
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
