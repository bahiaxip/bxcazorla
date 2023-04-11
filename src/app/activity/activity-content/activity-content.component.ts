import { Component, OnInit,Input,ViewChild,ElementRef } from '@angular/core';
//import { GalleryPlaces } from '../../models/gallery-places';
//import { GalleryActivities } from '../../models/gallery-activities';
//import { Places } from '../places';
import { ActivityService } from '../services/activity.service';
@Component({
  selector: 'pre-activity-content',
  templateUrl: './activity-content.component.html',
  styleUrls: ['./activity-content.component.css']
})
export class ActivityContentComponent implements OnInit {
  
  @Input() activities:any;
  @Input() activities2:any;
  //Necesario decorador Input para directiva (sin corchetes al ser un string directo)
  @Input() panel:any;

  public selectedImage:string;
  public selectedImage2:string;
  //directiva panel que distingue panel1 de panel2
  //public panel:any;
  public image:string="";
  public image2:string="";
  //imagen para el fondo, es el mismo string pero con terminación "_back.jpg"
  //public backModalImage:string;

  public title:string="";
  public title2:string = "";
  public detail:string="";
  public detail2:string="";
  public active:boolean=true;
  public showerInfo:boolean = false;

  @ViewChild('caption',{static:true}) private caption!:ElementRef;
  constructor(      
      private _activityService:ActivityService
  ) {
      this.selectedImage="";
      this.selectedImage2="";      
  }

  ngOnInit(): void {
    //this._cardService.setPanel(0);
    if(this.panel == 'panel0'){
        this.title = this.activities[0].title;
        this.detail = this.activities[0].detail;
        this.image = this.activities[0].image;
    }else{
        this.title2 = this.activities[0].title;
        this.detail2 = this.activities[0].detail;
        this.image2 = this.activities[0].image;  
    }    
  }
  //actualiza los datos visibles del activity (título, detalle e imagen)
  setActivity(activity:any){            
      if(this.panel=='panel0'){
          this.title = activity.title;
          this.detail = activity.detail;
          this.selectedImage = activity.image;      
      }else{
          this.title2 = activity.title;
          this.detail2 = activity.detail;
          this.selectedImage2=activity.image;      
      }
      this.active=false;
  }
  //cambiar imagen
  selectImage(activity:any){
      this.checkPanelInfo(activity);
  }
  //comprueba si el panel de info se encuentra desplegado, en ese caso retardamos 1 segundo para 
  //que se cierre manteniendo el tiempo de animación.
  checkPanelInfo(activity:any){
      if(this.showerInfo){
          this.showerInfo = false;  
          setTimeout(()=>{ this.setImage(activity) },1000);
      }else
          this.setImage(activity);
      
  }
  setImage(activity:any){
    //establecemos el nuevo activity (mismo componente) y
    //establecemos la nueva imagen del modal
      this.setActivity(activity);
      this._activityService.setModalAct(activity);
      this.active=false;
  }
  //transición en la selección de activity
  //@HostListener('transitionend', ['$event'])
  onTransitionEnd(e:Event){    
    this.image = this.selectedImage;
    this.image2 = this.selectedImage2;
    this.active=true;    
  }
  //efecto de seguimiento del cursor que va descubriendo y moviendo la imagen,
  //necesario evento mousemove y mouseout
  //con esta fórmula es necesario tener la imagen el doble de grande que la mostrada
  /*
  follow(event:any){
    let x = event.clientX;
    let y = event.clientY;
    event.path[0].style.backgroundPositionX=-x+'px';
    event.path[0].style.backgroundPositionY=-y+'px';
    event.path[0].style.backgroundImage="url('../../../assets/images/cazorla/galeria6.jpg')";
    console.log("hola")
    console.log(event)
  } 
  */
  //efecto con la misma imagen, es necesario aumentar el background-size
  //en CSS
  //anulado, no conveniente en este componente debido a incompatibilidad con scroll
  /*
  follow(event:any){
    let x = event.offsetX*0.2;
    console.log(event.movementX);
    console.log(event.clientX);
    let y = event.offsetY*0.2;    
    event.srcElement.style.backgroundPositionX=-x+'px';
    event.srcElement.style.backgroundPositionY=-y+'px';
  }
  follow2(event:any){
    event.srcElement.style.backgroundPosition='center';
    console.log("adios")
  } 
  */

  showInfo(){
    this.showerInfo = (this.showerInfo) ? false : true;
    //subimos el scroll, ya que cuando se desactiva el overflow no permite volver al titulo inicial
    this.caption.nativeElement.scrollTo(0,0);    
  }
  //mostramos modal con imagen a pantalla completa
  showModal(){
    this._activityService.switchModal();    
  }

}
