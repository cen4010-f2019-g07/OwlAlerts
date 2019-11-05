var user = require('../models/user');

// Display list of all Issues.
exports.user_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Issue list');
};

// Display detail page for a specific Issue.
exports.user_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Issue detail: ' + req.params.id);
};

// Display Issue create form on GET.
exports.user_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Issue create GET');
};

// Handle Issue create on POST.
exports.user_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Issue create POST');
};

// Display Issue delete form on GET.
exports.user_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Issue delete GET');
};

// Handle Issue delete on POST.
exports.user_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Issue delete POST');
};

// Display Issue update form on GET.
exports.user_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Issue update GET');
};

// Handle Issue update on POST.
exports.user_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Issue update POST');
};