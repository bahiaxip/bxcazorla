"use strict"
var CardRent = require('../models/cardrent');
var PriceRent=require('../models/pricerent');
var controller = {
	hola:(req,res) => {
		
		return res.status(200).send({message: "hola"})
	},
	saveCardRent:(req,res) => {
		var params = req.body;
		//req._body (indica que existe objecto body (de bodyParser))
		if(req._body){
			console.log(req._body)	
		}
		
		if(!params || !params.title || !params.capacity || !params.type || !params.phone) 
			return res.status(200).send({message: "Faltan datos",status:"error"});
		var cardrent = new CardRent();
		

		console.log("el array: ",typeof(params.capacity))
		cardrent.title=params.title;
		if(params.title){
			let data=checkString(params.title);
			console.log("test string: ",data);
		}
		//para las pruebas en postman generar un array mediante repetición del parámetro
		if(Array.isArray(params.capacity)){			
			cardrent.capacity=params.capacity;
		}
		//pricerent.minNight = params.capacity[0];
		params.pricerents.maps((num)=> {
			var pricerent=new PriceRent();
			pricerent.capacity=params.capacity;
			if(params.type.length==1){
				pricerent.type=params.type;	
			}else{

			}
			
			pricerent.minNight=
		})
		
			cardrent.minPrice=null;
			cardrent.minNights=null;
			cardrent.minCapacity=null;		
		cardrent.logo=null;
		cardrent.image=null;
		cardrent.images = null;
		cardrent.thumbnail=null;
		if(Array.isArray(params.type)){
			cardrent.type=params.type;
		}
		
		cardrent.web=params.web;
		cardrent.phone=params.phone;
			cardrent.numLevelFeedback=null;
		cardrent.numLevelLocation=0;
		cardrent.maps=params.maps;
		cardrent.text=params.text
		return res.status(200).send({cardrent})		

	},
	getCard:(req,res) => {

	},
	getCards:(req,res) => {

	},
	

	
}
function checkString(value){
	return typeof value === 'string' || value instanceof String;
}

module.exports = controller;