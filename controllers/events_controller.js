"use strict";
var EventModel = require('../models/event');
const paginate = require('express-paginate');

// Home page for Events
exports.index = function(req, res) {
	EventModel.all().then(function(data){
		res.render('pages/events/index',{
			sessionUser: req.user,
			events:data
		});
	}).catch(function(err){
		console.log(err);
	});
};

// Display list of all Events.
exports.event_list = function(req, res) {
	let numPerPage = parseInt(req.query.npp, 10) || 10;
	let page = parseInt(req.query.page, 10) || 0;
	let skip = (page-1) * numPerPage;
	let limit = skip + ',' + numPerPage;
	var itemCount;
	var pageCount;
	EventModel.allCount().then(function(eventCount){
		itemCount = eventCount;
		pageCount = Math.ceil(itemCount/req.query.limit);
	}).then(function(){
		EventModel.allPaginate(limit).then(function(data){
			res.render('pages/events/list',
	    {
        sessionUser: req.user,
	      events: data,
	      pageCount,
	      itemCount,
	      pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
	    });
		}).catch(function(err){
			console.log(err);
			res.status(500).render('errors/500');
		});
	}).catch(function(err){
		console.log(err);
		res.status(500).render('errors/500');
	});
};

// Display detail page for a specific Event.
exports.event_detail = function(req, res) {
	EventModel.get(req.params.id).then(function(result){
		//Data holds the information for the issue with the id param
		res.render('pages/events/show',{
			sessionUser: req.user,
			event: result
		});
	}).catch(function(err){
		console.log(err);
	});
};

// Display Event create form on GET.
exports.event_create_get = function(req, res) {
	if(req.user){
		res.render('pages/events/create',{
			sessionUser: req.user,
		});
	}
	else{
		req.flash('info', 'Please Sign-In to Access This Feature');
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