import { animate, state, style, transition, trigger,keyframes } from '@angular/animations';

export const slider = 
	//anulado trigger
	trigger("fadeIn",[
			/*
			transition(":enter",[
				style({ transform:'translate(-100%,0)' }),				
				
				animate("500ms linear",keyframes([
					style({ transform:'translate(-100%,0)',offset:0.2 }),
					style({ transform:'translate(0,0)',offset:1 })
				])
					
				)
			]),
			transition(":leave",[
				style({
					transform:'translate(0,0)'
				}),
				animate("100ms linear",
					style({	transform:'translate(100%,0)'})
				)
			]),
			*/	
		/*
		transition(':enter',[
			animate('1s',keyframes([		
				style({ transform: 'translate(0,0)', offset: 0}),		
    			style({ transform: 'translate(-110%,0)', offset: 0.5}),    			
    			style({ transform: 'translate(0,0)', offset: 1.0})	
			]))
		]),
		
		
		transition(':leave',[
			animate('2s',keyframes([
				style({ transform: 'translate(0,0)', offset: 0}),
    			style({ transform: 'translate(-100%,0)', offset: 0.5}),
    			style({ transform: 'translate(0,0)', offset: 1.0})	
			]))
		]),
		*/
	]);
export const slider2 = 
	trigger("switchDetail",[
			//state('true',style({opacity:0})),
			state('true',style({transform:'translate(0,0)'})),
			state('false',style({transform:'translate(-110%,0)'})),

			//state('false',style({opacity:1})),
			//transition('*<=>true',animate(300)),
			//transition('true<=>false',animate(300))
			//con * al cargar la primera vez realiza tb el efecto 
			transition('*<=>true',animate('300ms ease-out')),
			transition('true<=>false',animate('300ms ease-out'))		
	]);