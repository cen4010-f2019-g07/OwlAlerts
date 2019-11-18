"use strict";
const production = process.env.production || false;
process.env.production = production;
global.__basedir = __dirname;
const express = require('express');
const pool = require('./lib/pool_db');
const bodyParser = require('body-parser');
const http = require('http');
const session = require('express-session');
const flash = require('connect-flash');
const fileUpload = require('express-fileupload');

const dashboardRouter = require('./routes/dashboard'); //Our New Default Page
const userRouter = require('./routes/users');
const eventRouter = require('./routes/events');
const garageRouter = require('./routes/garages');
const issueRouter = require('./routes/issues');
const passport = require('./config/passport');

const app = express();

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
	pool.getConnection(function(error, connection){
		if(error)
			console.log(error);
		connection.query(userQuery, function(err, rows, fields){
			if(err)
				console.log(err);
			done(err, rows[0]);
		});
	});
});