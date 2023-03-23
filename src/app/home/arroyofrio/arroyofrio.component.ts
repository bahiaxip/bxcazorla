import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'pre-arroyofrio',
  templateUrl: './arroyofrio.component.html',
  styleUrls: ['./arroyofrio.component.css']
})
export class ArroyofrioComponent implements OnInit {
  public panelActive:boolean = true;

  constructor(private _cardService:CardService) { }

  ngOnInit(): void {
    this.panelActive = true;
  }

  sendPanel(panel:number){ 
    console.log("pasa x arroyofrio.component,panel: ",panel)   
    this._cardService.setPanel(panel);
    this._cardService.setSection(1)
  }

  closePanel(){
    //this.panelActive=false;

  }
}
