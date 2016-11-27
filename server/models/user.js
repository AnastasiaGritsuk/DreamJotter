var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var userSchema = new Schema ({
	username: String,
	password: {type:String, set: passFn}
}, {collection: 'users'});

function passFn(password) {
	this.salt = makeSalt();
	this.hashed_password = encryptPassword(password);
	
	return this.hashed_password;

}

userSchema.methods.encryptPassword = function (password) {
	return crypto.createHmac('sha1', this.salt).
		update(password).
		digest('hex');
};

userSchema.methods.makeSalt = function () {
	return Math.round((new Date().valueOf() * Math.random())) + '';
};

userSchema.methods.authenticate = function(plainText) {
	return this.encryptPassword(plainText) === this.hashed_password;
}

module.exports = mongoose.model('User', userSchema);
