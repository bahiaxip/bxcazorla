import { Component, OnInit,Input,ViewChild,ElementRef } from '@angular/core';
//import { GalleryPlaces } from '../../models/gallery-places';
//import { Places } from '../places';
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
  public image:string;
  public image2:string;
  public active:boolean=true;
  public showerInfo:boolean = false;
  @ViewChild('caption',{static:true}) private caption!:ElementRef;
  constructor() {
    this.selectedImage="";
    this.selectedImage2="";
    this.image = '../../assets/activities/senderismo.jpg';
    this.image2 = '../../assets/activities/servicios/supermercado.jpg';

    //this.places=Places;
  }

  ngOnInit(): void {
    if(this.active){
      //this.selectedImage=this.image;
      //this.selectedImage2=this.image2;
      console.log("es true");
    }

  }

  setImage(image:string){
    if(this.panel=='panel1'){
      this.selectedImage='../../'+image;  
      console.log("selectedImage:",image)
    }else{
      this.selectedImage2='../../'+image;
      console.log("selectedImage2:",image)
    }
    this.active=false;
    
    //console.log("setimage:",image)
  }
  //@HostListener('transitionend', ['$event'])
  onTransitionEnd(e:Event){
    console.log("klasdlfkasjdfñ",e)
    this.image = this.selectedImage;
    this.image2 = this.selectedImage2;
    this.active=true;
    console.log("yeadd: e")
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

  showInfo(event:any){
    this.showerInfo = (this.showerInfo) ? false : true;
    //subimos el scroll, ya que cuando se desactiva el overflow no permite volver al titulo inicial
    this.caption.nativeElement.scrollTo(0,0);
    /*this.caption.nativeElement.scroll({
      top:0,
      left:0,
      behavior:'smooth',
      block:'center'
    });*/
    console.log("event: ",event)
    console.log("howinfo: ",this.caption.nativeElement)
  }

}
