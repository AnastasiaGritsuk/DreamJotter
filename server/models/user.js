var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var userSchema = new Schema ({
	username: String,
	password: {
		type: String, set: passFn}
}, {collection: 'users'});

function passFn(password) {
	userSchema.salt = this.makeSalt();
	return this.encryptPassword(password);
}

userSchema.virtual('salt').set(function (salt) {
	this.salt = salt;
});

userSchema.methods.encryptPassword = function (password) {
	console.log(userSchema.salt);
	return crypto.createHmac('sha1', userSchema.salt).
		update(password).
		digest('hex');
};

userSchema.methods.makeSalt = function () {
	return Math.round((new Date().valueOf() * Math.random())) + '';
};

// userSchema.methods.authenticate = function(plainText) {
// 	return this.encryptPassword(plainText) === this.hashed_password;
// }

module.exports = mongoose.model('User', userSchema);
