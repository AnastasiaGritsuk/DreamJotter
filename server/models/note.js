var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../../common/config').db;

var userNoteSchema = new Schema({
    name: String,
    text: String,
    user: String
}, {collection: 'notes'});

module.exports = {
    prod: mongoose.createConnection(db.prod).model('UserNote', userNoteSchema),
    test: mongoose.createConnection(db.test).model('UserNote', userNoteSchema)
};