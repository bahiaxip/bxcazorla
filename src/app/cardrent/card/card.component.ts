import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CardrentService } from '../services/cardrent.service';
@Component({
  selector: 'pre-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Output()
  emitWidth=new EventEmitter<any>();

  //switch modal para aviso para acceso a panel feedback
  public switchModalCardRent:boolean=false;
  public textModal:string="";
  public paramModal:any=null;

  constructor(private _cardrentService:CardrentService) { }

  ngOnInit(): void {
  }

  emitir(ev:any){
    console.log("llega a emitir")
    this.emitWidth.emit(ev)
  }
  //mostrar modal 
  setModal(data:any){
  if(typeof data == "string"){    
     this.textModal=data;
  }else if(typeof data == "object"){
    this.paramModal=data.card;
    this.textModal=data.text;
    
    console.log("llega al setModal")
  }
    
   
    this.switchModalCardRent=true;
    
  }

  handlerModal(card:any=null){
    if(card){
      this._cardrentService.deleteCardRentById(card._id).subscribe(
        response => {
          console.log("eliminado: ",response)
          this.paramModal=null;
          //actualizamos la lista de rentcards (cardrent.component) mediante
          //el servicio y la suscripción de card-component
          this._cardrentService.cardRentsSubject.next();
        },
        error => {

        }
      );
    }else if(this.paramModal)
      this.paramModal=null;
    //ocultamos modal      
    this.switchModalCardRent=false
    
  }

}
