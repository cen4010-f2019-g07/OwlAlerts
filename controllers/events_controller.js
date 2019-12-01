var EventModel = require('../models/event');

// Home page for Events
exports.index = function(req, res) {
	EventModel.all().then(function(data){
		res.render('pages/events/eventshome',{
			sessionUser: req.user,
			events:data
		});
	}).catch(function(err){
		console.log(err);
	});
};

// Display list of all Events.
exports.event_list = function(req, res) {
	EventModel.all().then(function(data){
		res.render('pages/events/eventslist',{
			sessionUser: req.user,
			events:data
		});
	}).catch(function(err){
		console.log(err);
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
	res.render('pages/events/eventspost',{
		sessionUser: req.user,
	});
};

// Handle Event create on POST.
exports.event_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Event create POST');
};

// Display Event delete form on GET.
exports.event_delete_get = function(req, res) {
	EventModel.delete(req.params.id).then(function(result){
		//Data holds the information for the issue with the id param
		res.send('NOT IMPLEMENTED: Event delete GET: ' + req.params.id);
	}).catch(function(err){
		console.log(err);
	});
};

// Handle Event delete on POST.
exports.event_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Event delete POST');
};

// Display Event update form on GET.
exports.event_update_get = function(req, res) {
	EventModel.update().then(function(result){
		//Data holds the information for the issue with the id param
		res.send('NOT IMPLEMENTED: Evnet update GET: ' + req.params.id);
	}).catch(function(err){
		console.log(err);
	});
};

// Handle Event update on POST.
exports.event_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Event update POST');
};