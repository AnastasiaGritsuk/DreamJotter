var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('./config').db;

var prodConn = mongoose.createConnection(db.prod);
var testConn = mongoose.createConnection(db.test);

var UserProd = prodConn.model('User', new Schema ({
    username: String,
    password: String
}));

var UserTest = testConn.model('User', new Schema ({
    username: String,
    password: String
}));


function btoa(str) {
    if (!str || Buffer.byteLength(str) !== str.length)
        return 'bad string';
    
    return Buffer(str, 'binary').toString('base64');
}

function createUser() {
    //create conn
    //check db

    UserProd.count(function (err, count) {
        if (!err && count === 0) {
            console.log('prodtxxx');
            var defaultUser = {
                username: 'admin',
                password: 'admin'
            }
            
            var user = new UserProd(defaultUser);
            user.save();
        }
    });

    UserTest.count(function (err, count) {
        if (!err && count === 0) {
            console.log('testxxx');
            var defaultUser = {
                username: 'test',
                password: 'test'
            }

            var user = new UserTest(defaultUser);
            user.save();
        }
    });

}

module.exports = {
    btoa:btoa,
    createUser:createUser
}