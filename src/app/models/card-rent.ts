export class CardRent {
	constructor(
		public title:string,		
		public minPrice:string,
		public minNights:number,
		public minCapacity:number,
		public capacity:Array<number>,
		public logo:string,
		public image:string,
		public listImages:Array<string>,
		public type:Array<string>,
		public web:string,
		public phone:string,
		public numLevelFeedback:string,
		public numLevelLocation:number,
		public maps:string,
		public text:string
	){

	}
}