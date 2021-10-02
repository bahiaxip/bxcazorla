import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pre-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  //switch para modal imagen no válida
  public switchModalNewCard:boolean=false;
  public textModal:string="";
  
  constructor() { }

  ngOnInit(): void {
  }

  setModal(data:any){
    this.switchModalNewCard=data.value;
    this.textModal=data.text;
  }
}
