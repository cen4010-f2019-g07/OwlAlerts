const express = require('express');
const router = express.Router();

var index_controller = require('../controllers/index_controller');

// GET home page.
router.get('/', index_controller.index);

module.exports = router;