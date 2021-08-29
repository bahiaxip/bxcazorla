import { Injectable } from '@angular/core';
import { CardRent } from '../models/card-rent';
@Injectable({
  providedIn: 'root'
})
export class CardService {

  public selectedCard:any;
  public typeCard:any;
  public banner1:any;
  
  constructor() { }

  getSelectedCard(){
    return this.selectedCard;
  }

  setSelectedCard(card:CardRent){
    this.selectedCard=card;
  }
  getTypeCard(){
    return this.typeCard;
  }
  setTypeCard(type:any){
    this.typeCard=type;
  }
  /*
  setBanner1(text:string){
    this.banner1=text;
  }
  getBanner1(){
    return this.banner1;
  }
  */
}
