const express = require('express');
const routers = express.Router();
const flightController = require('../controllers/flightController');

// DB Connection Test
routers.post('/addFlight', flightController.addFlight);
routers.get('/getAllFlights', flightController.getAllFlights);
routers.put('/updateFlight', flightController.updateFlight);
routers.delete('/deleteFlight', flightController.deleteFlight);

module.exports = routers;