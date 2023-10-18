"use strict";
/** @type {import('sequelize-cli').Migration} */

const { Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const spots = [
  // 1
  {
    ownerId: 1,
    address: "123 Oakhurst",
    city: "Oakhurst",
    state: "California",
    country: "United States",
    lat: 37.7573797,
    lng: -122.2490953,
    name: "SkyView Yosemite - TreeHouse, GameRoom, Spa",
    description:
      "Welcome to SkyView@Yosemite: A Postmodern Treehouse perched among trees of the Sierra National Forest and 12 miles from the south entrance to Yosemite National Park. Let SkyView be the basecamp for your Yosemite adventure or stay in to experience the comforts of a modernist treehouse.",
    price: 1456,
  },
  // 2
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
  // 3
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
  // 4
  {
    ownerId: 2,
    address: "234 Mariposa",
    city: "Mariposa",
    state: "California",
    country: "United States",
    lat: 57.7573797,
    lng: -132.2490953,
    name: "The Nest-2 K Beds-Game Room-Deck",
    description:
      "Make some memories at this unique and family-friendly place. This private 2 Bedroom, 2 Bathroom house boast 2 King Beds, Fully stocked Kitchen, Large Deck and Gorgeous Yard with market lights, Game Room, Propane BBQ, and Washer and Dryer. Just 5 Minutes to the town of Mariposa and 45 Minutes to Yosemite National Park. High Speed internet with 50Mbps download and 25Mbps upload. Enjoy our game Room with Air Hockey Table,  Atari, Vintage Nintendo, Pacman machines and MORE!",
    price: 834,
  },
  // 5
  {
    ownerId: 2,
    address: "345 Oakhurst",
    city: "Oakhurst",
    state: "California",
    country: "United States",
    lat: 67.7573797,
    lng: -142.2490953,
    name: "Welcome to Echo's Hideout!",
    description:
      "Nestled in Echo Valley, this home is perched on top of large property with gate.  Carved out of natural setting with excellent views of the surrounding mountains.  Great location being very close to both Bass Lake and the town of Oakhurst and a short drive to Yosemite Southgate.  Recently updated home with a spacious layout, game room, fenced back yard, and super high speed Internet.",
    price: 1169,
  },
  // 6
  {
    ownerId: 1,
    address: "456 Groveland",
    city: "Groveland",
    state: "California",
    country: "United States",
    lat: 67.7573797,
    lng: -142.2490953,
    name: "Gather Yosemite Modern A-Frame",
    description:
      "Come Gather in Yosemite! This beautiful A-frame cabin is 20 miles from the west gates of Yosemite in Groveland, California! Floor to ceiling windows gives this stylish space, a feeling of the vastness of mother nature! 4 bedrooms, 3 baths with great views! Watch the deers grazing all day! Washer, dryer, barbecue, + seating area on the outdoor deck, fully stocked and loaded with a foosball table to boot! Let Gather Yosemite be your homebase for Valley adventures! @gatheryosemite on insta!",
    price: 1854,
  },
  // 7
  {
    ownerId: 2,
    address: "567 Oakhurst",
    city: "Oakhurst",
    state: "California",
    country: "United States",
    lat: 67.7573797,
    lng: -142.2490953,
    name: "The Beechwood Suite: A Modern Mountain Sanctuary",
    description:
      "Enjoy the serene setting of this modern suite, nestled in the trees. Gaze out the full wall of windows, and catch a glimpse of the wildlife drinking from the Fresno River. Feel like you are secluded in the woods, but quickly make your way to the highway, and on your adventure to Yosemite National Park and other wonderful outdoor destinations. This generously appointed studio has everything you need for a weekend trip, or an extended work from anywhere getaway. LGBTQIA+ friendly host and listing.",
    price: 908,
  },
  // 8
  {
    ownerId: 1,
    address: "678 Coarsegold",
    city: "Coarsegold",
    state: "California",
    country: "United States",
    lat: 67.7573797,
    lng: -142.2490953,
    name: "Tiny House in the hills near Yosemite / Bass Lake",
    description:
      "Escape from reality! Come and stay in the beautiful, rustic hills near Yosemite and Bass Lake. One of the seven natural wonders in North America, the south entrance into Yosemite is only 25 miles away. The space. This tiny house is extremely spacious with tall ceilings and large windows. It has two lofts, each with one bed. Both lofts are accessible only by a ladder. There are no rails, so please exercise caution if any young children are in a loft.",
    price: 1013,
  },
  // 9
  {
    ownerId: 2,
    address: "789 Groveland",
    city: "Groveland",
    state: "California",
    country: "United States",
    lat: 67.7573797,
    lng: -142.2490953,
    name: "Cabin Getaway Near Yosemite!",
    description:
      "Start your Yosemite adventure at The Knotty Hideaway, located in the gated community of Pine Mountain Lake, only 26 miles from the northern Yosemite entrance. After a day of exploring, kick back and relax in this calm, stylish cabin where you’ll rest and recharge in comfort.",
    price: 1098,
  },
  // 10
  {
    ownerId: 1,
    address: "891 Yosemite W",
    city: "Yosemite W",
    state: "California",
    country: "United States",
    lat: 67.7573797,
    lng: -142.2490953,
    name: "Charming 3 Bedrooms -INSIDE Yosemite National Park",
    description:
      "This charming two-story house is located INSIDE  the gates of Yosemite Park Bookings at our home include guaranteed access to Yosemite NP. Centrally located and close to the most visited tourist destinations. We are just a short drive to  Badge Pass Ski Area, Glacier Point, Mariposa Grove, and Yosemite Valley",
    price: 2031,
  },
  // 11
  {
    ownerId: 2,
    address: "123 Yosemite Village",
    city: "Yosemite Village",
    state: "California",
    country: "United States",
    lat: 37.7485789,
    lng: -119.5936813,
    name: "Mountain View Retreat in the Heart of Yosemite",
    description:
      "Experience the beauty of Yosemite National Park from this cozy mountain retreat. This spacious cabin offers stunning views, a large deck, and a fully equipped kitchen. It's the perfect base for your Yosemite adventures.",
    price: 1687,
  },

  // 12
  {
    ownerId: 1,
    address: "456 El Portal",
    city: "El Portal",
    state: "California",
    country: "United States",
    lat: 37.6761462,
    lng: -119.7791642,
    name: "Riverfront Paradise near Yosemite",
    description:
      "Relax by the Merced River in this beautiful riverfront home. Just a short drive to Yosemite National Park, this cozy retreat features a private river access, a hot tub, and all the amenities for a perfect vacation.",
    price: 1975,
  },

  // 13
  {
    ownerId: 2,
    address: "789 Wawona",
    city: "Wawona",
    state: "California",
    country: "United States",
    lat: 37.5240784,
    lng: -119.6456887,
    name: "Wawona Woods Cabin - Secluded Forest Getaway",
    description:
      "Escape to the serene Wawona Woods in this charming cabin nestled in the forest. Enjoy a peaceful getaway with a fully equipped kitchen, a wood-burning fireplace, and easy access to hiking trails and Wawona's historic attractions.",
    price: 1425,
  },

  // 14
  {
    ownerId: 1,
    address: "234 Fish Camp",
    city: "Fish Camp",
    state: "California",
    country: "United States",
    lat: 37.4802619,
    lng: -119.6358162,
    name: "Tranquil Cabin near Tenaya Lodge",
    description:
      "Stay in this tranquil cabin near Tenaya Lodge and Yosemite's Southgate entrance. Cozy up by the fireplace or explore the nearby hiking trails. Perfect for a family retreat or a romantic getaway.",
    price: 1159,
  },

  // 15
  {
    ownerId: 2,
    address: "345 North Fork",
    city: "North Fork",
    state: "California",
    country: "United States",
    lat: 37.2277651,
    lng: -119.5674383,
    name: "North Fork Haven - Peaceful Mountain Retreat",
    description:
      "Find peace and serenity in this mountain retreat located in North Fork. Surrounded by nature, this cabin offers a quiet escape with a private deck and modern amenities. A short drive to Yosemite's gateways.",
    price: 1287,
  },

  // 16
  {
    ownerId: 1,
    address: "456 Yosemite Lakes Park",
    city: "Yosemite Lakes Park",
    state: "California",
    country: "United States",
    lat: 37.1966107,
    lng: -119.9273259,
    name: "Secluded Cabin in Yosemite Lakes Park",
    description:
      "Escape to this secluded cabin in Yosemite Lakes Park. Enjoy the peaceful surroundings, a well-equipped kitchen, and a private deck. It's the perfect hideaway for nature enthusiasts.",
    price: 1355,
  },

  // 17
  {
    ownerId: 2,
    address: "567 Groveland",
    city: "Groveland",
    state: "California",
    country: "United States",
    lat: 37.8529786,
    lng: -120.2233743,
    name: "Rustic Retreat with a View in Groveland",
    description:
      "Experience the charm of Groveland in this rustic retreat with beautiful mountain views. Unwind on the spacious deck or explore the nearby attractions, including the historic downtown area and Yosemite National Park.",
    price: 1542,
  },

  // 18
  {
    ownerId: 1,
    address: "678 Midpines",
    city: "Midpines",
    state: "California",
    country: "United States",
    lat: 37.5479854,
    lng: -119.9306028,
    name: "Midpines Mountain Hideaway",
    description:
      "Discover the beauty of Yosemite from this cozy mountain hideaway in Midpines. This cabin offers a tranquil setting, a fully equipped kitchen, and a relaxing atmosphere. A great base for exploring the park.",
    price: 1320,
  },

  // 19
  {
    ownerId: 2,
    address: "789 Yosemite Valley",
    city: "Yosemite Valley",
    state: "California",
    country: "United States",
    lat: 37.7449317,
    lng: -119.5938221,
    name: "Yosemite Valley Retreat - Close to Everything",
    description:
      "Stay in the heart of Yosemite Valley in this convenient retreat. Enjoy easy access to iconic landmarks and the park's natural beauty. A comfortable home with all the essentials for an unforgettable stay.",
    price: 1799,
  },

  // 20
  {
    ownerId: 1,
    address: "891 Yosemite Lakes Village",
    city: "Yosemite Lakes Village",
    state: "California",
    country: "United States",
    lat: 37.2243406,
    lng: -119.9849234,
    name: "Yosemite Lakes Village Cozy Cabin",
    description:
      "Cozy up in this cabin nestled in Yosemite Lakes Village. Experience the serenity of the area and explore the nearby attractions. A perfect spot for a family vacation or a romantic getaway.",
    price: 1225,
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
