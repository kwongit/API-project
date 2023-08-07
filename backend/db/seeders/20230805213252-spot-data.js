"use strict";
/** @type {import('sequelize-cli').Migration} */

const { Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const spots = [
  {
    address: "200 Mission St",
    city: "San Francisco",
    state: "CA",
    country: "USA",
    lat: 37.791351,
    lng: -122.395067,
    name: "Indeed",
    description: "Place where web developers are created",
    price: 999,
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate(spots, {
      validate: true,
    });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    await queryInterface.bulkDelete(
      options,
      {
        address: spots.map((spot) => spot.address),
      },
      {}
    );
  },
};
