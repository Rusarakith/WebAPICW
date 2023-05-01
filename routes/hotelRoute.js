const express = require('express');
const routers = express.Router();
const hotelController = require('../controllers/hotelController');

// DB Connection Test
routers.post('/addHotel', hotelController.addHotel);
routers.get('/getAllHotels', hotelController.getAllHotels);

module.exports = routers;