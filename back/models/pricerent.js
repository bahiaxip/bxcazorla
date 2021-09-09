'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PricerentSchema = Schema({	
	capacity:Number,
	type:String,
	minNights:Number,
	priceBase:Number,
	priceExtraNight:Number,
	rentId:Schema.Types.ObjectId	

})

module.exports = mongoose.model("Pricerent", PricerentSchema);