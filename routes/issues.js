"use strict";
var express = require('express');
var router = express.Router();

var issues_controller = require('../controllers/issues_controller');

// GET Issue home page.
router.get('/', issues_controller.index);

// GET request for creating an Issue.
router.get('/create', issues_controller.issue_create_get);

// POST request for creating Issue.
router.post('/create', issues_controller.issue_create_post);

// GET request to delete Issue.
router.get('/issue/:id/delete', issues_controller.issue_delete_get);

// POST request to delete Issue.
router.post('/issue/:id/delete', issues_controller.issue_delete_post);

// GET request to update Issue.
router.get('/issue/:id/update', issues_controller.issue_update_get);

// POST request to update Issue.
router.post('/issue/:id/update', issues_controller.issue_update_post);

// GET request for one Issue.
router.get('/issue/:id', issues_controller.issue_detail);

// POST request for one Issue.
router.post('/issue/:id', issues_controller.issue_detail_post);

// GET request for list of all Issue items.
router.get('/issues', issues_controller.issue_list);

module.exports = router;