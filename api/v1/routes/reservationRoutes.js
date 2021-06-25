const app = require('express').Router();
const reservationController = require('../controllers/ReservationController');
const tokenVerifier = require('../middleware/tokenVerifier');

// create reservation
app.post('/create-reservation',tokenVerifier, reservationController.createReservation);
// manage reservation
app.put('/manage-reservation',tokenVerifier,reservationController.manageReservation);

module.exports = app