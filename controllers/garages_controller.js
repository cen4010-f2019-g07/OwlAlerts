var garage = require('../models/garage');

exports.index = function(err, req, res, next){
	if(err)
		next(err);
	res.send('NOT IMPLEMENTED: Garage index');
};

// Display list of all Garages.
exports.garage_list = function(err, req, res, next) {
	if(err)
		next(err);
  res.send('NOT IMPLEMENTED: Garage list');
};

// Display detail page for a specific Garage.
exports.garage_detail = function(err, req, res, next) {
	if(err)
		next(err);
  res.send('NOT IMPLEMENTED: Garage detail: ' + req.params.id);
};

// Display Garage create form on GET.
exports.garage_create_get = function(err, req, res, next) {
	if(err)
		next(err);
  res.send('NOT IMPLEMENTED: Garage create GET');
};

// Handle Garage create on POST.
exports.garage_create_post = function(err, req, res, next) {
	if(err)
		next(err);
  res.send('NOT IMPLEMENTED: Garage create POST');
};

// Display Garage delete form on GET.
exports.garage_delete_get = function(err, req, res, next) {
	if(err)
		next(err);
  res.send('NOT IMPLEMENTED: Garage delete GET');
};

// Handle Garage delete on POST.
exports.garage_delete_post = function(err, req, res, next) {
	if(err)
		next(err);
  res.send('NOT IMPLEMENTED: Garage delete POST');
};

// Display Garage update form on GET.
exports.garage_update_get = function(err, req, res, next) {
	if(err)
		next(err);
  res.send('NOT IMPLEMENTED: Garage update GET');
};

// Handle Garage update on POST.
exports.garage_update_post = function(err, req, res, next) {
	if(err)
		next(err);
  res.send('NOT IMPLEMENTED: Garage update POST');
};