const app = require('express').Router();
const userRoutes = require('./userRoutes')
const restaurantRoutes = require('./restaurantRoutes')
const reservationRoutes = require('./reservationRoutes')

//  Routes
app.use('/user', userRoutes);
app.use('/restaurant', restaurantRoutes);
app.use('/reservation', reservationRoutes);

module.exports = app;