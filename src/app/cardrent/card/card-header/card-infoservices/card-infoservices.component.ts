import { Component, OnInit, Input } from '@angular/core';
import { CardrentService } from '../../../services/cardrent.service'
@Component({
  selector: 'pre-card-infoservices',
  templateUrl: './card-infoservices.component.html',
  styleUrls: ['./card-infoservices.component.css']
})
export class CardInfoservicesComponent implements OnInit {

  private subscriptionHeight:any;  
  @Input() selectedCard:any;
  public iconsService:any;
  public styleBlockActive:any;
  public heightInfo:string="0";
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
    this.subscriptionHeight = this._cardrentService.heightInfo$.subscribe(()=> {
      console.log("Suscription desde info");
      this.heightInfo = this._cardrentService.getHeight("info");
    })
    console.log("lista desde inforservices: ",this.selectedCard.services)
    /*
    let list = this.selectedCard.services.map((service:any)=> {
      return {service:service}
    })
    */
  }

  hideImagesCard(){    
    this.heightInfo='0';
    this._cardrentService.setHeight('info',this.heightInfo);
  }

}
