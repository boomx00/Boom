const app = require('express').Router();
const orderController = require('../controllers/OrderController');
const tokenVerifier = require('../middleware/tokenVerifier');
const employeeVerifier = require('../middleware/employeeVerifier');
// get order
app.get('/get-order',tokenVerifier,employeeVerifier, orderController.getOrder);
// create order
app.post('/create-order',tokenVerifier,employeeVerifier, orderController.createOrder);
// edit order
app.put('/edit-order',tokenVerifier,employeeVerifier, orderController.editOrder);
// get all restaurant order
app.get('/get-all-order',tokenVerifier,employeeVerifier,orderController.getAllOrder);
// get all detailed order
app.get('/get-all-detailed-order',tokenVerifier,employeeVerifier,orderController.getAllDetailedOrder);

module.exports = app;