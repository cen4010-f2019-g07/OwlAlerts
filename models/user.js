var mysql = require('mysql');
var UserModel;

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
			connection.query(query, function(err, rows, fields){
				connection.release();
				if(err)
					return reject(err);
				resolve(rows);
			});
		});
	});
}

UserModel.create = function(firstname, lastname, email, password){
	return new Promise(function(resolve, reject){
		let query = `INSERT INTO users(firstname, lastname, email, password) \
				VALUE(\'${firstname}\', \'${lastname}\', \'${email}\', \'${password}\')`;
		databaseQuery(query).then(function(result){
			resolve(result);
		}).catch(function(err){
			console.log(err);
		});
	});
}

UserModel.update = function(data){
	return new Promise(function(resolve, reject){
		
	});
}

UserModel.delete = function(id){
	return new Promise(function(resolve, reject){
		let query = `DELETE FROM uses WHERE id=${id}`;
		databaseQuery(query).then(function(result){
			resolve(result);
		}).catch(function(err){
			console.log(err);
		});
	});
}

UserModel.all = function(){
	return new Promise(function(resolve, reject){
		let query = 'SELECT * FROM users';
		databaseQuery(query).then(function(result){
			resolve(result);
		}).catch(function(err){
			console.log(err);
		});
	});
}

UserModel.get = function(id){
	return new Promise(function(resolve, reject){
		let query = `SELECT * FROM users WHERE id=${id}`;
		databaseQuery(query).then(function(result){
			resolve(result[0]);
		}).catch(function(err){
			console.log(err);
		});
	});
}

UserModel.checkEmail = function(email){
	return new Promise(function(resolve, reject){
		let query = `SELECT * FROM users WHERE email=\'${email}\'`;
		databaseQuery(query).then(function(result){
			if(result > 0){
				resolve(false);
			}
			else{
				resolve(true);
			}
		}).catch(function(err){
			console.log(err);
		});
	});
}

module.exports = UserModel;