var express = require('express');
var router = express.Router();

var events_controller = require('../controllers/events_controller');

// GET Event home page.
router.get('/', events_controller.index);

// GET request for creating an Event.
router.get('/create', events_controller.event_create_get);

// POST request for creating Event.
router.post('/create', events_controller.event_create_post);

// GET request to delete Event.
router.get('/event/:id/delete', events_controller.event_delete_get);

// POST request to delete Event.
router.post('/event/:id/delete', events_controller.event_delete_post);

// GET request to update Event.
router.get('/event/:id/update', events_controller.event_update_get);

// POST request to update Event.
router.post('/event/:id/update', events_controller.event_update_post);

// GET request for one Event.
router.get('/event/:id', events_controller.event_detail);

// GET request for list of all Event items.
router.get('/events', events_controller.event_list);

module.exports = router;