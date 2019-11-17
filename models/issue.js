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
	contructor(){;
		if(production == true){
			this.pool = mysql.createPool({
				connectionLimit: 100,
				host: 'localhost',
				user: 'cen4010fal19_g07',
				password: 'kJDrofNeU6',
				database: 'cen4010fal19_g07',
				multipleStatements: true
			});
		}
		else{
			this.pool = mysql.createPool({
				connectionLimit: 100,
				host: 'localhost',
				user: 'user',
				password: 'password',
				database: 'owl_alerts',
				multipleStatements: true
			});
		}
	}

	create(){ //Needs to be done
		return new Promise(function(resolve, reject){
			let query = '';
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
			let query = `DELETE FROM issues WHERE id=${id}`;
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				console.log(err);
			});
		});
	}

	all(){
		return new Promise(function(resolve, reject){
			let query = 'SELECT * FROM issues';
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				console.log(err);
			});
		});
	}

	get(id){
		return new Promise(function(resolve, reject){
			let query = `SELECT * FROM issues WHERE id=\'${id}\'`;
			databaseQuery(query).then(function(result){
				resolve(result[0]);
			}).catch(function(err){
				console.log(err);
			});
		});
	}
}

var IssueModel = new Issue();

module.exports = IssueModel;