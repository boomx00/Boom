const app = require('express').Router();
const UserController = require('../controllers/UserController');
const tokenVerifier = require('../middleware/tokenVerifier');

// Create a new local user
app.post("/register-local", UserController.createUser);

app.post("/login-local", UserController.userLogin);

app.put("/edit-user", tokenVerifier,UserController.editUser);

module.exports = app;