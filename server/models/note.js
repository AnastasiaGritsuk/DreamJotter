var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function (db) {
    var userNoteSchema = new Schema({
        name: String,
        text: String,
        user: String
    }, {collection: 'notes'});

    return mongoose.createConnection(db).model('UserNote', userNoteSchema);
}