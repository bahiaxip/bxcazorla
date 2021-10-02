import { Component, OnInit } from '@angular/core';
import { CardService } from '../../../services/card.service';
@Component({
  selector: 'pre-newcard-header',
  templateUrl: './newcard-header.component.html',
  styleUrls: ['./newcard-header.component.css']
})
export class NewcardHeaderComponent implements OnInit {

  constructor(private _cardService:CardService) { }

  ngOnInit(): void {
  }

  sendToPanel(panel:number){    
    this._cardService.setPanel(panel);

  }

}
