"use strict";
/** @type {import('sequelize-cli').Migration} */

const { Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const spots = [
  {
    ownerId: 1,
    address: "280 Franklin St",
    city: "Mountain View",
    state: "California",
    country: "United States of America",
    lat: 37.7573797,
    lng: -122.2490953,
    name: "Home",
    description: "Single family",
    price: 2300000,
  },
  {
    ownerId: 1,
    address: "380 Franklin St",
    city: "Mountain View",
    state: "California",
    country: "United States of America",
    lat: 47.7573797,
    lng: -132.2490953,
    name: "Home",
    description: "Single family",
    price: 3300000,
  },
  {
    ownerId: 1,
    address: "480 Franklin St",
    city: "Mountain View",
    state: "California",
    country: "United States of America",
    lat: 27.7573797,
    lng: -112.2490953,
    name: "Home",
    description: "Single family",
    price: 1300000,
  },
  {
    ownerId: 2,
    address: "6 Zachary Ct",
    city: "Menlo Park",
    state: "California",
    country: "United States of America",
    lat: 57.7573797,
    lng: -132.2490953,
    name: "Home",
    description: "Single family",
    price: 6990000,
  },
  {
    ownerId: 2,
    address: "16 Zachary Ct",
    city: "Menlo Park",
    state: "California",
    country: "United States of America",
    lat: 67.7573797,
    lng: -142.2490953,
    name: "Home",
    description: "Single family",
    price: 7990000,
  },
  {
    ownerId: 2,
    address: "26 Zachary Ct",
    city: "Menlo Park",
    state: "California",
    country: "United States of America",
    lat: 27.7573797,
    lng: -122.2490953,
    name: "Home",
    description: "Single family",
    price: 2990000,
  },
  {
    ownerId: 3,
    address: "21466 Holly Oak Dr",
    city: "Cupertino",
    state: "California",
    country: "United States of America",
    lat: 77.7573797,
    lng: -152.2490953,
    name: "Home",
    description: "Single family",
    price: 2995000,
  },
  {
    ownerId: 3,
    address: "31466 Holly Oak Dr",
    city: "Cupertino",
    state: "California",
    country: "United States of America",
    lat: 87.7573797,
    lng: -162.2490953,
    name: "Home",
    description: "Single family",
    price: 3995000,
  },
  {
    ownerId: 3,
    address: "41466 Holly Oak Dr",
    city: "Cupertino",
    state: "California",
    country: "United States of America",
    lat: 27.7573797,
    lng: -132.2490953,
    name: "Home",
    description: "Single family",
    price: 5995000,
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
