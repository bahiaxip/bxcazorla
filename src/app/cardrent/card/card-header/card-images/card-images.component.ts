import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardrentService } from '../../../services/cardrent.service';
@Component({
  selector: 'pre-card-images',
  templateUrl: './card-images.component.html',
  styleUrls: ['./card-images.component.css']
})
export class CardImagesComponent implements OnInit {

  @Input()
  selectedCard:any;    
  constructor(private _cardrentService:CardrentService) { }
  public heightImages:any;
  public subscriptionImages:any; 
  
  ngOnInit(): void {    
    this.subscriptionImages = this._cardrentService.heightImages$.subscribe(() => {
      this.heightImages = this._cardrentService.getHeight("images");
    })
  }

  hideImagesCard(){
    this.heightImages="0";
    this._cardrentService.setHeight("images","0");
  }

  

}
