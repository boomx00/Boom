const app = require('express').Router();
const UserController = require('../controllers/UserController');

// Create a new local user
app.post("/register-local", UserController.createUser);


module.exports = app;