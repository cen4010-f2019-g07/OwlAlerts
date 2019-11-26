"use strict";
var user = require('../models/user');
var events = require('../models/event');
var garages = require('../models/garage');
var issues = require('../models/issue');

// Home page for Dashboard
exports.index = function(req, res) {
	res.render('pages/index', {
		sessionUser: req.user,
		message: req.flash()
	});
};

// Privacy policy Page
exports.showpp = function(req, res) {
	res.render('pages/showpp',{
		sessionUser: req.user
	});
};

// Terms and conditions page
exports.showtc = function(req, res) {
	res.render('pages/showtc', {
		sessionUser: req.user
	});
};
