import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { CardService } from '../../services/card.service';
@Component({
  selector: 'pre-places-header',
  templateUrl: './places-header.component.html',
  styleUrls: ['./places-header.component.css']
})
export class PlacesHeaderComponent implements OnInit {
  
  
  @Input()
  titleProximity:any;
  @Input()
  panel:any;
  //@Output() sendToPanel= new EventEmitter<any>();
  //switch para que la primera vez no se muestre el efecto transition de opacidad
  // del icono de cambio de panel
  public switchTransitionFirst:any;
  constructor(private _cardService:CardService) {

  }

  ngOnInit(): void {    
    console.log("desde activity-header: ",this.panel)
  }

  sendPanel(panel:number){
    console.log("desde activity-header: ",panel)
    this.switchTransitionFirst=true;
    //this.sendToPanel.emit(panel);
    this._cardService.setPanel(panel)
  }

}
