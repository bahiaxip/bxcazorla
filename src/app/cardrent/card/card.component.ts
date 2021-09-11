import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pre-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Output()
  emitWidth=new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  emitir(){
    console.log("llega a emitir")
    this.emitWidth.emit("enviar")
  }

}
