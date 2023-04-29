const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

// DB Connection Test
router.post('/addRole', roleController.addRole);

module.exports = router;