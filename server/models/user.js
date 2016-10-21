var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function (db) {
	var userSchema = new Schema ({
		username: String,
		password: String
	}, {collection: 'users'});

	return mongoose.createConnection(db).model('User', userSchema);
}