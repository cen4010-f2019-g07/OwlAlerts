"use strict";
var EventModel = require('../models/event');

// Home page for Events
exports.index = function(req, res) {
	EventModel.all().then(function(data){
		res.send('NOT IMPLEMENTED: Event index');
	}).catch(function(err){
		console.log(err);
	});
};

// Display list of all Events.
exports.event_list = function(req, res) {
	EventModel.all().then(function(data){
		res.send('NOT IMPLEMENTED: Event list');
	}).catch(function(err){
		console.log(err);
	});
};

// Display detail page for a specific Event.
exports.event_detail = function(req, res) {
	EventModel.get(req.params.id).then(function(result){
		//Data holds the information for the issue with the id param
		res.send('NOT IMPLEMENTED: Event detail: ' + req.params.id);
	}).catch(function(err){
		console.log(err);
	});
};

// Display Event create form on GET.
exports.event_create_get = function(req, res) {
	if(req.user){
		res.send('NOT IMPLEMENTED: Event create GET');
	}
  else{
  	res.redirect('/users/signin');
  }
};

// Handle Event create on POST.
exports.event_create_post = function(req, res) {
	if(req.user){
		let attr = {};
		attr['location'] = req.body.location;
		attr['start_date'] = req.body.start_date;
		attr['end_date'] = req.body.end_date;
		attr['description'] = req.body.description;
		attr['submitted_user'] = req.user.id;
		attr['host'] = req.body.host;
		EventModel.create(attr).then(function(result){
			res.send('NOT IMPLEMENTED: Event create POST');
		}).catch(function(err){
			console.log(err);
		});
	}
  else{
  	res.redirect('/users/signin');
  }
};

// Display Event delete form on GET.
exports.event_delete_get = function(req, res) {
	if(req.user){
		EventModel.get(req.params.id).then(function(event){
			if(event.submitted_user == req.user.id || req.user.faculty || req.user.admin){
				res.send('NOT IMPLEMENTED: Event delete GET: ' + req.params.id);
			}
			else{
				res.status(401).render('errors/401');
			}
		}).catch(function(err){
			console.log(err);
		});
	}
	else{
		res.redirect('/users/signin');
	}
};

// Handle Event delete on POST.
exports.event_delete_post = function(req, res) {
  if(req.user){
		EventModel.get(req.params.id).then(function(event){
			if(req.user.faculty || req.user.admin || event.submitted_user == req.user.id){
				EventModel.delete(req.params.id).then(function(result){
					//Data holds the information for the issue with the id param
					res.send('NOT IMPLEMENTED: Event delete POST: ' + req.params.id);
				}).catch(function(err){
					console.log(err);
				});
			}
			else{
				res.status(401).render('errors/401');
			}
		}).catch(function(err){
			console.log(err);
		});
	}
	else{
		res.redirect('/users/signin');
	}
};

// Display Event update form on GET.
exports.event_update_get = function(req, res) {
	if(req.user){
		EventModel.get(req.params.id).then(function(event){
			if(event.submitted_user == req.user.id || req.user.faculty || req.user.admin){
				res.send('NOT IMPLEMENTED: Event update GET: ' + req.params.id);
			}
			else{
				res.status(401).render('errors/401');
			}
		}).catch(function(err){
			console.log(err);
		});
	}
	else{
		res.redirect('/users/signin');
	}
};

// Handle Event update on POST.
exports.event_update_post = function(req, res) {
  if(req.user){
  	EventModel.get(req.params.id).then(function(event){
  		if(event.submitted_user == req.user.id || req.user.faculty || req.user.admin){
  			let attr = {};
  			attr['id'] = req.params.id;
  			attr['location'] = req.body.location || null;
  			attr['start_date'] = req.body.start_date || null;
  			attr['end_date'] = req.body.end_date || null;
  			attr['description'] = req.body.description || null;
  			attr['host'] = req.body.host || null;
  			EventModel.update(attr).then(function(result){
					//Data holds the information for the issue with the id param
					res.send('NOT IMPLEMENTED: Evnet update POST: ' + req.params.id);
				}).catch(function(err){
					console.log(err);
				});
  		}
  		else{
  			res.status(401).render('errors/401');
  		}
  	}).catch(function(err){
  		console.log(err);
  	});
  }
  else{
  	res.redirect('/users/signin');
  }
};