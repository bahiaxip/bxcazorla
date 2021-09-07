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

  public lista:any;
  public listTypeRent:Array<string>=[
    "casa","apartamento","bungalow","cabaña","piso","hotel"
  ];
  public selectCapacity:any;
  public listCapacity:any;
  public capacity=new FormControl();
  public type = new FormControl();
  public formCardRent = new FormGroup({
    name: new FormControl('',[Validators.required]),
    minNights: new FormControl('',[Validators.required]),
  //pasamos capacity mediante la directiva FormControl en lugar del
    //atributo FormControlName
    //capacity:new FormControl(),
  //pasamos capacity mediante la directiva FormControl en lugar del
    //atributo FormControlName  
    //type:new FormControl('',[Validators.required]),
    web: new FormControl(''),
    phone: new FormControl('',Validators.required),
    maps: new FormControl('',Validators.required),
    text: new FormControl(''),
    //logo: new FormControl(''),
    //image: new FormControl(''),
    images: new FormControl(''),
  })
  @ViewChild('slidercardrent',{static:true}) private slidercardrent!:ElementRef; 
  constructor() {
    this.lista=[...Array(10).keys()];
    this.lista.shift();
  }

  onSubmit(){

  }

  misectionHorizontal(size:string){
    console.log("llega al misectionHorizontal")
    this.slidercardrent.nativeElement.style.transform="translateX(-"+size+")";
    //console.log(this.midivslider);
    //this.midivslider.nativeElement.style.transform="translateX(-"+size+")";
  }
  misectionHorizontal2(size:string){
    console.log("llega al misectionHorizontal2")
    this.slidercardrent.nativeElement.style.transform="translateX(0px)";
    //console.log(this.midivslider);
    //this.midivslider.nativeElement.style.transform="translateX(-"+size+")";
  }

  addCapacity(data:any){
    if(data){
      console.log(data)
    }
  }
}
