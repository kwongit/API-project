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
    address: "123 Oakhurst",
    city: "Oakhurst ",
    state: "California",
    country: "United States",
    lat: 37.7573797,
    lng: -122.2490953,
    name: "NEW! SkyView@Yosemite - TreeHouse + GameRoom & Spa",
    description:
      "Welcome to SkyView@Yosemite: A Postmodern Treehouse perched among trees of the Sierra National Forest and 12 miles from the south entrance to Yosemite National Park. Let SkyView be the basecamp for your Yosemite adventure or stay in to experience the comforts of a modernist treehouse.",
    price: 1456,
  },
  {
    ownerId: 1,
    address: "456 Yosemite West",
    city: "Yosemite West",
    state: "California",
    country: "United States",
    lat: 47.7573797,
    lng: -132.2490953,
    name: "Yosemite escape, inside the park w/ EV charger!",
    description:
      "Renovated Yosemite Park A-frame house with forest view, decks, game room, BBQ, and Ev charger is 240 volts level 2. Have fun with the whole family at this stylish place. This vacation rental comes with a guaranteed reservation to Yosemite National Park. Find a beautiful woodland setting among the treetops at this secluded A-frame cabin in Yosemite National Park. This retreat was recently renovated, including a fully redone living room, kitchen, and modern bathrooms.",
    price: 2031,
  },
  {
    ownerId: 1,
    address: "789 Ahwahnee",
    city: "Ahwahnee",
    state: "California",
    country: "United States",
    lat: 27.7573797,
    lng: -112.2490953,
    name: "Stargazing Retreat - Yosemite/ Hot Tub/Fire Pit",
    description:
      "Stunning contemporary home on a hillside estate with panoramic views. Expansive outdoor space features a hot tub and pool. Conveniently located near Oakhurst, Bass Lake, and Yosemite. High-speed Wi-Fi and dedicated workspace make it ideal for remote workers.",
    price: 1652,
  },
  {
    ownerId: 2,
    address: "234 Mariposa",
    city: "Mariposa",
    state: "California",
    country: "United States",
    lat: 57.7573797,
    lng: -132.2490953,
    name: "The Nest-2 K Beds-Game Room-Deck-5 min to Mariposa",
    description:
      "Make some memories at this unique and family-friendly place. This private 2 Bedroom, 2 Bathroom house boast 2 King Beds, Fully stocked Kitchen, Large Deck and Gorgeous Yard with market lights, Game Room, Propane BBQ, and Washer and Dryer. Just 5 Minutes to the town of Mariposa and 45 Minutes to Yosemite National Park. High Speed internet with 50Mbps download and 25Mbps upload. Enjoy our game Room with Air Hockey Table,  Atari, Vintage Nintendo, Pacman machines and MORE!",
    price: 834,
  },
  {
    ownerId: 2,
    address: "345 Oakhurst",
    city: "Oakhurst",
    state: "California",
    country: "United States",
    lat: 67.7573797,
    lng: -142.2490953,
    name: "Echo's Hideout",
    description:
      "Nestled in Echo Valley, this home is perched on top of large property with gate.  Carved out of natural setting with excellent views of the surrounding mountains.  Great location being very close to both Bass Lake and the town of Oakhurst and a short drive to Yosemite Southgate.  Recently updated home with a spacious layout, game room, fenced back yard, and super high speed Internet.",
    price: 1169,
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
