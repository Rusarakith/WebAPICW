const express = require('express');
const routers = express.Router();
const flightController = require('../controllers/flightController');

// DB Connection Test
routers.post('/addFlight', flightController.addFlight);
routers.get('/getAllFlights', flightController.getAllFlights);

module.exports = routers;