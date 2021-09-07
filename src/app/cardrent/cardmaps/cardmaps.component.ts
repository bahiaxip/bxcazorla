import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pre-cardmaps',
  templateUrl: './cardmaps.component.html',
  styleUrls: ['./cardmaps.component.css']
})
export class CardmapsComponent implements OnInit {

  @Input()
  maxWidthBannerp3:any;
  @Input()
  myHeight:any;
  @Input()
  myHeight2:any;
  @Output()
  emitHeight=new EventEmitter();
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
    this.emitHeight.emit({myHeight:this.myHeight,myHeight2:this.myHeight2})
    console.log("type es: ",type)
    
  }
}
