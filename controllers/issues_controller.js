var issue = require('../models/issue');

//Home page for Issues.
exports.index = function(req, res) {
	res.send('NOT IMPLEMENTED: Issue index');
};

// Display list of all Issues.
exports.issue_list = function(req, res) {
  res.send('NOT IMPLEMENTED: Issue list');
};

// Display detail page for a specific Issue.
exports.issue_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: Issue detail: ' + req.params.id);
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
  res.send('NOT IMPLEMENTED: Issue delete GET');
};

// Handle Issue delete on POST.
exports.issue_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Issue delete POST');
};

// Display Issue update form on GET.
exports.issue_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Issue update GET');
};

// Handle Issue update on POST.
exports.issue_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Issue update POST');
};