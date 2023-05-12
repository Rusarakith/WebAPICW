const express = require('express');
const routers = express.Router();
const userController = require('../controllers/userController');

// DB Connection Test
routers.post('/addUser', userController.addUser);
routers.get('/getAllUsers', userController.getAllUsers);
routers.put('/updateUser', userController.updateUser);
routers.post('/login', userController.login);
routers.post('/forgotPassword', userController.forgotPassword);
routers.post('/resetPassword', userController.resetPassword);

module.exports = routers;