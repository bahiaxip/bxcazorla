import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'pre-arroyofrio',
  templateUrl: './arroyofrio.component.html',
  styleUrls: ['./arroyofrio.component.css']
})
export class ArroyofrioComponent implements OnInit {

  constructor(private _cardService:CardService) { }

  ngOnInit(): void {
  }

  sendPanel(panel:number){ 
    console.log("pasa x arroyofrio.component")   
    this._cardService.setPanel(panel);
    this._cardService.setSection(1)
  }

}
