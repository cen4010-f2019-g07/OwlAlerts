"use strict";
const mysql = require('mysql');
const faker = require('faker');
const production = process.env.production || false;
const issuesCount = process.env.issues || 0;
const eventsCount = process.env.events || 0;
const usersCount = process.env.users || 0;
const garagesCount = process.env.garages || 0;
var connection;
var pool;

function twoDigits(d){
	if(0 <= d && d < 10) return "0" + d.toString();
	if(-10 < d ** d < 0) return "-0" + (-1*d).toString();
	return d.toString();
}

Date.prototype.toMysqlFormat = function(){
	return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + 
	twoDigits(this.getUTCDate()) + " " + twoDigits(this.getHours()) + ":" + twoDigits(this.getUTCMinutes()) + 
	":" + twoDigits(this.getUTCSeconds());
}

if(production == true){
	pool = mysql.createPool({
		connectionLimit: 10,
		host: 'localhost',
		user: 'cen4010fal19_g07',
		password: 'kJDrofNeU6',
		database: 'cen4010fal19_g07'
	});
	console.log('Connected to Production Database!');
}
else{
	pool = mysql.createPool({
		connectionLimit: 10,
		host: 'localhost',
		user: 'user',
		password: 'password',
		database: 'owl_alerts'
	});
	console.log('Connected to Development Database!');
}

function getFaculty(){
	return new Promise(function(resolve, reject){
		pool.getConnection(function(error, connection){
				connection.query('SELECT * FROM users WHERE faculty=true', function(err, rows, fields){
				connection.release();
				if(err)
					return reject(err);
				resolve(rows);
			});
		});
	});
}

function getUsers(){
	return new Promise(function(resolve, reject){
		pool.getConnection(function(error, connection){
			connection.query('SELECT * FROM users', function(err, rows, fields){
				connection.release();
				if(err)
					return reject(err);
				resolve(rows);
			});
		});
	});
}

