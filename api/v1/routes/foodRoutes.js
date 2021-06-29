const app = require('express').Router();
const foodController = require('../controllers/FoodController')
const tokenVerifier = require('../middleware/tokenVerifier')
const ownerVerifier = require('../middleware/restaurantOwnerVerifier')

// create food
app.post('/create-food',foodController.createFood);
// edit food
app.put('/edit-food',tokenVerifier,ownerVerifier,foodController.editFood);
// delete food
app.delete('/delete-food',tokenVerifier,ownerVerifier,foodController.deleteFood);

module.exports = app;