var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userNoteSchema = new Schema({
    name: String,
    text: String,
    user: String
}, {collection: 'notes'});

module.exports = mongoose.model('UserNote', userNoteSchema);
