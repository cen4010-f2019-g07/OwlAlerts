var express = require('express');
var router = express.Router();

var users_controller = require('../controllers/users_controller');

// GET User home page.
router.get('/', users_controller.index);

// GET request for creating an User.
router.get('/create', users_controller.user_create_get);

// POST request for creating User.
router.post('/create', users_controller.user_create_post);

// GET request to delete User.
router.get('/book/:id/delete', users_controller.user_delete_get);

// POST request to delete User.
router.post('/book/:id/delete', users_controller.user_delete_post);

// GET request to update User.
router.get('/book/:id/update', users_controller.user_update_get);

// POST request to update User.
router.post('/book/:id/update', users_controller.user_update_post);

// GET request for one User.
router.get('/book/:id', users_controller.user_detail);

// GET request for list of all User items.
router.get('/events', users_controller.user_list);

module.exports = router;