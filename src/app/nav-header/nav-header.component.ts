import { Component, OnInit,Input } from '@angular/core';
import { CardService } from '../services/card.service';
@Component({
  selector: 'pre-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit {
  @Input() icons:any;
  @Input() title:any;
  //public left:any;
  //public right:any;
  //public icons:any;
  constructor(private _cardService:CardService) { }

  ngOnInit(): void {    
    /*if(this.icons && this.icons.status){
      if(this.icons.status=='full'){
        this.icons.left = true;
        this.icons.right = true;
      }else if(this.icons.status == 'left'){
        this.icons.left = true;
      }else if(this.icons.status == 'right'){
        this.right = true;
      }
    }*/
    //asignamos valores a left y right por defecto
    /*if(!this.icons.left){
      this.icons.left=0;
    }
    if(!this.icons.right){
      this.icons.left=2;
    }*/
  }

  sendPanel(panel:number){
         console.log("llega a nav-header")
    this._cardService.setPanel(panel);
    console.log("el iconssection es: ",this.icons)
    //this._cardService.setSection(this.icons.section)
  }
}
