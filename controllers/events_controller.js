"use strict";
var EventModel = require('../models/event');
const paginate = require('express-paginate');

// Home page for Events
exports.index = function(req, res) {
	EventModel.getUpcoming(5).then(function(data){
		res.render('pages/events/index',
    {
      sessionUser: req.user,
      events: data,
      message: req.flash()
    });
	}).catch(function(err){
		console.log(err);
		res.status(500).render('errors/500');
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
			event: result,
			message: req.flash()
		});
	}).catch(function(err){
		console.log(err);
		res.status(500).render('errors/500');
	});
};

// Display Event create form on GET.
exports.event_create_get = function(req, res) {
	if(req.user){
		res.render('pages/events/create',{
			sessionUser: req.user,
			message: req.flash()
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
		attr.title = req.body.title;
		attr['location'] = req.body.location;
		attr['start_date'] = req.body.start_date;
		attr['end_date'] = req.body.end_date;
		attr['description'] = req.body.description;
		attr['submitted_user'] = req.user.id;
		attr['host'] = req.body.host;
		EventModel.create(attr).then(function(result){
			req.flash('success', 'Event Has Been Successfully Created!');
			res.redirect('/events/create');
		}).catch(function(err){
			console.log(err);
			res.status(500).render('errors/500');
		});
	}
  else{
  	req.flash('info', 'Please Sign-In to Access This Feature');
  	res.redirect('/users/signin');
  }
};

// Display Event delete form on GET.
exports.event_delete_get = function(req, res) {
	if(req.user){
		EventModel.get(req.params.id).then(function(result){

		res.render('pages/events/delete',{
			sessionUser: req.user,
			event: result,
			message: req.flash()
		});
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
				EventModel.delete(event.id).then(function(result){
					req.flash('success', 'Event Has Been Successfully Deleted!');
					res.redirect('/events');
				}).catch(function(err){
					console.log(err);
					res.status(500).render('errors/500');
				});
			}
			else{
				res.status(401).render('errors/401');
			}
		}).catch(function(err){
			console.log(err);
			res.status(500).render('errors/500');
		});
	}
	else{
		res.redirect('/users/signin');
	}
};

// Display Event update form on GET.
exports.event_update_get = function(req, res) {
	if(req.user){
		EventModel.get(req.params.id).then(function(data){
			if(data.submitted_user == req.user.id || req.user.faculty || req.user.admin){
				res.render('pages/events/update', {
					sessionUser: req.user,
					event: data,
					message: req.flash()
				});
			}
			else{
				res.status(401).render('errors/401');
			}
		}).catch(function(err){
			console.log(err);
			res.status(500).render('errors/500');
		});
	}
	else{
		res.redirect('/users/signin');
	}
};

// Handle Event update on POST.
exports.event_update_post = function(req, res) {
  if(req.user){
	EventModel.get(req.params.id).then(function(data){

  		if(data.submitted_user == req.user.id || req.user.faculty || req.user.admin){
  			let attr = {};
  			attr['id'] = req.params.id;
  			attr.title = req.body.title || null;
  			attr['location'] = req.body.location || null;
  			attr['start_date'] = req.body.start_date || null;
  			attr['end_date'] = req.body.end_date || null;
  			attr['description'] = req.body.description || null;
  			attr['host'] = req.body.host || null;
  			if(isEmpty(req.files)) {
				EventModel.update(attr).catch(function(err){
					console.log(err);
					res.status(500).render('errors/500');
				});
				req.flash('success', 'The Event Has Been Updated!');
				res.redirect(`/events/event/${data.id}`);	
			}				
			else {
				(function(result){
					EventModel.update(attr).catch(function(err){
						console.log(err);
						res.status(500).render('errors/500');
					});
					req.flash('success', 'The Event Has Been Updated!');
					res.redirect(`/events/event/${data.id}`);	
				}).catch(function(err){
					console.log(err);
					res.status(500).render('errors/500');
				});				
			}							
		}
		else{
			res.status(403).render("errors/403");
		}
	});
  }
  else{
  	req.flash('info', 'Please Sign-In to Access This Feature');
  	res.redirect('/users/signin');
  }
};

function isEmpty(obj) {
	for(var key in obj) {
	  if(obj.hasOwnProperty(key))
		return false;
	}
	return true;
  }