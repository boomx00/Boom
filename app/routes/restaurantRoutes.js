const app = require('express').Router();
const restaurantController = require('../controllers/RestaurantController');
const tokenVerifier = require('../middleware/tokenVerifier');

// create add restaurant
app.post("/add-restaurant", restaurantController.addRestaurant);

module.exports = app;