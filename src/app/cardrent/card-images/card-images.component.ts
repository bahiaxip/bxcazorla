import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pre-card-images',
  templateUrl: './card-images.component.html',
  styleUrls: ['./card-images.component.css']
})
export class CardImagesComponent implements OnInit {

  @Input()
  selectedCard:any;
  @Input()
  myHeight:any;
  @Input()
  myHeight2:any;
  @Output() emitHeight=new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  hideImagesCard(type:string){
    //this.fixedCloseGal=false;
    if(type=="images"){
      if(this.myHeight != "0")
        this.myHeight="0";
      if(this.myHeight2 != "0")
        this.myHeight2 = "0";
    }else if(type == "open_maps"){
      if(this.myHeight2 != "0")
        this.myHeight2="0";        
    }
    console.log("antes del emit")
    this.emitHeight.emit({myHeight:this.myHeight,myHeight2:this.myHeight2})
    console.log("type es: ",type)
    console.log("myHeight: ",this.myHeight)
    console.log("myHeight2: ",this.myHeight2)
  }

  

}
