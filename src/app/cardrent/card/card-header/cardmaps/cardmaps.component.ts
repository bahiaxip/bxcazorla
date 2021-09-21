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

  public maps:any;
  constructor() { }

  ngOnInit(): void {
    let maps="https://maps.googleapis.com/maps/api/distancematrix/json"+
  "?destinations=40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626"+
  "&origins=40.6655101%2C-73.89188969999998";
  this.maps=maps;
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
