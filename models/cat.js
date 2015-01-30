var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CatSchema = new Schema({
	age: Number,
	name: String,
	colors: [String],
	image: String
});

module.exports = mongoose.model('cat', CatSchema);