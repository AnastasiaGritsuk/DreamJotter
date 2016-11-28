var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var userSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	hashedPassword: {
		type: String,
		required: true
	},
	salt: {
		type: String,
		required: true
	}
}, {
	collection: 'users'
});

userSchema.methods.encryptPassword = function (password) {
	return crypto.createHmac('sha1', this.salt).
		update(password).
		digest('hex');
};

userSchema.virtual('password')
	.set(function (password) {
		this._plainPassword = password;
		this.salt = Math.round((new Date().valueOf() * Math.random())) + '';
		this.hashedPassword = this.encryptPassword(password);
	})
	.get(function () {
		return this._plainPassword;
	});

userSchema.methods.checkPassword = function (password) {
	return this.encryptPassword(password) === this.hashedPassword;
};

module.exports = mongoose.model('User', userSchema);
