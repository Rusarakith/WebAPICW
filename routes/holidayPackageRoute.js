const express = require('express');
const routers = express.Router();
const holidayPackageController = require('../controllers/holidayPackageController');
const passport = require('passport');
require('../utils/passport')

// DB Connection Test
routers.post('/addPackage', passport.authenticate('jwt', { session: false }), holidayPackageController.addHolidayPackage);
routers.get('/getAllPackage', passport.authenticate('jwt', { session: false }), holidayPackageController.getAllPackages);
routers.put('/updatePackage', passport.authenticate('jwt', { session: false }), holidayPackageController.updateHolidayPackage);
routers.delete('/deletePackage', passport.authenticate('jwt', { session: false }), holidayPackageController.deletePackage);

module.exports = routers;