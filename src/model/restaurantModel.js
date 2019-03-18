const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	phone_number: String,
	Rating: Number,
	price_level: Number,
	website: String,
	photo: String,
	icon: String,
	google_map_url: String,
	Location: {
		Lat: Number,
		Lng: Number
	},
	Opening_hours: [ String ]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
