// create connection, call ./usernp
const mongoose = require('mongoose');

module.exports.connect = (uri) => {
	mongoose.connect(uri);

	mongoose.connection.on('error', (err) => {
		console.rror('Mongoose connection error: ${err}');
		process.exit(1);
	});

	require('./user');
}