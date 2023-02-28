// Seed data rewritten to work with our project

const sequelize = require('../config/connection');
const { Users, Locations, Trips, Tagged, Comments, Images } = require('../models');

const userData = require('./userData.json');
const locationData = require('./locationData.json');
const tripData = require('./tripData.json');
const tagData = require('./tagData.json');
const commentData = require('./commentData.json');
// To be implemented soon
const imageData = require('./imageData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Users.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- USERS SEEDED -----\n');

  await Locations.bulkCreate(locationData);
  console.log('\n----- LOCATIONS SEEDED -----\n');

  await Trips.bulkCreate(tripData);
  console.log('\n----- TRIPS SEEDED -----\n');

  await Tagged.bulkCreate(tagData);
  console.log('\n----- TAGGED SEEDED -----\n');

  await Comments.bulkCreate(commentData);
  console.log('\n----- Comments SEEDED -----\n');

  process.exit(0);
};

seedDatabase();
