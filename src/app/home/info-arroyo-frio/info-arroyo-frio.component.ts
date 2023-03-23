//import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'pre-info-arroyo-frio',
  templateUrl: './info-arroyo-frio.component.html',
  styleUrls: ['./info-arroyo-frio.component.css'],
  //encapsulation:ViewEncapsulation.ShadowDom
})
export class InfoArroyoFrioComponent implements OnInit {

  constructor(private _cardService:CardService) { }

  ngOnInit(): void {
  }

  sendPanel(panel:number){ 
    console.log("pasa x info-arroyofrio.component")   
    this._cardService.setPanel(panel);
    this._cardService.setSection(1)
  }

}
