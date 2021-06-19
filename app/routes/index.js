const app = require('express').Router();
const userRoutes = require('./userRoutes')
const restaurantRoutes = require('./restaurantRoutes')

//  Routes
app.use('/user', userRoutes);
app.use('/restaurant', restaurantRoutes);

module.exports = app;