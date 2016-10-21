var DefaultUser = require('../server/models/user');

function createUser() {
    console.log('xxx');
    DefaultUser.count(function (err, count) {
        if (!err && count === 0) {
            var user = {
                username: 'admin',
                password: 'admin'
            }

            var user = new DefaultUser(user);
            user.save();
        }
    });
}

module.exports = createUser;