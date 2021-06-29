const app = require('express').Router();
const employeeController = require('../controllers/EmployeeController')
const userController = require('../controllers/UserController');

const tokenVerifier = require('../middleware/tokenVerifier');
const ownerVerifier = require('../middleware/restaurantOwnerVerifier')

// create employee
app.post('/create-employee', tokenVerifier, ownerVerifier, userController.createUser);

module.exports = app;