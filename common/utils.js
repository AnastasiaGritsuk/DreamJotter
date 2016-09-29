var mongoose = require('mongoose');
var User = require('../server/models/user');

function btoa(str) {
    if (!str || Buffer.byteLength(str) !== str.length)
        return 'bad string';
    
    return Buffer(str, 'binary').toString('base64');
}

function createUser(db, username, pwd) {
    mongoose.connect(db);
    var newUser = {
        username:  username,
        password: pwd
    };
    
    var defaultUser = new User(newUser);
    defaultUser.save();
}

module.exports = {
    btoa:btoa,
    createUser:createUser
}