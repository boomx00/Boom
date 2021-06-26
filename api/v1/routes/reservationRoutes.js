const app = require('express').Router();
const reservationController = require('../controllers/ReservationController');
const tokenVerifier = require('../middleware/tokenVerifier');
const userVerifier = require('../middleware/userVerifier');

// create reservation
app.post('/create-reservation',tokenVerifier, userVerifier, reservationController.createReservation);
// manage reservation
app.put('/manage-reservation',tokenVerifier,reservationController.manageReservation);
// cancel reservation
app.put('/cancel-reservation',reservationController.cancelReservation);
module.exports = app