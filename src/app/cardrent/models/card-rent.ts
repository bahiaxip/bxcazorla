export class CardRent {
	//se podrían eliminar algunos que siempre van a comenzar null
	//y son necesarios después, por ejemplo selectedImage,numLevelFeedback,...
	constructor(
		public title:string,		
		public minPrice:string,
		public minNights:number,
		public minCapacity:number,
		public capacity:Array<number>,
		public capacities:Array<any>,
		public services:Array<string>,
		public images:Array<any>,
		public logo:string,
		public image:string,
		public selectedImage:string,		
		public type:Array<string>,
		public web:string,
		public phone:string,
		public numLevelFeedback:string,
		public numLevelLocation:number,
		public maps:string,
		public text:string,

	){

	}
}

//servicios:
//wifi
//A/A
//piscina
//restaurante
//spa
//bar(hotel)
//parking
//gimnasio
//mascotas
//fumar/no fumar
//TV

