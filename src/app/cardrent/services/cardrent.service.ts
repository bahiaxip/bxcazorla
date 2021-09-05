import { Injectable } from '@angular/core';
import { CardRent } from '../models/card-rent';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardrentService {
  private subjectBanner1 = new Subject<void>();
  public observableBanner1$ = this.subjectBanner1.asObservable();

  private banner2Subject = new Subject<void>();
  public banner2$ = this.banner2Subject.asObservable();

  private switchDivFeed = new Subject<void>();
  public switchDivFeed$ = this.switchDivFeed.asObservable();

  public selectedCard:any;
  public typeCard:any;
  public banner1:any;
  public banner2:any;
  
  public switchFeed:any;
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
  
  setBanner1(data:any){
    this.banner1=data;
    this.subjectBanner1.next();
  }
  getBanner1(){
    return this.banner1;
  }
  setBanner2(data:any){    
    this.banner2=data;
    this.banner2Subject.next();
  }
  getBanner2(){
    return this.banner2;
  }

  setSwitchFeed(data:any){
    this.switchFeed=data;
    this.switchDivFeed.next();
  }

  getSwitchFeed(){
    return this.switchFeed;
  }
  



  
}
