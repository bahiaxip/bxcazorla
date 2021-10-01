import { Component,Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CardService } from '../services/card.service';
import { slider,slider2 } from '../shared/animation';
@Component({
  selector: 'pre-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.css'],
  animations:[slider,slider2]
})
export class MainmenuComponent implements OnInit {

  //switch para mostrar/ocultar de menú principal ([ngClass] con la clase visible) 
  @Input() classMainMenu!:boolean;
  @Output() emitClassMainMenu=new EventEmitter<any>();
  @Output() setSection=new EventEmitter<any>();
  //text mainmenu detail
  public textDetailMenu:Array<string>=[];
  //switch detalle menú principal, anulado por animation.ts
  //public switchDetailMenu:any=false;
  //suscripción opciones de enlace seleccionado
  public subscriptionDetailMenu:any;
  //icono de flecha seleccionado de uno de los enlaces del menú principal
  public selectedLink:any;

  public stateAnimation:any=false;

  constructor(private _cardService:CardService) { }

  ngOnInit(): void {
    //establecemos opción vacía en el
    this._cardService.setDetailMenu([]);
    this.subscriptionDetailMenu = this._cardService.detailMenu$.subscribe(()=>{
        //console.log("suscripción mainmenu.component");
        this.textDetailMenu=this._cardService.getDetailMenu();
    })
  }

  //mostrar/ocultar menu principal
  toggleMainMenu(){
    this.emitClassMainMenu.emit();
    if(this.classMainMenu){
      this._cardService.setDetailMenu([])
      this.classMainMenu=false;
    }
    else
      this.classMainMenu=true;
    //console.log(this.classMainMenu)

  }
  //mostrar opciones al pulsar el icono de flecha de uno de los enlaces del menú principal,
  //asignamos el enlace seleccionado en selectedLink (correspondiente al section) 
  //para poder añadirlo en el template (menú de opciones) 
  showDetailMenu(type:string){
    //pasamos animación a false  
    this.stateAnimation=false;
    
    if(type=="places"){
      this.selectedLink=2;  
    }else if(type=="renting"){
      this.selectedLink=3;
    }else if(type=="gallery"){
      this.selectedLink=4;
    }    
    //setTimeout para dar un tiempo para realizar correctamente el efecto 
    setTimeout(()=> {
      //establecemos opciones
      this._cardService.setDetailMenu(type);
      //pasamos animación a true
      this.stateAnimation=true;
    },400)
    
    //this.switchDetailMenu=true;
  }

  //(se activa al pulsar alguna de las opciones de los enlaces)
  //envía a la sección y panel seleccionados (emit para el section, suscripción para el panel)
  //el panel puede ser con número o con string ('panel-left'|'panel-center'|'panel-right')
  sendSection(section:number,panel:number){
    console.log("panel desde mainmenu: ",panel)
    //this._cardService.setPanel(section,panel);
    this._cardService.setSection(section);
    //this.setSection.emit(section);
    this._cardService.setPanel(panel);
  }


  /*pasado al servicio
  getPanelFromNum(num:number){
    let panel="";
    if(num==0)
      panel='panel-left'
    else if(num==1)
      panel="panel-right"
    return panel;
  }
  */

}
