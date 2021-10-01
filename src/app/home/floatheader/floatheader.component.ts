import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pre-floatheader',
  templateUrl: './floatheader.component.html',
  styleUrls: ['./floatheader.component.css']
})
export class FloatheaderComponent implements OnInit {

  //header flotante
  //switch para mostrar ocultar banner ([ngStyle])
  public activeHeader:any=false;
  constructor() { }

  ngOnInit(): void {
  }

  showHeader(){
    //console.log("pasa por setHeader()")
    if(this.activeHeader)
      this.activeHeader=false;
    else
      this.activeHeader=true;
  }

}
