const express = require('express');
const routers = express.Router();
const holidayPackageController = require('../controllers/holidayPackageController');

// DB Connection Test
routers.post('/addPackage', holidayPackageController.addHolidayPackage);
routers.get('/getAllPackage', holidayPackageController.getAllPackages);

module.exports = routers;