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

class User {
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

	update(attr){ //Short for attributes
		return new Promise(function(resolve, reject){
			let getUserQuery = `SELECT * FROM users WHERE id='${attr[id]}'`
			databaseQuery(getUserQuery).then(function(result){
				let user = result[0];
				if(attr[residency] != user.residency){
					let residencyQuery = `UPDATE users SET residency='${attr[residency]}' WHERE id='${attr[id]}'`;
					databaseQuery(residencyQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr[faculty] != user.faculty){
					let facultyQuery = `UPDATE users SET faculty=${attr[faculty]} WHERE id='${attr[id]}'`;
					databaseQuery(facultyQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr[commuter] != user.commuter){
					//Make sure that both dormer and commuter can't be true
					let commuterQuery = `UPDATE users SET commuter=${attr[commuter]} WHERE id='${attr[id]}'`;
					databaseQuery(commuterQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr[dormer] != user.dormer){
					let dormerQuery = `UPDATE users SET dormer=${attr[dormer]} WHERE id='${attr[id]}'`;
					databaseQuery(dormerQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr[building] != user.building){
					let building = `UPDATE users SET building='${attr[building]}' WHERE id='${attr[id]}'`;
					databaseQuery(building).catch(function(err){
						console.log(err);
					});
				}
				if(attr[room_number] != user.room_number){
					let roomQuery = `UPDATE users SET room_number='${attr[room_number]}' WHERE id='${attr[id]}'`;
					databaseQuery(roomQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr[phone_number] != user.phone_number){
					let phoneQuery = `UPDATE users SET phone_number='${attr[phone_number]}' WHERE id='${attr[id]}'`;
					databaseQuery(phoneQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr[street] != user.street){
					let streetQuery = `UPDATE users SET street='${attr[street]}' WHERE id='${attr[id]}'`;
					databaseQuery(streetQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr[city] != user.city){
					let cityQuery = `UPDATE users SET city='${attr[city]}' WHERE id='${attr[id]}'`;
					databaseQuery(cityQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr[state] != user.state){
					let stateQuery = `UPDATE users SET state='${attr[state]}' WHERE id='${attr[id]}'`;
					databaseQuery(stateQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr[zip] != user.zip){
					let zipQuery = `UPDATE users SET zip='${attr[zip]}' WHERE id='${attr[id]}'`;
					databaseQuery(zipQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr[country] != user.country){
					let countryQuery = `UPDATE users SET country='${attr[country]}' WHERE id='${attr[id]}'`;
					databaseQuery(countryQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr[email] != user.email){
					let emailQuery = `UPDATE users SET email='${attr[email]}' WHERE id='${attr[id]}'`;
					databaseQuery(emailQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr[password] != user.password){
					let passwordQuery = `UPDATE users SET password='${attr[password]}' WHERE id='${attr[id]}'`;
					databaseQuery(passwordQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr[firstname] != user.firstname){
					let firstnameQuery = `UPDATE users SET firstname='${attr[firstname]}' WHERE id='${attr[id]}'`;
					databaseQuery(firstnameQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr[lastname] != user.lastname){
					let lastnameQuery = `UPDATE users SET lastname='${attr[lastname]}' WHERE id='${attr[id]}'`;
					databaseQuery(lastnameQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr[image_id] != user.image_id){
					let imageQuery = `UPDATE users SET image_id='${attr[image_id]}' WHERE id='${attr[id]}'`;
					databaseQuery(imageQuery).catch(function(err){
						console.log(err);
					});
				}
			})
		});
	}

	delete(id){
		return new Promise(function(resolve, reject){
			let query = `DELETE FROM users WHERE id='${id}'`;
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
			let query = `SELECT * FROM users WHERE id='${id}'`;
			databaseQuery(query).then(function(result){
				resolve(result[0]);
			}).catch(function(err){
				console.log(err);
			});
		});
	}

	checkEmail(email){
		return new Promise(function(resolve, reject){
			let query = `SELECT * FROM users WHERE email='${email}'`;
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

var UserModel = new User();

module.exports = UserModel;