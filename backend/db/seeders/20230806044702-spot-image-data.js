"use strict";
/** @type {import('sequelize-cli').Migration} */

const { SpotImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const spotImages = [
  {
    url: "image_url_1",
    preview: true,
  },
  {
    url: "image_url_2",
    preview: false,
  },
  {
    url: "image_url_3",
    preview: true,
  },
  {
    url: "image_url_4",
    preview: false,
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(spotImages, {
      validate: true,
    });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    await queryInterface.bulkDelete(
      options,
      {
        url: spotImages.map((spotImage) => spotImage.url),
      },
      {}
    );
  },
};
