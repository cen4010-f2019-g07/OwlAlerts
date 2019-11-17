var IssueModel = require('../models/issue');

//Home page for Issues.
exports.index = function(req, res) {
	IssueModel.all().then(function(data){
		res.send('NOT IMPLEMENTED: Issue index');
	}).catch(function(err){
		console.log(err);
	});
};

// Display list of all Issues.
exports.issue_list = function(req, res) {
	IssueModel.all().then(function(data){
		//data is an array of all issues
		res.send('NOT IMPLEMENTED: Issue list');
	}).catch(function(err){
		console.log(err);
	});
};

// Display detail page for a specific Issue.
exports.issue_detail = function(req, res) {
	IssueModel.get(req.params.id).then(function(result){
		//Data holds the information for the issue with the id param
		res.send('NOT IMPLEMENTED: Issue detail: ' + req.params.id);
	}).catch(function(err){
		console.log(err);
	});
};

// Display Issue create form on GET.
exports.issue_create_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Issue create GET');
};

// Handle Issue create on POST.
exports.issue_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Issue create POST');
};

// Display Issue delete form on GET.
exports.issue_delete_get = function(req, res) {
	IssueModel.delete(req.params.id).then(function(result){
		//Data holds the information for the issue with the id param
		res.send('NOT IMPLEMENTED: Issue delete GET: ' + req.params.id);
	}).catch(function(err){
		console.log(err);
	});
};

// Handle Issue delete on POST.
exports.issue_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Issue delete POST');
};

// Display Issue update form on GET.
exports.issue_update_get = function(req, res) {
	IssueModel.update().then(function(result){
		//Data holds the information for the issue with the id param
		res.send('NOT IMPLEMENTED: Issue update GET: ' + req.params.id);
	}).catch(function(err){
		console.log(err);
	});
};

// Handle Issue update on POST.
exports.issue_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Issue update POST');
};