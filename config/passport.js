const mysql = require('mysql');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const production = process.env.production;
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
		pool.getConnection(function(error, connection){
			if(error)
				return reject(error);
			connection.query(query, function(err, rows, fields){
				connection.release();
				if(err)
					return reject(err);
				resolve(rows);
			});
		});
	});
}

passport.use(new LocalStrategy(function(email, password, done){
	const userQuery = `SELECT * FROM users WHERE email=\'${email}\' AND password=\'${password}\'`;
	databaseQuery(userQuery).then(function(result){
		if(result.length > 0){
			return done(null, false, {message: 'Incorrect Email or Password!'});
		}
		return done(null, user);
	}).catch(function(err){
		return done(err);
	});
}));