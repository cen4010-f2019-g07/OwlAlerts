var user = require('../models/user');
var events = require('../models/event');
var garages = require('../models/garage');
var issues = require('../models/issue');

exports.show = function(req, res){
	res.render('pages/show'); //Look for a dashboard_show.ejs
};
