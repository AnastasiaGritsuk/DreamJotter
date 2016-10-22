var DefaultUser = require('../server/models/user');

function createUser() {
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