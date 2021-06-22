const app = require('express').Router();
const restaurantController = require('../controllers/RestaurantController');
const tokenVerifier = require('../middleware/tokenVerifier');

// create add restaurant
app.post("/add-restaurant", restaurantController.addRestaurant);
// manage restaurant requests
app.put("/manage-restaurant",restaurantController.manageRestaurant);
// get al restaurant
app.get("/get-all-restaurant",restaurantController.getAllRestaurant);
// update restaurant details
app.put("/update-restaurant", restaurantController.editRestaurant);

module.exports = app;