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
  public icons:any;

  constructor(private _cardService:CardService) { }

  ngOnInit(): void {
    this.panelActive = true;
    this.icons = {
      
      //status:'full',
      left: '0',
      right:'2'
    }
  }

  /*sendPanel(panel:number){ 
    console.log("pasa x arroyofrio.component,panel: ",panel)   
    this._cardService.setPanel(panel);
    this._cardService.setSection(1)
  }*/

  closePanel(){
    //this.panelActive=false;

  }
}
