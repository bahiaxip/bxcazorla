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
  @Input() firstwidth:any;
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
  //switch para mostrar/ocultar menudetails 
  //(a partir de resoluciones menores se pasa a absolute)  
  public switchMenuDetailsAbsolute:any=false;

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
    this.closeMenuDetails()
    /*
    if(this.classMainMenu){
      this._cardService.setDetailMenu([])
      this.classMainMenu=false;
    }
    else
      this.classMainMenu=true;
    //console.log(this.classMainMenu)
    */

  }
  //mostrar opciones al pulsar el icono de flecha de uno de los enlaces del menú principal,
  //asignamos el enlace seleccionado en selectedLink (correspondiente al section) 
  //para poder añadirlo en el template (menú de opciones) 
  showDetailMenu(type:string){
    this.switchMenuDetailsAbsolute=true;
    console.log(this.switchMenuDetailsAbsolute);
    //pasamos animación a false  
    this.stateAnimation=false;
    if(type=="arroyofrio"){
      this.selectedLink=1;
    }
    else if(type=="places"){
      this.selectedLink=2;  
    }else if(type=="entertainment"){
      this.selectedLink=3;  
    }else if(type=="renting"){
      this.selectedLink=4;
    }else if(type=="gallery"){
      this.selectedLink=5;
    }    
    //setTimeout para dar un tiempo para realizar correctamente el efecto de deslizamiento 
    setTimeout(()=> {
      
      //establecemos opciones
      this._cardService.setDetailMenu(type);
      //pasamos animación a true
      this.stateAnimation=true;
    },400)
    
    //this.switchDetailMenu=true;
  }
  closeMenuDetails(){
    this.switchMenuDetailsAbsolute=false;
  }

  //(se activa al pulsar alguna de las opciones de los enlaces)
  //envía a la sección y panel seleccionados (emit para el section, suscripción para el panel)
  //el panel puede ser con número o con string ('panel-left'|'panel-center'|'panel-right')
  sendSection(section:number,panel:number){
    
    //Asignamos primero el setPanel() antes que el setSection(), en lugar de al revés,
    //ya que, algunos componentes están suscritos al subjectPanel, pero únicamente el home está suscrito
    //al setSection() y la suscripción del section llega antes de que el panel se haya establecido,
    //si es la primera vez, no se puede enviar al panel ya que tiene un valor undefined, por ello,
    //si el section es el 1, se intercambia el orden
      if(section==1 && panel==0){
        panel=1;
      }
      this._cardService.setSection(section);
      this._cardService.setPanel(panel);
    
  }
  animation(){
    this._cardService.setAnimation();
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
