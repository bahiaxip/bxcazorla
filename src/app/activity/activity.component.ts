import { Component, OnInit,Input, ViewChild, ElementRef } from '@angular/core';
//import { GalleryPlaces } from '../models/gallery-places';
import { GalleryActivities } from '../models/gallery-activities';
import { Activities,Activities2 } from  './activities';
import { CardService } from '../services/card.service';
import { ActivityService } from './services/activity.service';

@Component({
  selector: 'pre-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  @Input()
  firstwidth:any;

  public selectedPanel:any;

  //suscripción para deslizar por los paneles horizontales
  public subscriptionPanel:any;
  //suscripción para detectar cuando se ha seleccionado una actividad distinta y preparar la imagen del modal
  //que es un duplicado de mayor resolución para mostrarla en formato de pantalla completa
  public subscriptionModalAct:any;
  public subscriptionSwitchModal:any;
  public activities:Array<GalleryActivities>=Activities;
  public activities2:Array<GalleryActivities>=Activities2;

  public headerPanels:any;
  public headerPanels2:any;
  public headerTitle:string = "Actividades multiaventura";
  public headerTitle2:string = "Servicios";
  //imágenes iniciales del modal de cada uno de los paneles (paneles 0 y 1 )
  public imageModalPanel0:string = "assets/activities/senderismo_back.jpg";
  public imageModalPanel1:string = "assets/activities/services/supermercado_back.jpg";
  public imageModalAct:string="";
  public imageModalAct2:string="";
  public imageAct:string="";
  //interruptor que activa la clase active al modal de pantalla completa
  public switchModalAct:boolean = false;
  //public panel:string;
  @ViewChild('activity',{static:true}) private activity!:ElementRef;
  constructor(
    private _cardService:CardService,
    private _activityService:ActivityService
  ){}

  ngOnInit(){
    //establecemos la imagen y el modal de senderismo por defecto al inicio
    this._activityService.setImageAct("assets/activities/senderismo.jpg");
    //establecemos las imágenes del modal de los 2 paneles
    this.imageModalAct = this._activityService.getModalAct();
    this.imageModalAct2 = this.imageModalPanel1;
    //establecemos las características del header (según los paneles que tenga el section)
    this.headerPanels = {
      right:'1',
      tooltip_right : this.headerTitle2
    }
    this.headerPanels2 = {
      left:'0',
      tooltip_left : this.headerTitle
    }
    //suscripción compartida entre varios componentes que permite deslizarse de un panel a 
    //otro (método declarado en el servicio (getPanel()) 
    this.subscriptionPanel = this._cardService.panel$.subscribe(()=> {
      //obtenemos el section actual
      let section=this._cardService.getSection();      
    //al ser una suscripción reutilizada en varios componentes testeamos
    //realizamos acción según el section (en este caso el 3)
      if(section==3){
        let panel = this._cardService.getPanel();
        this.sendToPanel(this.firstwidth+'px','1s',panel)        
      }
    })
    //suscripción que establece la nueva imagen del modal (imagen duplicada con mayor resolución)
    this.subscriptionModalAct = this._activityService.modalAct$.subscribe(()=>{
      let imageModalBack = this._activityService.getModalAct();
      let panel = this._cardService.getPanel();
      if(panel == 1){
        this.imageModalAct2 = imageModalBack;  
      }else{
        this.imageModalAct = imageModalBack;  
      }
    })
    //suscripción que permite mostrar el modal con una imagen igual pero con mayor resolución,
    //de esta forma evitamos sobrecargar la página con muchas imágenes de alta resolución
    this.subscriptionSwitchModal = this._activityService.switchModal$.subscribe(()=>{
      this.switchModalAct = this._activityService.getSwitchModal();
      console.log("se ha activado el modal de pantalla completa")
    })
  }

  sendToPanel(size:string,duration:string,toPanel:number){ 

    //this.midivslider.nativeElement.style.transitionDuration=duration;    
    //this.section3.nativeElement.style.transform="translateX(-"+size+")";
  //solo 2 panels (panel-left,panel-right)
    this.activity.nativeElement.style.transitionDuration='1s';
    if(toPanel==0){
      this.selectedPanel=0;
      this.activity.nativeElement.style.transform="translateX(0px)";
    }else if(toPanel==1){
      this.selectedPanel=1;
      this.activity.nativeElement.style.transform="translateX(-"+size+")";  
    }
    console.log(this.selectedPanel)
    
  }


  //pruebas para poder cerrar la ventana modal
  closeModal(){
    this._activityService.switchModal();
    this.switchModalAct = this._activityService.getSwitchModal();
    console.log("pulsado")
  }
  closeModal2(){
    console.log("pulsado2")
  }
}
