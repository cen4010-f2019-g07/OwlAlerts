const mysql = require('mysql');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const production = process.env.production || false;
var pool;


if(production == true){
	pool = mysql.createPool({
		connectionLimit: 100,
		host: 'localhost',
		user: 'cen4010fal19_g07',
		password: 'kJDrofNeU6',
		database: 'cen4010fal19_g07',
		multipleStatements: true
	});
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
}

function databaseQuery(query){
	return new Promise(function(resolve, reject){
	pool.query(query, function(err, rows, fields){
		if(err)
			return reject(err);
		resolve(rows);
	});
});
}

passport.use(new LocalStrategy(function(username, password, done){
	const userQuery = `SELECT * FROM users WHERE email=\'${username}\' AND password=\'${password}\'`;
	databaseQuery(userQuery).then(function(result){
		if(result.length == 0){
			return done(null, false, {message: 'Incorrect Email or Password!'});
		}
		return done(null, result[0]);
	}).catch(function(err){
		return done(err);
	});
}));

module.exports = passport;