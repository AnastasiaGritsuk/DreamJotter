var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../../config').db;

var userSchema = new Schema ({
	username: String,
	password: String
}, {collection: 'users'});

module.exports = {
	prod: mongoose.createConnection(db.prod).model('User', userSchema),
	test: mongoose.createConnection(db.test).model('User', userSchema)
}