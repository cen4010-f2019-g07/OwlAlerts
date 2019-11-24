"use strict";
var GarageModel = require('../models/garage');

// Home Page for Garages
exports.index = function(req, res) {
	GarageModel.all().then(function(data){
		res.send('NOT IMPLEMENTED: Garage index');
	}).catch(function(err){
		console.log(err);
	});
};

// Display list of all Garages.
exports.garage_list = function(req, res) {
	GarageModel.all().then(function(data){
		res.send('NOT IMPLEMENTED: Garage list');
	}).catch(function(err){
		console.log(err);
	});
};

// Display detail page for a specific Garage.
exports.garage_detail = function(req, res) {
	GarageModel.get(req.params.id).then(function(result){
		//Data holds the information for the issue with the id param
		res.send('NOT IMPLEMENTED: Garage detail: ' + req.params.id);
	}).catch(function(err){
		console.log(err);
	});
};

// Display Garage create form on GET.
exports.garage_create_get = function(req, res) {
	if(req.user){
		if(req.user.admin){
			res.send('NOT IMPLEMENTED: Garage create GET');
		}
		else{
			res.status(401).render('errors/401');
		}
	}
  else{
  	res.redirect('/users/signin');
  }
};

// Handle Garage create on POST.
exports.garage_create_post = function(req, res) {
	if(req.user){
		if(req.user.admin){
			let attr = {};
			attr['location'] = req.body.location;
			attr['name'] = req.body.name;
			attr['full'] = req.body.full;
			attr['free_spots'] = req.body.free_spots;
			attr['total_spots'] = req.body.total_spots;
			GarageModel.create(attr).then(function(){
				//res.redirect('/garages/create');
				res.send('NOT IMPLEMENTED: Garage create POST');
			}).catch(function(err){
				console.log(err);
			});
			
		}
		else{
			res.status(401).render('errors/401');
		}
	}
  else{
  	res.redirect('/users/signin');
  }
};

// Display Garage delete form on GET.
exports.garage_delete_get = function(req, res) {
	if(req.user){
		if(req.user.admin){
			res.send('NOT IMPLEMENTED: Garage delete GET: ' + req.params.id);
		}
		else{
			res.status(401).render('errors/401');
		}
	}
	else{
		res.redirect('/users/signin');
	}
};

// Handle Garage delete on POST.
exports.garage_delete_post = function(req, res) {
  if(req.user){
  	if(req.user.admin){
  		GarageModel.delete(req.params.id).then(function(result){
				//Data holds the information for the issue with the id param
				res.send('NOT IMPLEMENTED: Garage delete POST: ' + req.params.id);
			}).catch(function(err){
				console.log(err);
			});
  	}
  	else{
  		res.status(401).render('errors/401');
  	}
  }
  else{
  	res.redirect('/users/signin');
  }
};

// Display Garage update form on GET.
exports.garage_update_get = function(req, res) {
	if(req.user){
		if(req.user.admin){
			res.send('NOT IMPLEMENTED: Garage update GET: ' + req.params.id);
		}
		else{
			res.status(401).render('errors/401');
		}
	}
	else{
		res.redirect('/users/signin');
	}
};

// Handle Garage update on POST.
exports.garage_update_post = function(req, res) {
  if(req.user){
  	if(req.user.admin){
  		let attr = {};
  		attr['id'] - req.params.id;
			attr['location'] = req.body.location || null;
			attr['name'] = req.body.name || null;
			attr['full'] = req.body.full;
			attr['free_spots'] = req.body.free_spots || null;
			attr['total_spots'] = req.body.total_spots || null;
  		GarageModel.update(attr).then(function(result){
				res.send('NOT IMPLEMENTED: Garage update POST: ' + req.params.id);
			}).catch(function(err){
				console.log(err);
			});
  	}
  	else{
  		res.status(401).render('errors/401');
  	}
  }
  else{
  	res.redirect('/users/signin');
  }
};