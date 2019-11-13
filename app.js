"use strict";
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const http = require('http');
const multer = require('multer');
const dashboardRouter = require('./routes/dashboard'); //dashboard.js in routes folder
const indexRouter = require('./routes/index'); //Default page
const userRouter = require('./routes/users');
const eventRouter = require('./routes/events');
const garageRouter = require('./routes/garages');
const issueRouter = require('./routes/issues');

const app = express();
const production = process.env.production;
var pool;

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/garages', garageRouter);
app.use('/events', eventRouter);
app.use('/issues', issueRouter);
app.use('/dashboard', dashboardRouter);

app.set('view engine', 'ejs');

if(production == true){
	pool = mysql.createPool({
		connectionLimit: 100,
		host: 'localhost',
		user: 'cen4010fal19_g07',
		password: 'kJDrofNeU6',
		database: 'cen4010fal19_g07',
		multipleStatements: true
	});
	http.createServer(app, function(req, res){
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end("Hello Node.js\n");
	}).listen(14250), () => console.log('Listening on port 14250...');
}
else{
	pool = mysql.createPool({
		connectionLimit: 100,
		host: 'localhost',
		user: 'user',
		password: 'password',
		database: 'owl_alerts',
		multipleStatements: true
	});
	app.listen(3000, () => console.log('Listening on port 3000...'));
}

pool.on('acquire', function(connection){
	console.log('Connection %d acquired', connection.threadId);
})

pool.on('release', function(connection){
	console.log('Connection %d released', connection.threadId);
});

pool.on('enqueue', function(){
	console.log('Waiting for available connection slot');
});

pool.on('connection', function(connection){
	connection.query('SET SESSION auto_increment_increment=1');
});