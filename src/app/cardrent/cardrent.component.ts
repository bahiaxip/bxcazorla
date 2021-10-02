import { Component,Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup,FormControl,Validators, FormArray } from '@angular/forms';
//import { MatAccordion } from '@angular/material/expansion';
import { CardrentService } from './services/cardrent.service';
import { CardService } from '../services/card.service';

@Component({
  selector: 'pre-cardrent',
  templateUrl: './cardrent.component.html',
  styleUrls: ['./cardrent.component.css']
})
export class CardrentComponent{
  @Input()
  firstwidth:any;

  //switch para modal imagen no válida
  public switchModalNewCard:boolean=false;
  public textModal:string="";
  public panelSelected:number=1;

  private subscriptionPanel:any;

  public formFeed = new FormGroup({
    nick:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
    text:new FormControl('',[Validators.required,Validators.minLength(3)]),
  })
  
  @ViewChild('slidercardrent',{static:true}) private slidercardrent!:ElementRef; 
  constructor(
    private _cardrentService:CardrentService,
    private _cardService:CardService
  ) {
    
  }
  ngOnInit(){ 

    //suscription slider panels
    this.subscriptionPanel = this._cardService.panel$.subscribe(()=> {
      let section=this._cardService.getSection();
//cambiar número si se cambia el section
      console.log(section)
      console.log("llega al suscription")
      if(section==3){
        //let selectedPanel = this._cardrentService.getPanel();
        let panel=this._cardService.getPanel();
        this.sendToPanel(this.firstwidth+'px','1s',panel);      
      }      
    })
    //resize
    window.addEventListener("resize",(e)=>{
      let slidercardrentStyle = this.slidercardrent.nativeElement.style

      //console.log("hola: ",slidercardrentStyle.transform)
      //this.slidercardrent.nativeElement.scrollTop=0;
//si no es el de en medio pasamos automáticamente al derecho, necesario cambiar al añadir otro panel
      if(this.panelSelected==1)        
        this.sendToPanel(this.firstwidth+'px','0s',1);
      else if(this.panelSelected==2)
        this.sendToPanel(this.firstwidth+'px','0s',2);        
      else if(this.panelSelected==0)
        this.sendToPanel(this.firstwidth+'px','0s',0);
      else
        this.sendToPanel(this.firstwidth+'px','0s',1);
    });
  }

  setModal(data:any){
    this.switchModalNewCard=data.value;
    this.textModal=data.text;
  }
  //mover al panel indicado
  sendToPanel(size:string,duration:string,side:number){
    this.slidercardrent.nativeElement.style.transitionDuration=duration;
    //console.log(this.slidercardrent.nativeElement.style.transform);
    this.panelSelected=side;
    if(side==0)
      this.slidercardrent.nativeElement.style.transform="translateX("+size+")";
    else if(side==1)
      this.slidercardrent.nativeElement.style.transform="translateX(0px)";
    else if(side ==2)
      this.slidercardrent.nativeElement.style.transform="translateX(-"+size+")";
  }
  /*
  misectionHorizontal(size:string,duration:string,side:string){
    this.slidercardrent.nativeElement.style.transitionDuration=duration;
    //console.log(this.slidercardrent.nativeElement.style.transform);
    this.panelSelected=side;
    if(side=="panel-left")
      this.slidercardrent.nativeElement.style.transform="translateX("+size+")";
    else if(side=="center")
      this.slidercardrent.nativeElement.style.transform="translateX(0px)";
    else if(side == "right")
      this.slidercardrent.nativeElement.style.transform="translateX(-"+size+")";
  }
  */
  /*  
  misectionHorizontalLeft(size:string,duration:string){
    this.slidercardrent.nativeElement.style.transitionDuration=duration;
    console.log("llega al misectionHorizontal: ",this.slidercardrent.nativeElement.style.transform)
    this.slidercardrent.nativeElement.style.transform="translateX("+size+")";
    //this.slidercardrent.nativeElement.style.left="-"+size+")";
    //console.log(this.midivslider);
    //this.midivslider.nativeElement.style.transform="translateX(-"+size+")";
  }
  misectionHorizontalRight(size:string,duration:string){
    this.slidercardrent.nativeElement.style.transitionDuration=duration;
    console.log("llega al misectionHorizontal: ",this.slidercardrent.nativeElement.style.transform)
    this.slidercardrent.nativeElement.style.transform="translateX(-"+size+")";
    //console.log(this.midivslider);
    //this.midivslider.nativeElement.style.transform="translateX(-"+size+")";
  }
  misectionHorizontalMid(size:string,duration:string){
    this.slidercardrent.nativeElement.style.transitionDuration=duration;
    console.log("llega al misectionHorizontal2")
    this.slidercardrent.nativeElement.style.transform="translateX(0px)";
    //console.log(this.midivslider);
    //this.midivslider.nativeElement.style.transform="translateX(-"+size+")";
  }
  */

  
}
