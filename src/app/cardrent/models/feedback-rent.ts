export class FeedbackRent {
	constructor(
		public nick:string,
		public email:string|null,
		public feedback:number,		
		public text:string,
		public rentId:string|null

	){ }
}