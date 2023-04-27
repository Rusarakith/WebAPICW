const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// DB Connection Test
router.get('/connection', userController.connectionBuilder);

module.exports = router;