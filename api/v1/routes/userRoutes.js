const app = require('express').Router();
const UserController = require('../controllers/UserController');
const tokenVerifier = require('../middleware/tokenVerifier');
const userVerifier = require('../middleware/userVerifier')

// Create a new local user
app.post("/register-local", UserController.createUser);
// login
app.post("/login-local", UserController.userLogin);
// edit user
app.put("/edit-user", tokenVerifier,userVerifier,UserController.editUser);
// get user
app.get('/get-user',tokenVerifier,userVerifier,UserController.getUser);

module.exports = app;