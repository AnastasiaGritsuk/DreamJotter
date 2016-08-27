// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
//
// var schema = new Schema({
// 	name: {type: String, required: true},
// 	text: {type: String, required: true},
// 	user: {type: Schema.Types.ObjectId, ref: 'User'}
// });

function Note(name, text) {
    this.name = name;
    this.text = text
}

module.exports = Note;