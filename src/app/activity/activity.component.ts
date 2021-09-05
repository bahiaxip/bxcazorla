import { Component, OnInit,Input, ViewChild, ElementRef } from '@angular/core';
import { GalleryPlaces } from '../models/gallery-places';

@Component({
  selector: 'pre-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  @Input()
  firstwidth:any;
  @Input()
  //misection:

  public switchModal:boolean=false;
  public switchModal2:boolean=false;
  public imageModal:string="";
  public textModal:string="";
  public titleModal:string="";

  public places:GalleryPlaces[]=[
  {
    _id:"",
    title:"Charco de la cuna",
    image: "assets/images/cazorla/galeria1.jpg",
    detail:"El Charco de la cuna es un tramo del río Borosa, ubicado justo antes de su desembocadura, destacable por una sucesión de rocas perpendiculares al río que originan una serie saltos y pozas donde está permitido bañarse y creando un efecto de pequeñas cascada.",    
  },
  {
    _id:"",
    title:"Puente de las Herrerías",
    image: "assets/images/cazorla/galeria2.jpg",
    detail:"",    
  },
  {
    _id:"",
    title:"Salto de los órganos",
    image: "assets/images/cazorla/galeria3.jpg",
    detail:"",    
  },
  {
    _id:"",
    title:"Parque cinegético",
    image: "assets/images/cazorla/galeria4.jpg",
    detail:"",    
  },
  {
    _id:"",
    title:'Embalse "El tranco" ',
    image: "assets/images/cazorla/galeria5.jpg",
    detail:"",    
  },
  {
    _id:"",
    title:"Actividades multiaventura",
    image: "assets/images/cazorla/galeria6.jpg",
    detail:"",    
  },
  {
    _id:"",
    title:"Cerrada de Elías",
    image: "assets/images/cazorla/galeria7.jpg",
    detail:"",    
  },
  {
    _id:"",
    title:"Ocio Arroyo Frío",
    image: "assets/images/cazorla/galeria8.jpg",
    detail:"",    
  },
    
  ];

  //section2
  @ViewChild('midivslider',{static:true}) private midivslider!:ElementRef;
  constructor() {

    this.textModal="";
    this.titleModal="";
  }

  ngOnInit(): void {
  }

  misectionHorizontal(size:string){
    console.log("llega al misectionHorizontal")
    //this.section3.nativeElement.style.transform="translateX(-"+size+")";
    console.log(this.midivslider);
    this.midivslider.nativeElement.style.transform="translateX(-"+size+")";
  }
  misectionHorizontal2(){
    console.log("llega al misectionHorizontal")
    this.midivslider.nativeElement.style.transform="translateX(0px)";
  }

  showModal(place:GalleryPlaces){
    this.imageModal=place.image;
    this.textModal=place.detail;
    this.titleModal=place.title;
    console.log("detaller: ",place);
    if(this.switchModal2)
      this.switchModal2=false;
    this.switchModal=true;

  }
  showModal2(place:GalleryPlaces){
    this.imageModal=place.image;
    this.textModal=place.detail;
    this.titleModal=place.title;
    console.log("detaller: ",place);
    this.switchModal=false;
    this.switchModal2=true;    
  }


  hideFilter(i:number){
    /*
    if(this.selectActivity){
      console.log("l activity desde el condidiconal: ",this.selectActivity);
      this.selectActivity.getElementsByTagName("div")[0].style.opacity=1;
      this.selectActivity.getElementsByTagName("div")[0].style.backgroundColor="rgba(0,0,0,.4)";
      this.selectActivity.getElementsByTagName("img")[0].style.transform="scale(1)";  
    }
    console.log(i)
    let select=this.selectedSection.getElementsByTagName("span")[i];
    this.selectActivity=select;
    console.log("l activity: ",this.selectActivity);
    select.getElementsByTagName("div")[0].style.opacity=0;
    select.getElementsByTagName("div")[0].style.backgroundColor="rgba(0,0,0,0)";
    let image=select.getElementsByTagName("img")[0].style.transform="scale(0.9)";
    //console.log("primero :",image.src);
    */
  }
}
