import { Component, OnInit, Input } from '@angular/core';
import { CardrentService } from '../../../services/cardrent.service'
@Component({
  selector: 'pre-card-infoservices',
  templateUrl: './card-infoservices.component.html',
  styleUrls: ['./card-infoservices.component.css']
})
export class CardInfoservicesComponent implements OnInit {

  private subscriptionHeight:any;
  @Input() myHeightInfo:any;
  @Input() selectedCard:any;
  public iconsService:any;
  public styleBlockActive:any;
  constructor(private _cardrentService: CardrentService) { }

  ngOnInit(): void {
    //iconos de servicios
    this.iconsService={
      'wifi':'signal_wifi_statusbar_null',
      'aa':'ac_unit',
      'parking':'local_parking',
      'mascotas':'pets',
      'piscina':'pool',
      'chimenea':'local_fire_department',
      'calefacción':'hvac',
      'tv':'tv',
      'restaurante':'restaurant',
      'cafetería':'local_cafe',
      'videoconsola':'videogame_asset',
      'fumar': 'smoking_rooms',
      'accesibilidad':'accessible',
      'spa':'spa',
      'cuna':'crib'








    }
    console.log("lista desde inforservices: ",this.selectedCard.services)
    /*
    let list = this.selectedCard.services.map((service:any)=> {
      return {service:service}
    })
    */
  }

  hideImagesCard(data:any){
    console.log("desde hideImagesCard: ",this.selectedCard)
    console.log(this.selectedCard.numLevelFeedback)
    this.myHeightInfo=0;
    this._cardrentService.setHeight('info',"0");
  }

}
