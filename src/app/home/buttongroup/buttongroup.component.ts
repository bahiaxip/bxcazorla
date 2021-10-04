import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { CardService } from '../../services/card.service';
import { CardrentService } from '../../cardrent/services/cardrent.service';
@Component({
  selector: 'pre-buttongroup',
  templateUrl: './buttongroup.component.html',
  styleUrls: ['./buttongroup.component.css']
})
export class ButtongroupComponent implements OnInit {
  @Input() firstwidth:any;
  @Input() buttonValue:any;
  @Output() emitClassMainMenu=new EventEmitter<any>();

  //switch para mostrar el modal de mensaje al restablecer valores por defecto
  public switchModalCardRentDefault:any=false;
  //botón de buttongroup 
  //el buttonValue permite relacionar el botón checkeado en el buttongroup(del grupo de botones lateral)
  //de Angular Material, tb se pueden modificar el CSS por defecto 
  //public buttonValue:any;
  public panel:any=true;
  public subscriptionPanel:any;

  constructor(
    private _cardService:CardService,
    private _cardrentService:CardrentService
  ) { }

  ngOnInit(): void {
    this.subscriptionPanel=this._cardService.panel$.subscribe(()=> {
      let section = this._cardService.getSection();
      let panel=this._cardService.getPanel();
      if(section==1 && panel==1)
        this.panel=false
      else
        this.panel=true;        
    })
  }

  setSection(section:number){
    this._cardService.setSection(section);
  }

  //establecer los valores de los alojamientos por defecto y reiniciar
  fillDB(){
    this.switchModalCardRentDefault=true;
    this._cardrentService.fillDB();
    /*
    setTimeout(()=>{
      this.switchModalCardRentDefault=false;
    },3000)
    */
    //window.location.reload();
    
  }
  toggleMainMenu(){
    this.emitClassMainMenu.emit();
  }

  setAnimations(){
    //animación de lluvia
  }


}
