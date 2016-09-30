var UserProd = require('../server/models/user').prod;
var UserTest = require('../server/models/user').test;

function createUser() {
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
    createUser: createUser
}