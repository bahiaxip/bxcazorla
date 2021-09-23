import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  emitir(ev:any){
    console.log("llega a emitir")
    this.emitWidth.emit(ev)
  }

  setModal(data:any){    
    this.textModal=data;
    this.switchModalCardRent=true;
    
  }

}
