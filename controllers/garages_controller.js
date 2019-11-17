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
  res.send('NOT IMPLEMENTED: Garage create GET');
};

// Handle Garage create on POST.
exports.garage_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Garage create POST');
};

// Display Garage delete form on GET.
exports.garage_delete_get = function(req, res) {
	GarageModel.delete(req.params.id).then(function(result){
		//Data holds the information for the issue with the id param
		res.send('NOT IMPLEMENTED: Garage delete GET: ' + req.params.id);
	}).catch(function(err){
		console.log(err);
	});
};

// Handle Garage delete on POST.
exports.garage_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Garage delete POST');
};

// Display Garage update form on GET.
exports.garage_update_get = function(req, res) {
	GarageModel.update().then(function(result){
		//Data holds the information for the issue with the id param
		res.send('NOT IMPLEMENTED: Garage update GET: ' + req.params.id);
	}).catch(function(err){
		console.log(err);
	});
};

// Handle Garage update on POST.
exports.garage_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Garage update POST');
};