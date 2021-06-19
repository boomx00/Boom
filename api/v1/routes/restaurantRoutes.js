const app = require('express').Router();
const restaurantController = require('../controllers/RestaurantController');
const tokenVerifier = require('../middleware/tokenVerifier');

// create add restaurant
app.post("/add-restaurant", restaurantController.addRestaurant);
// manage restaurant requests
app.put("/manage-restaurant",restaurantController.manageRestaurant);

module.exports = app;