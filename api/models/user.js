'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName	: {	type: String },
	lastName	: {	type: String },
	phone		: {	type: String },
	email		: {	type: String },
	password	: {	type: String },
	createdDate	: {	type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);