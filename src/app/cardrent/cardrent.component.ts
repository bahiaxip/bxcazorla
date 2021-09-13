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

  
  @ViewChild('slidercardrent',{static:true}) private slidercardrent!:ElementRef; 
  constructor() {
    
  }

  ngOnInit(){
    
    window.addEventListener("resize",(e)=>{
      let slidercardrentStyle = this.slidercardrent.nativeElement.style
      console.log("hola: ",this.slidercardrent.nativeElement.scrollY)
      //this.slidercardrent.nativeElement.scrollTop=0;
//si no es el de en medio pasamos automáticamente al derecho, necesario cambiar al añadir otro panel
      if(!slidercardrentStyle.transform || slidercardrentStyle.transform == "translateX(0px)"){
        console.log("entra en window: ",window.scrollY)
        this.misectionHorizontal(this.firstwidth+'px','0s','center');
      }else if(slidercardrentStyle.transform && slidercardrentStyle.transform=="translateX("+this.firstwidth+"px)"){
        this.misectionHorizontal(this.firstwidth+'px','0s','right');        
      }else{
        this.misectionHorizontal(this.firstwidth+'px','0s','left');
      }
    });
  }

  setModal(sw:boolean){
    this.switchModal=sw;
  }
  misectionHorizontal(size:string,duration:string,side:string){
    this.slidercardrent.nativeElement.style.transitionDuration=duration;
    if(side=="left")
      this.slidercardrent.nativeElement.style.transform="translateX("+size+")";
    else if(side=="center")
      this.slidercardrent.nativeElement.style.transform="translateX(0px)";
    else if(side == "right")
      this.slidercardrent.nativeElement.style.transform="translateX(-"+size+")";    

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
