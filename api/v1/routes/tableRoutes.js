const app = require('express').Router();
const tableController = require('../controllers/TableController');
const tokenVerifier = require('../middleware/tokenVerifier');
const ownerVerifier = require('../middleware/restaurantOwnerVerifier');
const tableVerifier = require('../middleware/tableVerifier');

// create table
app.post('/create-table',tokenVerifier,ownerVerifier,tableVerifier,tableController.createTable);
// update table data
app.put('/update-table',tokenVerifier,ownerVerifier,tableController.updateTable)
// update table status
app.put('/manage-table',tableController.manageTable)
// delete table
app.delete('/delete-table',tokenVerifier,ownerVerifier,tableController.deleteTable)
module.exports = app;
