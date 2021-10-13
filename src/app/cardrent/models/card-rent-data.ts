import { CardRent } from './card-rent';

export var CardRentData ={
	midata:[
		new CardRent(
			"Apartamentos Martín",
			"210",
			3,
			2,
			[2,4,6],
			[
				{capacity:2,type:"cabaña",minNights:3,priceBase:210,priceNight:70},
				{capacity:4,type:"casa",minNights:3,priceBase:240,priceNight:80},
				{capacity:6,type:"casa",minNights:3,priceBase:285,priceNight:95}
			],
			[
				"mascotas","wifi","parking","piscina","tv","chimenea","aa","calefacción"
			],
			[
				"ap_martin/ap_martin1.jpg","ap_martin/ap_martin2.jpg","ap_martin/ap_martin3.jpg","ap_martin/ap_martin4.jpg","ap_martin/ap_martin5.jpg",
			 	"ap_martin/ap_martin6.jpg","ap_martin/ap_martin7.jpg","ap_martin/ap_martin8.jpg","ap_martin/ap_martin9.jpg","ap_martin/ap_martin10.jpg","ap_martin/ap_martin11.jpg"
			],
			"logo",
			"imagen",
			"",
			[
				"casa","apartamento"
			],
			"https://complejomartinparquenatural.com/",
			"953 72 71 06",
			"numLevelFeedback",
			5,
			`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233.85519134428822!2d-2.9211114054571503!3d37.94519552117723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6f081eef9117dd%3A0x159f702ce3131be7!2sApartamentos%20Mart%C3%ADn!5e0!3m2!1ses!2sus!4v1633715429667!5m2!1ses!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`,
			`Apartamentos Martín se encuentra ubicado en Arroyo Frío, en el parque natural 
			de Cazorla,dispone de apartamentos, casas rurales y cabañas. Los alojamientos están equipados
			con lavadora, frigorífico, microondas, televisión, aire acondicionado, además de los
			útiles de cocina como tostador, sartenes, cafetera,etc... `
		),

		new CardRent(
			"Residencial Los Robles",
			"90",
			1,
			2,
			[2,4,6],
			[
				{capacity:2,type:"casa",minNights:2,priceBase:140,priceNight:60},
				{capacity:4,type:"casa",minNights:2,priceBase:180,priceNight:90},
				{capacity:6,type:"casa",minNights:2,priceBase:230,priceNight:115},
			],
			[	
				"chimenea","calefacción","tv","mascotas","wifi","piscina"
			],
			[
				"resrobles/resrobles1.jpg","resrobles/resrobles2.jpg","resrobles/resrobles3.jpg","resrobles/resrobles4.jpg","resrobles/resrobles5.jpg",
				"resrobles/resrobles6.jpg","resrobles/resrobles7.jpg","resrobles/resrobles8.jpg","resrobles/resrobles9.jpg",
				"resrobles/casa_robles1.jpg","resrobles/casa_robles2.jpg","resrobles/casa_robles3.jpg","resrobles/casa_robles4.jpg",
				"resrobles/ap_robles1.jpg","resrobles/ap_robles2.jpg","resrobles/ap_robles3.jpg","resrobles/ap_robles4.jpg"
			],
			"logo",
			"imagen",
			"",
			[
				"casa","apartamento","parking"
			],
			"https://www.residenciallosrobles.com/",
			"953 72 71 77",
			"numLevelFeedback",
			4,
			`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3146.243986209853!2d-2.9232137842531114!3d37.94808867972833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6f081937697db5%3A0x2cb434b0492ec5f8!2sResidencial%20Los%20Robles!5e0!3m2!1ses!2ses!4v1633715319631!5m2!1ses!2ses" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`,
			`Residencial Los Robles es un complejo turístico compuesto por casas rurales y 
			apartamentos. 
			- Casa rural: 
				Las casas disponen de una superfície de más de 100 metros cuadrados divididos en 2 plantas:
					- La planta baja está compuesta por cocina, comedor,baño y terraza individual.
					- La planta alta se compone de 3 habitaciones, baño y trastero.
				Estas casas son recomendables para 6 personas aunque pueden albergar hasta un máximo de 8.
				Los apartamentos están clasificados en dos tipos: 
			
			- Apartamento para 4 personas: Compuesto por salón con chimenea y cocina americana, baño, 2 dormitorios y terraza compartida.
			- Apartamento para 2 personas: Compuesto por salón con chimenea y cocina americana, baño y 1 dormitorio.
			Los apartamentos de 2 personas permiten albergar hasta un máximo de 3 personas mediante un suplemento.
			Residencial Los Robles dispone de recepción en el Hotel Balneario que se encuentra a 500 metros del alojamiento.`
		),			
		new CardRent(
			"Los Enebros",
			"80",
			1,
			2,
			[2,4,6,8,12],
			[
				{capacity:2,type:"casa",minNights:2,priceBase:80,priceNight:150},
				{capacity:5,type:"casa",minNights:2,priceBase:110,priceNight:200},
				{capacity:6,type:"casa",minNights:2,priceBase:132,priceNight:232},
				{capacity:8,type:"casa",minNights:2,priceBase:150,priceNight:260},
				{capacity:12,type:"casa",minNights:2,priceBase:183,priceNight:300},
			],
			[
				"mascotas","aa","restaurante","cafetería","piscina","wifi","tv","parking"
			],
			[
				"losenebros/enebros1.jpg","losenebros/enebros2.jpg","losenebros/enebros3.jpg","losenebros/enebros4.jpg","losenebros/enebros5.jpg",
				"losenebros/enebros6.jpg","losenebros/enebros7.jpg","losenebros/enebros8.jpg","losenebros/enebros9.jpg","losenebros/enebros10.jpg","losenebros/enebros11.jpg",
				"losenebros/enebros12.jpg","losenebros/enebros13.jpg","losenebros/enebros14.jpg","losenebros/enebros15.jpg","losenebros/enebros16.jpg","losenebros/enebros17.jpg",
				"losenebros/enebros18.jpg","losenebros/enebros19.jpg","losenebros/enebros20.jpg","losenebros/enebros21.jpg","losenebros/enebros22.jpg"
			],
			"logo",
			"imagen",
			"",
			[
				"apartamento","bungalow"
			],
			"https://www.hotelenebroscazorla.com/",
			"953 72 71 10",
			"numLevelFeedback",
			3,
			`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d786.5439443235771!2d-2.921674582836118!3d37.949681493641904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x5b6029e56856cd9c!2sApartamentos%20Los%20Enebros%20-%20Caba%C3%B1as%20de%20Madera!5e0!3m2!1ses!2ses!4v1633715586908!5m2!1ses!2ses" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`,
			"texto"),
		new CardRent(
			"Los pinos",
			"220",
			3,
			2,
			[4],
			[
				{capacity:4,type:"bungalow",minNights:5,priceBase:675,priceNight:120},
			],
			[
				"piscina","tv","wifi","aa","calefacción"
			],
			[
				"cab_lospinos/lospinos1.jpg","cab_lospinos/lospinos2.jpg","cab_lospinos/lospinos3.jpg","cab_lospinos/lospinos4.jpg","cab_lospinos/lospinos5.jpg",
				"cab_lospinos/lospinos6.jpg","cab_lospinos/lospinos7.jpg","cab_lospinos/lospinos8.jpg","cab_lospinos/lospinos9.jpg","cab_lospinos/lospinos10.jpg",
				"cab_lospinos/lospinos11.jpg","cab_lospinos/lospinos12.jpg","cab_lospinos/lospinos13.jpg","cab_lospinos/lospinos14.jpg"
			],
			"logo",
			"imagen",
			"",
			[
				"cabaña"
			],
			"ND",
			"953 72 70 07",
			"numLevelFeedback",
			5,
			`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3146.304064728463!2d-2.9239682846773865!3d37.946685679728546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6f081ebb72ec31%3A0xe1dc14a5d2c701ee!2sCaba%C3%B1as%20de%20Madera%20Los%20Pinos!5e0!3m2!1ses!2ses!4v1633715634057!5m2!1ses!2ses" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`,
			`Cabañas de madera Los pinos ofrece cabañas de madera para 4 personas.
			Estas cabañas están compuestas de 2 dormitorios, salón con cocina americana y baño.
			Acceso a aparcamiento, barbacoa y piscina.`

		),
		new CardRent(
			"Alojamiento Valeria",
			"306",
			3,
			2,
			[4],
			[
				{capacity:4,type:"apartamento",minNights:2,priceBase:170,priceNight:80},
			],
			[
				"wifi", "aa","calefacción", "chimenea","tv","piscina","videoconsola"
			],
			[
				"al_valeria/al_valeria1.jpg","al_valeria/al_valeria2.jpg","al_valeria/al_valeria3.jpg","al_valeria/al_valeria4.jpg","al_valeria/al_valeria5.jpg",
				"al_valeria/al_valeria6.jpg","al_valeria/al_valeria7.jpg","al_valeria/al_valeria8.jpg","al_valeria/al_valeria9.jpg",
			],
			"logo",
			"imagen",
			"",
			[
			"casa"
			],
			"ND",
			"608 02 69 64",
			"numLevelFeedback",
			5,
			`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3146.304064728463!2d-2.9239682846773865!3d37.946685679728546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6f081ebb72ec31%3A0xe1dc14a5d2c701ee!2sCaba%C3%B1as%20de%20Madera%20Los%20Pinos!5e0!3m2!1ses!2ses!4v1633715634057!5m2!1ses!2ses" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`,
			`Alojamiento Valeria dispone de 2 dormitorios,  baño, salón y cocina.
			Este apartamento cuenta con chimenea de leña, piscina, televisión, acceso a wifi, Play Station y acceso a Amazon Prime.`
		),
		/*
		new CardRent("Alojamiento Valeria",
			"306",
			"3",
			"logo",
			"imagen",
			"casa",
			"ND",
			"608 02 69 64",
			"numLevel",
			"https://www.google.es/maps/place/alojamiento+valeria/@37.9461625,-2.923922,17z/data=!4m12!1m6!3m5!1s0xd6f09ae733c8ff9:0x8f476a24eb109bce!2salojamiento+valeria!8m2!3d37.9461548!4d-2.9217339!3m4!1s0xd6f09ae733c8ff9:0x8f476a24eb109bce!8m2!3d37.9461548!4d-2.9217339",
			"texto"),
		*/
 	]

}