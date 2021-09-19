import { Component,Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup,FormControl,Validators, FormArray } from '@angular/forms';
//import { MatAccordion } from '@angular/material/expansion';
@Component({
  selector: 'pre-cardrent',
  templateUrl: './cardrent.component.html',
  styleUrls: ['./cardrent.component.css']
})
export class CardrentComponent{
  @Input()
  firstwidth:any;

  //switch para modal imagen no válida
  public switchModal:boolean=false;
  public panelSelected:string='center';

  
  
  @ViewChild('slidercardrent',{static:true}) private slidercardrent!:ElementRef; 
  constructor() {
    
  }

  ngOnInit(){
    window.addEventListener("resize",(e)=>{
      let slidercardrentStyle = this.slidercardrent.nativeElement.style

      console.log("hola: ",slidercardrentStyle.transform)
      //this.slidercardrent.nativeElement.scrollTop=0;
//si no es el de en medio pasamos automáticamente al derecho, necesario cambiar al añadir otro panel
      if(this.panelSelected=='center')        
        this.misectionHorizontal(this.firstwidth+'px','0s','center');
      else if(this.panelSelected=='right')
        this.misectionHorizontal(this.firstwidth+'px','0s','right');        
      else if(this.panelSelected=='left')
        this.misectionHorizontal(this.firstwidth+'px','0s','left');
      else
        this.misectionHorizontal(this.firstwidth+'px','0s','center');
    });
  }

  setModal(sw:boolean){
    this.switchModal=sw;
  }
  misectionHorizontal(size:string,duration:string,side:string){
    this.slidercardrent.nativeElement.style.transitionDuration=duration;
    console.log(this.slidercardrent.nativeElement.style.transform);
    this.panelSelected=side;
    if(side=="left")
      this.slidercardrent.nativeElement.style.transform="translateX("+size+")";
    else if(side=="center")
      this.slidercardrent.nativeElement.style.transform="translateX(0px)";
    else if(side == "right")
      this.slidercardrent.nativeElement.style.transform="translateX(-"+size+")";
    console.log(this.slidercardrent.nativeElement.style.transform);  
    

  }
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

  
}
