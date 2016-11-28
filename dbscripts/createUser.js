var User = require('../server/models/user');

function createUser() {
    User.count(function (err, count) {
        if (!err && count === 0) {
            var user = new User({username: 'admin', password: 'admin'});
            user.save(function (err, doc) {
                console.log(err);
            });
        }
    });
}

module.exports = createUser;