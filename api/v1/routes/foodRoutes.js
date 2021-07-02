const app = require('express').Router();
const foodController = require('../controllers/FoodController')
const tokenVerifier = require('../middleware/tokenVerifier')
const ownerVerifier = require('../middleware/restaurantOwnerVerifier')
const employeeVerifier = require('../middleware/employeeVerifier')

// create food
app.post('/create-food',foodController.createFood);
// edit food
app.put('/edit-food',tokenVerifier,ownerVerifier,foodController.editFood);
// delete food
app.delete('/delete-food',tokenVerifier,ownerVerifier,foodController.deleteFood);
// get food
app.get('/get-food',tokenVerifier,employeeVerifier, foodController.getFood);

module.exports = app;