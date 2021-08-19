export class CardRent {
	constructor(
		public title:string,
		public minPrice:string,
		public minNight:string,
		public logo:string,
		public image:string,
		public listImages:Array<string>,
		public type:string,
		public web:string,
		public phone:string,
		public numLevelFeedback:string,
		public numLevelLocation:number,
		public maps:string,
		public text:string
	){

	}
}