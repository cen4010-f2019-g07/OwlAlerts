var user = require('../models/user');
var events = require('../models/event');
var garages = require('../models/garage');
var issues = require('../models/issue');

exports.show = function(req, res){
	users = ["hi I'm a user 1", "Hi im user 2"];
	res.render('pages/show', {
		users: users
	}); //Look for a dashboard_show.ejs
};