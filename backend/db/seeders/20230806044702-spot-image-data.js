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
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-52686564/original/114b74de-07f5-416a-bd8d-e0ad71adc198.jpeg?im_w=960",
    preview: true,
  },
  {
    spotId: 1,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-52686564/original/eeeeadb2-a807-4476-a29e-f068453657b2.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 1,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-52686564/original/9d620c9d-d99d-40d9-b1ec-142ba0882b36.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 1,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-52686564/original/91e50986-499e-489b-aed3-e197e8468363.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 1,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-52686564/original/797a80ff-6199-4cbb-8236-2e339c2473c1.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 2,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-807318285919721411/original/302b14be-2093-44c8-8cb2-6bcf97692543.jpeg?im_w=960",
    preview: true,
  },
  {
    spotId: 2,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-807318285919721411/original/9ecb95d7-36ce-4089-ab01-42161af12f67.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 2,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-807318285919721411/original/ac976745-d661-4ec7-919a-3608d7673bc8.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 2,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-807318285919721411/original/a1553821-7c02-46a6-b3ff-6cc9c508dade.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 2,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-807318285919721411/original/e2420992-1e73-4e88-9d6d-c4cdeb8c980c.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-745787028816952393/original/2b38eb6e-0b90-4c5f-aa30-0636b0610b51.jpeg?im_w=960",
    preview: true,
  },
  {
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-745787028816952393/original/a03df883-b214-436a-8d7f-43818d7b162f.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-745787028816952393/original/7d9035bd-f51a-437b-a58f-d4b91bce644f.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-745787028816952393/original/c9a96545-e80e-439e-819e-5f96c1f5dc21.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-745787028816952393/original/9439c207-722a-4500-94e6-05cde13afe3a.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 4,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-874792311767559410/original/cfeb2d9f-d9c4-4d8d-aa75-9276b74c9fd6.jpeg?im_w=960",
    preview: true,
  },
  {
    spotId: 4,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-874792311767559410/original/b5c39c81-f027-4e2a-8b1f-53f08a1c56e2.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 4,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-874792311767559410/original/d85d2d56-5a44-408e-bbe4-8cadde6d6675.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 4,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-874792311767559410/original/1b619129-fc16-420d-ae09-33be6ff5155d.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 4,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-874792311767559410/original/d6525a1b-c6e1-4be3-ac0e-57a51b084f8f.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/7ffcec50-4c27-460d-8503-61a0ce42cec9.jpg?im_w=960",
    preview: true,
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/9620f85c-c88e-44de-b609-f705358c3a29.jpg?im_w=720",
    preview: false,
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-726709440920383661/original/4a3a41d0-fb19-4fdc-8678-46dca62e6120.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-726709440920383661/original/ca3337ea-6668-412b-8248-91480056d670.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-726709440920383661/original/8d777689-2d39-4125-a8b8-33d5dce395ff.jpeg?im_w=720",
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
