import { Component, OnInit } from '@angular/core';
import { CardrentService } from '../services/cardrent.service';
@Component({
  selector: 'pre-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  //switch para modal imagen no válida
  public switchGlobalModal:boolean=false;
  public textModal:string="";

  //suscripción del globalModal
  public subscriptionGlobalModal:any;
  
  constructor(private _cardrentService:CardrentService) { }

  ngOnInit(): void {
    this.subscriptionGlobalModal = this._cardrentService.globalModal$.subscribe(() => {
      console.log("suscription globalModal");
      this.setModal(this._cardrentService.getGlobalModal());
    })
  }  

  setModal(data:any){
    if(!data){
      this.switchGlobalModal=!this.switchGlobalModal;
      this.textModal="";  
    }else{
      this.switchGlobalModal=!this.switchGlobalModal;
      this.textModal=data;  
    }
    
  }
}