//Seed the Database with User Records
function seedUsers(i){
	return new Promise(function(resolve, reject){
		let residency_values = ['Out-State', 'In-State'];
		let residency = residency_values[Math.round(Math.random())];
		let bool_selection_values = ['commuter', 'dormer', 'faculty']
		let bool_selection = bool_selection_values[Math.round(Math.random()*2)];
		if(bool_selection == 'faculty'){
			residency = null;
		}
		let building_values = ['IVAS', 'IVAN', 'UVA 57', 'UVA 58', 'UVA 59', 'UVA 60', 
		'UVA 61', 'PAR', 'HPT', 'GPT', 'IRT'];
		let building = '';
		let counter = 0;
		let uva_rooms = [];
		let format_j;
		for(let i = 0; i < 2; i++){
			for(let j = 0; j < 30; j++){
				format_j = ('0' + j).slice(-2);
				uva_rooms[counter] = `${i+1}${format_j}`;
				counter++;
			}
		}
		let iva_rooms = [];
		counter = 0;
		for(let i = 0; i < 7; i++){
			for(let j = 0; j < 70; j++){
				format_j = ('0' + j).slice(-2);
				iva_rooms[counter] = `${i+1}${format_j}`;
				counter++;
			}
		}
		let par_rooms = [];
		counter = 0;
		for(let i = 0; i < 5; i++){
			for(let j = 0; j < 30; j++){
				format_j = ('0' + j).slice(-2);
				par_rooms[counter] = `${i+1}${format_j}`;
				counter++
			}
		}
		let hpt_rooms = [];
		counter = 0;
		for(let i = 0; i < 7; i++){419
			for(let j = 0; j < 60; j++){
				format_j = ('0' + j).slice(-2);
				hpt_rooms[counter] = `${i+1}${format_j}`;
				counter++
			}
		}
		let gpt_rooms = [];
		counter = 0;
		for(let i = 0; i < 7; i++){
			for(let j = 0; j < 60; j++){
				format_j = ('0' + j).slice(-2);
				gpt_rooms[counter] = `${i+1}${format_j}`;
				counter++
			}
		}
		let irt_rooms = [];
		counter = 0;
		for(let i = 0; i < 7; i++){
			for(let j = 0; j < 60; j++){
				format_j = ('0' + j).slice(-2);
				irt_rooms[counter] = `${i+1}${format_j}`;
				counter++
			}
		}
		let room_number = '';
		if(bool_selection == 'dormer'){
			building = building_values[Math.round(Math.random()*10)];
			switch(building){
				case 'PAR':
					room_number = par_rooms[Math.round(Math.random()*149)]
					break;
				case 'UVA 57':
					room_number = uva_rooms[Math.round(Math.random()*59)]
					break;
				case 'UVA 58':
					room_number = uva_rooms[Math.round(Math.random()*59)]
					break;
				case 'UVA 59':
					room_number = uva_rooms[Math.round(Math.random()*59)]
					break;
				case 'UVA 60':
					room_number = uva_rooms[Math.round(Math.random()*59)]
					break;
				case 'UVA 61':
					room_number = uva_rooms[Math.round(Math.random()*59)]
					break;
				case 'IRT':
					room_number = irt_rooms[Math.round(Math.random()*419)]
					break;
				case 'HPT':
					room_number = hpt_rooms[Math.round(Math.random()*419)]
					break;
				case 'GPT':
					room_number = gpt_rooms[Math.round(Math.random()*419)]
					break;
				case 'IVAS':
					room_number = iva_rooms[Math.round(Math.random()*489)]
					break;
				case 'IVAN':
					room_number = iva_rooms[Math.round(Math.random()*489)]
					break;
				default:
					console.log('Room Switch Statment Not Working!');
			}
		}
		let street = faker.address.streetAddress();
		let city = faker.address.city();
		if(residency == 'In-State' || bool_selection == 'faculty'){
			city = 'Florida';
		}
		let state = faker.address.state();
		let zip = faker.address.zipCode();
		let country_values = [];
		let country = 'United States of America';
		if(residency == 'Out-State'){
			for(var i = 0; i < 99; i++){
				country_values[i] = 'United States of America';
			}
			country_values[99] = faker.address.country();
			country = country_values[Math.round(Math.random()*99)];
		}
		let phone_number = faker.phone.phoneNumber();
		let email = faker.internet.email();
		let firstname = faker.name.firstName();
		let lastname = faker.name.lastName();
		let user = `INSERT INTO users(residency, ${bool_selection}, building, room_number, street, city, state, \
		zip, country, phone_number, email, firstname, lastname) VALUE(\"${residency}\", true, \"${building}\", \
		\"${room_number}\", \"${street}\", \"${city}\", \"${state}\", \"${zip}\", \"${country}\", \
		\"${phone_number}\", \"${email}\", \"${firstname}\", \"${lastname}\")`;
		pool.getConnection(function(error, connection){
			if(error)
				return reject(error);
			connection.query(user, function(err, rows, fields){
				connection.release();
				if(err)
					return reject(err);
				console.log('---------------------------------------------------');
				console.log(`User Residency for Record ${i+1}: ${residency}`);
				console.log(`User ${bool_selection} for Record ${i+1}: ${true}`);
				if(bool_selection == 'dormer'){
					console.log(`User Building for Record ${i+1}: ${building}`);
					console.log(`User Room Number for Record ${i+1}: ${room_number}`);
				}
				console.log(`User Address for Record ${i+1}: ${street}, ${city}, ${state}, ${zip}, ${country}`);
				console.log(`User Phone Number for Record ${i+1}: ${phone_number}`);
				console.log(`User Email for Record ${i+1}: ${email}`);
				console.log(`User First Name for Record ${i+1}: ${firstname}`);
				console.log(`User Last Name for Record ${i+1}: ${lastname}`);
				resolve(rows);
			});
		});
	});
}

