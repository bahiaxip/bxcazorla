'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PricerentSchema = Schema({	
	capacity:Number,
	minNight:Number,
	extraNight:Number,
	rentId:Schema.Types.ObjectId	

})

module.exports = mongoose.model("Pricerent", PricerentSchema);