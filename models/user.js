var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema ({
	username: String,
	password: String,
	securityToken: String
}, {collection: 'users'});

module.exports = mongoose.model('User', userSchema);