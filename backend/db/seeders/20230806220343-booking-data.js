"use strict";

/** @type {import('sequelize-cli').Migration} */

const { Booking } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const bookings = [
  {
    spotId: 1,
    userId: 1,
    startDate: "2023-08-06",
    endDate: "2023-08-07",
  },
  {
    spotId: 2,
    userId: 2,
    startDate: "2023-08-06",
    endDate: "2023-08-07",
  },
  {
    spotId: 3,
    userId: 3,
    startDate: "2023-08-06",
    endDate: "2023-08-07",
  },
  {
    spotId: 4,
    userId: 1,
    startDate: "2023-08-08",
    endDate: "2023-08-09",
  },
  {
    spotId: 5,
    userId: 2,
    startDate: "2023-08-08",
    endDate: "2023-08-09",
  },
  {
    spotId: 6,
    userId: 3,
    startDate: "2023-08-08",
    endDate: "2023-08-09",
  },
  {
    spotId: 7,
    userId: 1,
    startDate: "2023-08-10",
    endDate: "2023-08-11",
  },
  {
    spotId: 8,
    userId: 2,
    startDate: "2023-08-10",
    endDate: "2023-08-11",
  },
  {
    spotId: 9,
    userId: 3,
    startDate: "2023-08-10",
    endDate: "2023-08-11",
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate(bookings, {
      validate: true,
    });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    await queryInterface.bulkDelete(
      options,
      {
        booking: bookings.map((booking) => booking.startDate),
      },
      {}
    );
  },
};
