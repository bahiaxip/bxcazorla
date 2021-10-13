import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CardrentService } from '../services/cardrent.service';
@Component({
  selector: 'pre-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {  

  //switch modal para aviso para acceso a panel feedback
  public switchModalCardRent:boolean=false;
  public textModal:string="";
  public paramModal:any=null;

  private subscriptionModal:any;

  constructor(private _cardrentService:CardrentService) { }

  ngOnInit(): void {
    //suscripción de modal
    this.subscriptionModal = this._cardrentService.modal$.subscribe(() => {
      //this.setModal(this._cardrentService.getModal());
    })
  }
}
