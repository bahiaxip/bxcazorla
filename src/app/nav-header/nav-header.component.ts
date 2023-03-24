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
  public left:any;
  public right:any;
  //public icons:any;
  constructor(private _cardService:CardService) { }

  ngOnInit(): void {    
    if(this.icons){
      if(this.icons=='full'){
        this.left = true;
        this.right = true;
      }else if(this.icons == 'left'){
        this.left = true;
      }else if(this.icons == 'right'){
        this.right = true;
      }
    }
  }

  sendPanel(panel:number){
         
    this._cardService.setPanel(panel);
    this._cardService.setSection(1)
  }
}
