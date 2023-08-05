"use strict";
/** @type {import('sequelize-cli').Migration} */

const { Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const validSpots = [
  {
    address: "124 Disney Lane",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 38.7645359,
    lng: -123.4730328,
    name: "App Academy 2",
    description: "Place where web developers are created",
    price: 124,
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Spot.bulkCreate(validSpots, {
        validate: true,
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    for (let spotInfo of validSpots) {
      try {
        await Spot.destroy({
          where: spotInfo,
        });
      } catch (error) {
        console.error(err);
        throw err;
      }
    }
  },
};
