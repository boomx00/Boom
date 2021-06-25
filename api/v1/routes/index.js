const app = require('express').Router();
const userRoutes = require('./userRoutes')
const restaurantRoutes = require('./restaurantRoutes')
const reservationRoutes = require('./reservationRoutes')
const tableRoutes = require('./tableRoutes');

//  Routes
app.use('/user', userRoutes);
app.use('/restaurant', restaurantRoutes);
app.use('/reservation', reservationRoutes);
app.use('/table', tableRoutes);

module.exports = app;