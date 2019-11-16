var express = require('express');
var router = express.Router();

var users_controller = require('../controllers/users_controller');
const auth = require('./auth');

// GET User home page.
router.get('/', users_controller.index); 

// GET request for creating an User.
router.get('/signup', users_controller.user_create_get);

// POST request for creating User.
router.post('/signup', users_controller.user_create_post);

// GET request to delete User.
router.get('/user/:id/delete', users_controller.user_delete_get); //Prefaced by users - /users/user/:id/delete

// POST request to delete User.
router.post('/user/:id/delete', users_controller.user_delete_post);

// GET request to update User.
router.get('/user/:id/update', users_controller.user_update_get);

// POST request to update User.
router.post('/user/:id/update', users_controller.user_update_post);

// GET request for one User.
router.get('/user/:id', users_controller.user_detail);

// GET request for list of all User items.
router.get('/users', users_controller.user_list);

// GET request for User Sign In Page
router.get('/signin', users_controller.user_signin_get);

// POST request for User Sign In Page
router.post('/signin', users_controller.user_signin_post);

// GET request to logout user
router.get('/logout', users_controller.user_logout_get);

module.exports = router;