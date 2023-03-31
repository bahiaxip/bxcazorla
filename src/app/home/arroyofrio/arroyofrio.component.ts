import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'pre-arroyofrio',
  templateUrl: './arroyofrio.component.html',
  styleUrls: ['./arroyofrio.component.css']
})
export class ArroyofrioComponent implements OnInit {
  public panelActive:boolean = true;
  public headerTitle:string = 'Arroyo Frío';
  public headerPanels:any;

  constructor(private _cardService:CardService) { }

  ngOnInit(): void {
    this.panelActive = true;
    this.headerPanels = {
      
      //status:'full',
      left: '0',
      tooltip_left : 'Menú principal',
      right:'2',
      tooltip_right : 'Más sobre ArroyoFrío'
    }
  }

  /*sendPanel(panel:number){ 
    console.log("pasa x arroyofrio.component,panel: ",panel)   
    this._cardService.setPanel(panel);
    this._cardService.setSection(1)
  }*/

  switchPanel(){
    if(!this.panelActive)
      this.panelActive=true;
    else  
      this.panelActive=false;
  }
}
