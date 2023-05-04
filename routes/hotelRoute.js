const express = require('express');
const routers = express.Router();
const hotelController = require('../controllers/hotelController');
const passport = require('passport');
require('../utils/passport')

// DB Connection Test
routers.post('/addHotel', passport.authenticate('jwt', { session: false }),hotelController.addHotel);
routers.get('/getAllHotels', passport.authenticate('jwt', { session: false }),hotelController.getAllHotels);
routers.put('/updateHotel', passport.authenticate('jwt', { session: false }),hotelController.updateHotel);
routers.delete('/deleteHotel', passport.authenticate('jwt', { session: false }),hotelController.deleteHotel);

module.exports = routers;