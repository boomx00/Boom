const app = require('express').Router();
const userRoutes = require('./userRoutes')

//  Routes
app.use('/user', userRoutes);

module.exports = app;