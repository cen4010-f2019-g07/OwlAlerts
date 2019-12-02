"use strict";
var UserModel = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function(username, password, done){
	UserModel.checkLogin(username, password).then(function(user){
		if(!user){
			return done(null, false, {message: 'Incorrect Email or Password!'});
		}
		return done(null, user);
	}).catch(function(err){
		return done(err);
	}).catch(function(err){
		console.log(err);
	});
}));

module.exports = passport;