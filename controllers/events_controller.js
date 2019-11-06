var event = require('../models/event');

exports.index = function(err, req, res, next) {
	console.error(err);
	res.send('NOT IMPLEMENTED: Event index');
};

// Display list of all Events.
exports.event_list = function(err, req, res, next) {
	if(err)
		next(err);
  res.send('NOT IMPLEMENTED: Event list');
};

// Display detail page for a specific Event.
exports.event_detail = function(err, req, res, next) {
	if(err)
		next(err);
  res.send('NOT IMPLEMENTED: Event detail: ' + req.params.id);
};

// Display Event create form on GET.
exports.event_create_get = function(err, req, res, next) {
	if(err)
		next(err);
  res.send('NOT IMPLEMENTED: Event create GET');
};

// Handle Event create on POST.
exports.event_create_post = function(err, req, res, next) {
	if(err)
		next(err);
  res.send('NOT IMPLEMENTED: Event create POST');
};

// Display Event delete form on GET.
exports.event_delete_get = function(err, req, res, next) {
	if(err)
		next(err);
  res.send('NOT IMPLEMENTED: Event delete GET');
};

// Handle Event delete on POST.
exports.event_delete_post = function(err, req, res, next) {
	if(err)
		next(err);
  res.send('NOT IMPLEMENTED: Event delete POST');
};

// Display Event update form on GET.
exports.event_update_get = function(err, req, res, next) {
	if(err)
		next(err);
  res.send('NOT IMPLEMENTED: Event update GET');
};

// Handle Event update on POST.
exports.event_update_post = function(err, req, res, next) {
	if(err)
		next(err);
  res.send('NOT IMPLEMENTED: Event update POST');
};