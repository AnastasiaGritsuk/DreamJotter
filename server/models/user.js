var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../../config').db;

var userSchema = new Schema ({
	username: String,
	password: String
}, {collection: 'users'});

module.exports = mongoose.createConnection(db).model('User', userSchema);