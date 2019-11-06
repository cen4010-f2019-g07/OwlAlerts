var express = require('express');
var router = express.Router();

var garages_controller = require('../controllers/garages_controller');

// GET Garage home page.
router.get('/', garages_controller.index);

// GET request for creating an Garage.
router.get('/create', garages_controller.garage_create_get);

// POST request for creating Garage.
router.post('/create', garages_controller.garage_create_post);

// GET request to delete Garage.
router.get('/book/:id/delete', garages_controller.garage_delete_get);

// POST request to delete Garage.
router.post('/book/:id/delete', garages_controller.garage_delete_post);

// GET request to update Garage.
router.get('/book/:id/update', garages_controller.garage_update_get);

// POST request to update Garage.
router.post('/book/:id/update', garages_controller.garage_update_post);

// GET request for one Garage.
router.get('/book/:id', garages_controller.garage_detail);

// GET request for list of all Garage items.
router.get('/events', garages_controller.garage_list);

module.exports = router;