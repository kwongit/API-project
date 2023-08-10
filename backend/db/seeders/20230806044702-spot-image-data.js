"use strict";
/** @type {import('sequelize-cli').Migration} */

const { SpotImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const spotImages = [
  {
    spotId: 1,
    url: "image url 1",
    preview: true,
  },
  {
    spotId: 2,
    url: "image url 2",
    preview: true,
  },
  {
    spotId: 3,
    url: "image url 3",
    preview: true,
  },
  {
    spotId: 4,
    url: "image url 4",
    preview: true,
  },
  {
    spotId: 5,
    url: "image url 5",
    preview: true,
  },
  {
    spotId: 6,
    url: "image url 6",
    preview: true,
  },
  {
    spotId: 7,
    url: "image url 7",
    preview: true,
  },
  {
    spotId: 8,
    url: "image url 8",
    preview: true,
  },
  {
    spotId: 9,
    url: "image url 9",
    preview: true,
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
