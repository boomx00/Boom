const app = require('express').Router();
const restaurantController = require('../controllers/RestaurantController');
const userController = require('../controllers/UserController');
const tokenVerifier = require('../middleware/tokenVerifier');
const ownerVerifier = require('../middleware/restaurantOwnerVerifier');
// create add restaurant
app.post("/add-restaurant", tokenVerifier, restaurantController.addRestaurant);
// manage restaurant requests
app.put("/manage-restaurant",restaurantController.manageRestaurant);
// get al restaurant
app.get("/get-all-restaurant",restaurantController.getAllRestaurant);
// update restaurant details
app.put("/update-restaurant", tokenVerifier, ownerVerifier,restaurantController.editRestaurant);
// create employee
app.post("/create-employee",tokenVerifier,ownerVerifier,userController.createUser);

module.exports = app;