var express = require('express');
var router = express.Router();

var dashboard_controller = require('../controllers/dashboard_controller');

//Home page for dashboard
router.get('/show', dashboard_controller.show);

module.exports = router;