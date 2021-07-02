const app = require('express').Router();
const reservationController = require('../controllers/ReservationController');
const tokenVerifier = require('../middleware/tokenVerifier');
const userVerifier = require('../middleware/userVerifier');
const employeeVerifier = require('../middleware/employeeVerifier')

// get reservation
// app.get('/get-reservation',reservationController.getReservation);
// create reservation
app.post('/create-reservation',tokenVerifier, userVerifier, reservationController.createReservation);
// manage reservation
app.put('/manage-reservation',tokenVerifier,reservationController.manageReservation);
// cancel reservation
app.put('/cancel-reservation',tokenVerifier,reservationController.cancelReservation);
// get users reservation
app.get('/get-user-reservation',tokenVerifier,userVerifier,reservationController.getUserReservation);
// get restaurant reservation
app.get('/get-restaurant-reservation',tokenVerifier,employeeVerifier,reservationController.getRestaurantReservation);
module.exports = app