//Seed the Database with Garage Records
function seedGarages(i){
	return new Promise(function(resolve, reject){
		let location = `${faker.address.streetAddress()}, Boca Raton, FL 33043`;
		let name = faker.company.companyName();
		let full_values = [true, false];
		let full = full_values[Math.round(Math.random()*1)];
		let free_spots = 0;
		let total_spots_values = [400, 500, 600];
		let total_spots = total_spots_values[Math.round(Math.random()*2)];

		let garage = `INSERT INTO garages(location, name, full, free_spots, total_spots) \
		VALUE(\"${location}\", \"${name}\", ${full}, ${free_spots}, ${total_spots})`;

		pool.getConnection(function(error, connection){
			if(error)
				return reject(error);
			connection.query(garage, function(err, rows, fields){
				if(err)
					return reject(err);
				console.log('---------------------------------------------------');
				console.log(`Garage Location for Record ${i+1}: ${location}`);
				console.log(`Garage Name for Record ${i+1}: ${name}`);
				console.log(`Garage Full Status for Record ${i+1}: ${full}`);
				console.log(`Garage Free Spots for Record ${i+1}: ${free_spots}`);
				console.log(`Garage Total Spots for Record ${i+1}: ${total_spots}`);
				resolve(rows);
			});
		});
	});
}

//Seed the Database with Event Records
function seedEvents(i){
	return new Promise(function(resolve, reject){
		let location = `${faker.lorem.words()} Hall, Boca Campus`;
		let dates_values = [faker.date.past(), faker.date.recent(), faker.date.future()];
		let date = dates_values[Math.round(Math.random()*2)];
		let start_date = date.toMysqlFormat();
		date.setHours(date.getHours() + 2);
		let end_date = date.toMysqlFormat();
		let description = faker.lorem.text();
		let host = faker.company.companyName();
		let user_ids = [];
		let submitted_user;
		let events;

		getFaculty().then(function(results){
			for(let i in results){
				user_ids[i] = results[i].id;
			}
			submitted_user = user_ids[Math.round(Math.random()*(user_ids.length-1))];
			events = `INSERT INTO events(location, start_date, end_date, description, host, submitted_user) \
			VALUE(\"${location}\", \"${start_date}\", \"${end_date}\", \"${description}\", \"${host}\", ${submitted_user})`;
			return events;
		}).then(function(query){
			pool.getConnection(function(error, connection){
				if(error)
					return reject(error);
				connection.query(query, function(err, rows, fields){
					connection.release();
					if(err)
						return reject(err);
					console.log('---------------------------------------------------');
					console.log(`Event Location for Record ${i+1}: ${location}`);
					console.log(`Event Start Date for Record ${i+1}: ${start_date}`);
					console.log(`Event End Date for Record ${i+1}: ${end_date}`);
					console.log(`Event Description for Record ${i+1}: ${description}`);
					console.log(`Event Host for Record ${i+1}: ${host}`);
					console.log(`Event Submitted User Id for Record ${i+1}: ${submitted_user}`);
					resolve(rows);
				});	
			});
		});
	});
}

