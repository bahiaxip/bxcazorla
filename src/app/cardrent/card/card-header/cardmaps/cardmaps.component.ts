import { Component, OnInit,Input,Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CardrentService } from '../../../services/cardrent.service';
@Component({
  selector: 'pre-cardmaps',
  templateUrl: './cardmaps.component.html',
  styleUrls: ['./cardmaps.component.css']
})
export class CardmapsComponent implements OnInit {

  @Input()
  maxWidthBannerp3:any;
  public subscriptionMaps:any;
  public subscriptionHeight:any;
  public maps:any;
  public heightMaps:any=0;

  @ViewChild('iframe',{static:true}) private iframe!:ElementRef;
  
  constructor(private _cardrentService:CardrentService) { }

  ngOnInit(): void {
      let maps="https://maps.googleapis.com/maps/api/distancematrix/json"+
    "?destinations=40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626"+
    "&origins=40.6655101%2C-73.89188969999998";
    this.maps=maps;
    //suscripción para cambiar el mapa cada vez que se selecciona una card
    this.subscriptionMaps=this._cardrentService.selectedCard$.subscribe(()=> {
      let card=this._cardrentService.getSelectedCard();
      
      if(card.maps){
        console.log("MAPS: ",card.maps)
        this.maps=card.maps;
        //this.iframe.nativeElement.innerHTML=this.maps;       
        this.iframe.nativeElement.firstElementChild.style.width=this.maxWidthBannerp3+'px';
      }else{
        this.iframe.nativeElement.innerHTML='<div style="margin:auto"><p style="text-align:center;color:white">Ubicación no disponible</p></div>';  

      }
    });

    this.subscriptionHeight= this._cardrentService.heightMaps$.subscribe(()=> {
      console.log("suscription del height del maps");
        this.heightMaps=this._cardrentService.getHeight("maps");
    });

  }

  hideGallery(){    
    this.heightMaps="0";
    this._cardrentService.setHeight("maps",this.heightMaps);
  }
}
