const express = require('express');
const routers = express.Router();
const flightController = require('../controllers/flightController');
const passport = require('passport');
require('../utils/passport')

// DB Connection Test
routers.post('/addFlight', passport.authenticate('jwt', { session: false }), flightController.addFlight);
routers.get('/getAllFlights', passport.authenticate('jwt', { session: false }), flightController.getAllFlights);
routers.put('/updateFlight', passport.authenticate('jwt', { session: false }), flightController.updateFlight);
routers.delete('/deleteFlight', passport.authenticate('jwt', { session: false }), flightController.deleteFlight);

module.exports = routers;