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
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-52686564/original/f70e7be2-5b91-402a-9423-a5ac64795ea7.jpeg?im_w=720",
  },
  {
    reviewId: 2,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-52686564/original/982f1833-d296-45e2-8728-273f0141744f.jpeg?im_w=1200",
  },
  {
    reviewId: 3,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-807318285919721411/original/5cb09456-d0bc-425f-8b75-d01087d28566.jpeg?im_w=1200",
  },
  {
    reviewId: 4,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-807318285919721411/original/b71eda59-9776-466d-a229-7735b190ff0f.jpeg?im_w=720",
  },
  {
    reviewId: 5,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-745787028816952393/original/0d271091-12e3-44bc-87bf-c6084021ddbb.jpeg?im_w=1200",
  },
  {
    reviewId: 6,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-745787028816952393/original/7390a397-61d6-4c55-a821-4b6ffd88bbc7.jpeg?im_w=720",
  },
  {
    reviewId: 7,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-874792311767559410/original/7d629223-6d08-4286-a15c-1067f2a97bbc.jpeg?im_w=1200",
  },
  {
    reviewId: 8,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-874792311767559410/original/0946d045-41c8-4961-aaed-6b403d881595.jpeg?im_w=720",
  },
  {
    reviewId: 9,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-726709440920383661/original/cbd0a305-1c38-42b4-9e01-bb7d44f59c4d.jpeg?im_w=1200",
  },
  {
    reviewId: 10,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-726709440920383661/original/d3bf48d7-8641-430f-a444-3e1c6e36a9e1.jpeg?im_w=720",
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
