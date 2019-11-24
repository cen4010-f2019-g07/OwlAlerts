"use strict";
var express = require('express');
var router = express.Router();

var dashboard_controller = require('../controllers/dashboard_controller');

//Home Page
router.get('/', dashboard_controller.index);

//Show page for dashboard
router.get('/show', dashboard_controller.show);

//privacy policy page
router.get('/showpp', dashboard_controller.showpp);

//terms and conditions page
router.get('/showtc', dashboard_controller.showtc);

module.exports = router;