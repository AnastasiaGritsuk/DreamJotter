var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../../config').db;

var userNoteSchema = new Schema({
    name: String,
    text: String,
    user: String
}, {collection: 'notes'});

module.exports = mongoose.createConnection(db).model('UserNote', userNoteSchema);
