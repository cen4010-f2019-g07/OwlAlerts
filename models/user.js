const pool = require('../lib/pool_db');

function databaseQuery(query){
	return new Promise(function(resolve, reject){
		pool.query(query, function(err, rows, fields){
			if(err)
				return reject(err);
			resolve(rows);
		});
	});
}

class Issue {
	contructor(){}

	create(firstname, lastname, email, password){
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

	update(){
		return new Promise(function(resolve, reject){

		});
	}

	delete(id){
		return new Promise(function(resolve, reject){
			let query = `DELETE FROM users WHERE id=${id}`;
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				console.log(err);
			});
		});
	}

	all(){
		return new Promise(function(resolve, reject){
			let query = 'SELECT * FROM users';
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				console.log(err);
			});
		});
	}

	get(id){
		return new Promise(function(resolve, reject){
			let query = `SELECT * FROM users WHERE id=\'${id}\'`;
			databaseQuery(query).then(function(result){
				resolve(result[0]);
			}).catch(function(err){
				console.log(err);
			});
		});
	}

	checkEmail(email){
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
}

var IssueModel = new Issue();

module.exports = IssueModel;