"use strict";
const UserModel = require('../models/user');
//var upload = require('../config/multer');
var passport = require('../config/passport');
const paginate = require('express-paginate');

function isEmpty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

// Home Page for Users.
exports.index = function(req, res){
	UserModel.all().then(function(data){
		res.render('pages/users/index', {
			sessionUser: req.user,
			users: data
		});
	}).catch(function(err){
		console.log(err);
	});
};

// Display list of all Users.
exports.user_list = function(req, res) {
	if(req.user){
		if(req.user.faculty || req.user.admin){
			let numPerPage = parseInt(req.query.npp, 10) || 10;
			let page = parseInt(req.query.page, 10) || 0;
			let skip = (page-1) * numPerPage;
			let limit = skip + ',' + numPerPage;
			var itemCount;
			var pageCount;
			UserModel.allCount().then(function(userCount){
				itemCount = userCount;
				pageCount = Math.ceil(itemCount/req.query.limit);
			}).then(function(){
				UserModel.allPaginate(limit).then(function(data){
					res.render('pages/users/userlist',
			    {
	          sessionUser: req.user,
			      users: data,
			      pageCount,
			      itemCount,
			      pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
			    });
				}).catch(function(err){
					console.log(err);
				});
			}).catch(function(err){
				console.log(err);
			});
		}
		else{
			res.status(401).render("errors/401");
		}
	}
	else{
		res.redirect('/users/signin');
	}
};

// Display detail page for a specific User.
exports.user_detail = function(req, res) {
	if(req.user){
		if(req.user.faculty || req.user.admin || req.user.id == req.params.id){
			UserModel.get(req.params.id).then(function(data){

				UserModel.getProfileImage(data.image_id).then(function(imgData){

					var imageSrcPath = (imgData != null) ? UserModel.getUserProfileImagePath(imgData.name) :
					"https://via.placeholder.com/180x180";

					res.render('pages/users/show', {
						sessionUser: req.user,
						user: data,
						imgFilePath: imageSrcPath
					}); 
				})	
			}).catch(function(err){
				console.log(err);
			});
		}
		else{
			res.status(401).render("errors/401");
		}
	}
	else{
		res.redirect('/users/signin');
	}
};

// Display User create form on GET.
exports.user_create_get = function(req, res) {
	if(req.user){
		res.redirect('/');
	}
	else{
		res.render('pages/users/signup', {
	  	sessionUser: req.user
	  });
	}
};

// Handle User create on POST.
exports.user_create_post = function(req, res, next) {
	let firstname = req.body.firstname;
	let lastname = req.body.lastname;
	let email = req.body.username;
	let password = req.body.password;
	let confirm = req.body.confirm;
	UserModel.checkEmail(email).then(function(result){
		if(result){
			if(password == confirm){
				UserModel.create(firstname, lastname, email, password).then(function(){
					passport.authenticate('local', {
						successRedirect: '/',
						successFlash: 'You Have Been Successfully Logged In!',
						failureRedirect: '/users/signin',
						failureFlash: true
					})(req, res, next);
				}).catch(function(err){
					console.log(err);
				});
			}
			else{
				console.log('Confirm Password is not the same as Password!');
				res.redirect('/users/signup');
			}
		}
		else{
			console.log('User Account Already Exists!')
			res.redirect('/users/signup');
		}
	}).catch(function(err){
		console.log(err);
	});
};



// Display User delete form on GET.
exports.user_delete_get = function(req, res) {
	if(req.user){
		if(req.user.faculty || req.user.admin || req.user.id == req.params.id){
			UserModel.get(req.params.id).then(function(data){
				res.send('NOT IMPLEMENTED: User delete GET: ' + req.params.id);
			}).catch(function(err){
				console.log(err);
			});
		}
		else{
			res.status(401).render("errors/401");
		}
	}
	else{
		res.redirect('/users/signin');
	}
};

// Handle User delete on POST.
exports.user_delete_post = function(req, res) {
	if(req.user){
		if(req.user.faculty || req.user.admin || req.user.id == req.params.id){
			res.send('NOT IMPLEMENTED: User delete POST');
		}
		else{
			res.status(401).render("errors/401");
		}
	}
  else{
  	res.redirect('/users/signin');
  }
};

// Display User update form on GET.
exports.user_update_get = function(req, res) {
	if(req.user){
		if(req.user.faculty || req.user.admin || req.user.id == req.params.id){
			UserModel.get(req.params.id).then(function(data){

				UserModel.getProfileImage(data.image_id).then(function(imgData){

					var imageSrcPath = (imgData != null) ? UserModel.getUserProfileImagePath(imgData.name) :
					"https://via.placeholder.com/180x180";

					res.render('pages/users/update', {
						sessionUser: req.user,
						user: data,
						imgFilePath: imageSrcPath
					}); 
				}).catch(function(err){
					console.log(err);
				});
			}).catch(function(err){
				console.log(err);
			});
		}
		else{
			res.status(401).render("errors/401");
		}
	}
	else{
		res.redirect('/users/signin');
	}
};

// Handle User update on POST.
exports.user_update_post = function(req, res) {
	if(req.user){
		if(req.user.faculty || req.user.admin || req.user.id == req.params.id){
			let attr = {}
			attr['id'] = req.user.id;
			attr['firstname'] = req.body.firstname || null;
			attr['lastname'] = req.body.lastname || null;
			attr['residency'] = req.body.residency || null;
			attr['housing_status'] = req.body.housing_status;
			attr['building'] = req.body.building;
			attr['room_number'] = req.body.room_number || null;
			attr['phone_number'] = req.body.phone_number || null;
			attr['street'] = req.body.street || null;
			attr['city'] = req.body.city || null;
			attr['state'] = req.body.state || null;
			attr['zip'] = req.body.zip || null;
			attr['country'] = req.body.country || null;
			attr['email'] = req.body.email || null;
			attr['password'] = req.body.password || null;
			if(isEmpty(req.files))
				attr['image_id'] = null;
			else {
				UserModel.upload(req.files.profile).then(function(result) {
					let newImageId = result.insertId;
					attr['image_id'] = newImageId;
				});				
			}
			UserModel.update(attr);
			res.redirect(`/users/user/${req.user.id}`);
			
		}
		else{
			res.status(401).render("errors/401");
		}
	}
  else{
  	res.redirect('/users/signin');
  }
};

//User Sign In Page
exports.user_signin_get = function(req, res){
	if(req.user){
		res.redirect("/");
	}
	else{
		res.render('pages/users/signin', {
			sessionUser: req.user,
			message: req.flash('error')
		});
	}
}

//Handle Post Request for User Sign In Page
exports.user_signin_post = (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/',
		successFlash: 'You Have Been Successfully Logged In!',
		failureRedirect: '/users/signin',
		failureFlash: true
	})(req, res, next);
}

// GET Request to Logout User
exports.user_logout_get = function(req, res){
	req.logout();
	res.redirect('/');
}