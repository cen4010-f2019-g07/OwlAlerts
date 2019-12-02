"use strict";
const production = process.env.production || false;
global.__basedir = __dirname;
const express = require('express');
const pool = require('./lib/pool_db');
const bodyParser = require('body-parser');
const http = require('http');
const session = require('express-session');
const flash = require('connect-flash');
const fileUpload = require('express-fileupload');
const paginate = require('express-paginate');
const bcrypt = require('bcryptjs');
const cron = require('node-cron');

const dashboardRouter = require('./routes/dashboard'); //Our New Default Page
const userRouter = require('./routes/users');
const eventRouter = require('./routes/events');
const garageRouter = require('./routes/garages');
const issueRouter = require('./routes/issues');
const passport = require('./config/passport');

const GarageModel = require('./models/garage');

const app = express();

app.use(paginate.middleware(10, 50));
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({secret: 'secret', cookie: { maxAge: 60000 }, resave: false, 
saveUninitialized: false, }));
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());
app.use(flash());

app.use('/', dashboardRouter);
app.use('/users', userRouter);
app.use('/garages', garageRouter);
app.use('/events', eventRouter);
app.use('/issues', issueRouter);

app.set('view engine', 'ejs');

if(production){
	http.createServer(app, function(req, res){
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end("Hello Node.js\n");
	}).listen(14250), () => console.log('Listening on port 14250...');
}
else{
	app.listen(3000, () => console.log('Listening on port 3000...'));
}

passport.serializeUser(function(user, done){
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
	let userQuery = `SELECT * FROM users WHERE id=\'${id}\'`;
	pool.query(userQuery, function(err, rows, fields){
		if(err)
			console.log(err);
		done(err, rows[0]);
	});
});

//At Midnight Update All Garages to Be Empty
cron.schedule('00 00 00 * * 0-6', function(){
	GarageModel.all().then(function(garages){
		for(var i in garages){
			let attr = {
				id: garages[i].id,
				free_spots: garages[i].total_spots,
				full: false
			};
			GarageModel.update(attr).then(function(result){
				console.log('All Garages Are Empty at Midnight!');
			}).catch(function(err){
				console.log(err);
			});
		}
	}).catch(function(err){
		console.log(err);
	});
});

//At Every Hour From 4 am to 11 am Decrease Free Spots by 1/9 of Total Spots
//Monday - Friday
cron.schedule('00 00 4-11 * * 1-5', function(){
	GarageModel.all().then(function(garages){
		for(var i in garages){
			let attr = {
				id: garages[i].id,
				free_spots: (garages[i].free_spots - ((garages[i].total_spots)/9))
			}
			GarageModel.update(attr).then(function(result){
				console.log('All Garages Have Decreased by 1/9');
			}).catch(function(err){
				console.log(err);
			});
		}
	})
});

//At Noon Update All Garages to Be Full During Weekdays
cron.schedule('00 00 12 * * 0-6', function(){
	GarageModel.all().then(function(garages){
		for(var i in garages){
			let attr = {
				id: garages[i].id,
				free_spots: 0,
				full: true
			};
			GarageModel.update(attr).then(function(result){
				console.log('All Garages Are Empty at Midnight!');
			}).catch(function(err){
				console.log(err);
			});
		}
	}).catch(function(err){
		console.log(err);
	});
});

//At Every Hour From 4 pm to 11 pm Free Spots Increase by 1/9 of Total Spots
//Monday - Friday
cron.schedule('00 00 16-23 * * 1-5', function(){
	GarageModel.all().then(function(garages){
		let free_spots = (garages[i].free_spots + ((garages[i].total_spots)/9));
		for(var i in garages){
			let attr = {
				id: garages[i].id,
				free_spots: free_spots
			}
			GarageModel.update(attr).then(function(result){
				console.log('All Garages Have Decreased by 1/9');
			}).catch(function(err){
				console.log(err);
			});
		}
	})
});