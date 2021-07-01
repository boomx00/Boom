const app = require('express').Router();
const userRoutes = require('./userRoutes')
const restaurantRoutes = require('./restaurantRoutes')
const reservationRoutes = require('./reservationRoutes')
const tableRoutes = require('./tableRoutes');
const foodRoutes = require('./foodRoutes');
const employeeRoutes = require('./employeeRoutes');
const orderRoutes = require('./orderRoutes');
//  Routes
app.use('/user', userRoutes);
app.use('/restaurant', restaurantRoutes);
app.use('/reservation', reservationRoutes);
app.use('/table', tableRoutes);
app.use('/food',foodRoutes);
app.use('/employee',employeeRoutes);
app.use('/orders', orderRoutes);

module.exports = app;