const express = require('express');
const routers = express.Router();
const userController = require('../controllers/userController');

// DB Connection Test
routers.post('/addUser', userController.addUser);
routers.post('/login', userController.login);

module.exports = routers;