//Seed the Database with Issue Records
function seedIssues(i){
	return new Promise(function(resolve, reject){
		let description = faker.lorem.text();
		let location_values = ['IVAS', 'IVAN', 'UVA 57', 'UVA 58', 'UVA 59', 'UVA 60', 
		'UVA 61', 'PAR', 'HPT', 'GPT', 'IRT', `${faker.lorem.words()} Hall, Boca Campus`];
		let location = location_values[Math.round(Math.random()*11)];
		let verified_values = [true, false, false, false];
		let verified = verified_values[Math.round(Math.random()*3)];
		let resolved_values = [true, false, false];
		let resolved = false;
		if(verified){
			resolved = resolved_values[Math.round(Math.random()*2)];
		}
		let submitted_user_values = [];
		let submitted_user;
		let verified_faculty_values = [];
		let verified_faculty = null;
		let resolved_faculty_values = [];
		let resolved_faculty = null;
		let foreign_keys = [];
		let issues

		getUsers().then(function(users_list){
			for(let i in users_list){
				submitted_user_values[i] = users_list[i].id;
			}
			submitted_user = submitted_user_values[Math.round(Math.random()*(submitted_user_values.length-1))];
			issues = `INSERT INTO issues(description, location, verified, resolved, submitted_user, verified_faculty, \
			resolved_faculty)	VALUE(\"${description}\", \"${location}\", ${verified}, ${resolved}, ${submitted_user},`;
			return;
		}).then(function(){
			return getFaculty();
		}).then(function(faculty_list){
			if(verified){ //You have this set to true fix it
				for(let i in faculty_list){
					verified_faculty_values[i] = faculty_list[i].id;
				}
				verified_faculty = verified_faculty_values[Math.round(Math.random()*(verified_faculty_values.length-1))];
				issues = issues.concat(` ${verified_faculty},`);
			}
			else{
				issues = issues.concat(' null,');
			}
			return;
		}).then(function(){
			return getFaculty();
		}).then(function(faculty_list2){
			if(resolved){ //You have this set to true fix it
				for(let i in faculty_list2){
					resolved_faculty_values[i] = faculty_list2[i].id;faculty_list2
				}
				resolved_faculty = resolved_faculty_values[Math.round(Math.random()*(resolved_faculty_values.length-1))];
				issues = issues.concat(` ${resolved_faculty})`);
			}
			else{
				issues = issues.concat(' null)');
			}
			return;
		}).then(function(){
			pool.getConnection(function(error, connection){
				if(error)
					return reject(error);
				connection.query(issues, function(err, rows, fields){
					connection.release();
					console.log('---------------------------------------------------');
					console.log(`Issue Description for Record ${i+1}: ${description}`);
					console.log(`Issue Location for Record ${i+1}: ${location}`);
					console.log(`Issue Verified for Record ${i+1}: ${verified}`);
					console.log(`Issue Resolved for Record ${i+1}: ${resolved}`);
					console.log(`Issue Submitted User Id for Record ${i+1}: ${submitted_user}`);
					console.log(`Issue Verified Faculty User Id for Record ${i+1}: ${verified_faculty}`);
					console.log(`Issue Resolved Faculty User Id for Record ${i+1}: ${resolved_faculty}`);
					resolve(0);
				});
			});
		});
	});
}

function loopSeedUsers(count){
	return new Promise(function(resolve, reject){
		for(let i = 0; i < count; i++){
			seedUsers(i).then(function(results){
				console.log(`User Record ${i+1} Created!`);
			}).catch(function(err){
				console.log(err);
			});
		}
		resolve();
	});
}

function loopSeedGarages(count){
	return new Promise(function(resolve, reject){
		for(let i = 0; i < count; i++){
			seedGarages(i).then(function(results){
				console.log(`Garage Record ${i+1} Created!`);
			}).catch(function(err){
				console.log(err);
			});
		}
		resolve();
	});
}

function loopSeedEvents(count){
	return new Promise(function(resolve, reject){
		for(let i = 0; i < count; i++){
			seedEvents(i).then(function(results){
				console.log(`Event Record ${i+1} Created!`);
			}).catch(function(err){
				console.log(err);
			});
		}
		resolve();
	});
}

function loopSeedIssues(count){
	return new Promise(function(resolve, reject){
		for(let i = 0; i < count; i++){
			seedIssues(i).then(function(results){
				console.log(`Issue Record ${i+1} Created!`);
			}).catch(function(err){
				console.log(err);
			});
		}
		resolve();
	});
}

function seedDatabase(){
	return new Promise(function(resolve, reject){
		loopSeedUsers(usersCount).then(loopSeedGarages(garagesCount)).then(loopSeedEvents(eventsCount))
		.then(loopSeedIssues(issuesCount)).then(function(){
			resolve();
		});
	});
}

seedDatabase().then(function(){
	console.log('Database has been Seeded!');
}).catch(function(err){
	console.log(err);
});