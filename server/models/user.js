var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

function passwordFn(pwd) {
	return encryptPassword(pwd);
}

function makeSalt() {
	return Math.round((new Date().valueOf() * Math.random())) + '';
}

function encryptPassword(pwd) {
	return crypto.createHmac('sha1', makeSalt()).
		update(pwd).
		digest('hex');
}

var userSchema = new Schema ({
	username: String,
	password: {type: String, set: passwordFn}
}, {collection: 'users'});

module.exports = mongoose.model('User', userSchema);
