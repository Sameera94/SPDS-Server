'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
	deliveryFrom : { type: String },
	deliveryTo	 : { type: String },
	deliveryDate : { type: String },
	title		 : { type: String },
	description	 : { type: String },
	user		 : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	createdDate	 : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);