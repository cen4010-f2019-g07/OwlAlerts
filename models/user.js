"use strict";
const pool = require('../lib/pool_db');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
var fs = require('fs');

let userImageSaveDir = '/resources/user_images/';
let userProfileImageDirectory = __basedir + '/public' + userImageSaveDir;


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
			bcrypt.hash(password, saltRounds).then(function(hash){
				let query = `INSERT INTO users(firstname, lastname, email, password) \
				VALUE(\'${firstname}\', \'${lastname}\', \'${email}\', \'${hash}\')`;
				databaseQuery(query).then(function(result){
					resolve(result);
				}).catch(function(err){
					console.log(err);
				});
			}).catch(function(err){
				console.log(err);
			});
		});
	}

	upload(image){
		return new Promise(function(resolve, reject){

			//to append timestamp before the extension
			let newFileName = image.name.replace(".", "_" + Date.now()+".");

			//create image directory if does not exist
			if(!fs.existsSync(userProfileImageDirectory)){
				fs.mkdirSync(userProfileImageDirectory);
			}

			//move the imgae file to directory on server
			image.mv(userProfileImageDirectory + newFileName);
	
			let query = `INSERT INTO images(name, description, type, size) \
					VALUE(\'${newFileName}\', \'${"sample image"}\', \'${image.mimetype}\', \'${image.data.length}\')`;

			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				console.log(err);
			});
    });
  }

	update(attr){ //Short for attributes
		return new Promise(function(resolve, reject){
			let getUserQuery = `SELECT * FROM users WHERE id='${attr['id']}'`;
			databaseQuery(getUserQuery).then(function(result){
				let user = result[0];
				if(attr['residency'] != user.residency && attr['residency'] != null){
					let residencyQuery = `UPDATE users SET residency='${attr['residency']}' WHERE id='${attr['id']}'`;
					databaseQuery(residencyQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr['faculty'] != user.faculty  && attr['faculty'] != null){
					let facultyQuery = `UPDATE users SET faculty=${attr['faculty']} WHERE id='${attr['id']}'`;
					databaseQuery(facultyQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr['housing_status'] != user.housing_status  && attr['housing_status'] != null){
					//Make sure that both dormer and commuter can't be true
					let housingStatusQuery = `UPDATE users SET housing_status='${attr['housing_status']}'' \
					WHERE id='${attr['id']}'`;
					databaseQuery(housingStatusQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr['building'] != user.building  && attr['building'] != null){
					let buildingQuery = `UPDATE users SET building='${attr['building']}' WHERE id='${attr['id']}'`;
					databaseQuery(buildingQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr['room_number'] != user.room_number  && attr['room_number'] != null){
					let roomQuery = `UPDATE users SET room_number='${attr['room_number']}' WHERE id='${attr['id']}'`;
					databaseQuery(roomQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr['phone_number'] != user.phone_number  && attr['phone_number'] != null){
					let phoneQuery = `UPDATE users SET phone_number='${attr['phone_number']}' WHERE id='${attr['id']}'`;
					databaseQuery(phoneQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr['street'] != user.street  && attr['street'] != null){
					let streetQuery = `UPDATE users SET street='${attr['street']}' WHERE id='${attr['id']}'`;
					databaseQuery(streetQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr['city'] != user.city  && attr['city'] != null){
					let cityQuery = `UPDATE users SET city='${attr['city']}' WHERE id='${attr['id']}'`;
					databaseQuery(cityQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr['state'] != user.state  && attr['state'] != null){
					let stateQuery = `UPDATE users SET state='${attr['state']}' WHERE id='${attr['id']}'`;
					databaseQuery(stateQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr['zip'] != user.zip  && attr['zip'] != null){
					let zipQuery = `UPDATE users SET zip='${attr['zip']}' WHERE id='${attr['id']}'`;
					databaseQuery(zipQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr['country'] != user.country  && attr['country'] != null){
					let countryQuery = `UPDATE users SET country='${attr['country']}' WHERE id='${attr['id']}'`;
					databaseQuery(countryQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr['email'] != user.email  && attr['email'] != null){
					let emailQuery = `UPDATE users SET email='${attr['email']}' WHERE id='${attr['id']}'`;
					databaseQuery(emailQuery).catch(function(err){
						console.log(err);
					});
				}
				bcrypt.compare(attr['password'], user.password).then(function(res){
					if(attr['password'] != null && !res){
						bcypt.hash(attr['password'], saltRounds).then(function(hash){
							let passwordQuery = `UPDATE users SET password='${hash}' WHERE id='${attr['id']}'`;
							databaseQuery(passwordQuery).catch(function(err){
								console.log(err);
							});
						});
					}
				})
				if(attr['firstname'] != user.firstname  && attr['firstname'] != null){
					let firstnameQuery = `UPDATE users SET firstname='${attr['firstname']}' WHERE id='${attr['id']}'`;
					databaseQuery(firstnameQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr['lastname'] != user.lastname  && attr['lastname'] != null){
					let lastnameQuery = `UPDATE users SET lastname='${attr['lastname']}' WHERE id='${attr['id']}'`;
					databaseQuery(lastnameQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr['image_id'] != user.image_id  && attr['image_id'] != null){
					let imageQuery = `UPDATE users SET image_id='${attr['image_id']}' WHERE id='${attr['id']}'`;
					databaseQuery(imageQuery).catch(function(err){
						console.log(err);
					});
				}
			});
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

	getProfileImage(id) {
		return new Promise(function(resolve, reject){
			let query = `SELECT * FROM images WHERE id=\'${id}\'`;
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

	getUserProfileImagePath(imgFileName) {
		return userImageSaveDir + imgFileName;
	}

	checkLogin(email, password){
		return new Promise(function(resolve, reject){
			let query = `SELECT * FROM users WHERE email='${email}'`;
			databaseQuery(query).then(function(result){
				let user = result[0];
				if(!user){
					resolve(false);
				}
				return user;
			}).then(function(user){
				bcrypt.compare(password, user.password).then(function(res){
					if(res){
						resolve(user);
					}
					else{
						resolve(false);
					}
				});
			}).catch(function(err){
				console.log(err);
			});
		}).catch(function(err){
			console.log(err);
		});
	}
}

var UserModel = new User();

module.exports = UserModel;