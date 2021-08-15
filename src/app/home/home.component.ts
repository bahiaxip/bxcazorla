import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GalleryItem, ImageItem} from 'ng-gallery';
import { GalleryPlaces } from '../models/gallery-places';
import { MatAccordion } from '@angular/material/expansion';
import { Snow } from '../models/snow';

@Component({
  selector: 'pre-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  private selectedSection:any=null;
  public images2:any;
  panelOpenState=false;
  images: any;
  private selectActivity:any;
  private firstWidth:any;
  public switchAllOpacitySnow=false
  public switchOpacitySnow='1';
  public switchOpacitySnow2='0';
  public snows:Snow[]=[];  
  public snows2:Snow[]=[];  
  public snow:any;
  public switchModal:boolean=false;
  public imageModal:string="";
  public textModal:string="";
  public titleModal:string="";

  private rainInterval:any;
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

  @ViewChild('section1',{static:true}) private section1!:ElementRef;
  @ViewChild('section2',{static:true}) private section2!:ElementRef;
  @ViewChild('section3',{static:true}) private section3!:ElementRef;
  @ViewChild('section4',{static:true}) private section4!:ElementRef;
  constructor() {

    this.textModal="";
    this.titleModal="";
    //window.addEventListener("")
    //this.selectedSection=this.section1.nativeElement;
    /*
    for(let i=0;i<100;i++){
      this.snows[i]=new Snow(
      {
        //name:"./assets/images/snow/snow"+this.randomInteger(1,6)+".png",
        name:"./assets/images/snow/gota_agua3.png",
        animationName:this.setSpinAnimationName(),
        animationDuration:this.durationValue(this.randomFloat(4,8)),
      },
      -100,
      this.pixelValue(this.randomInteger(0,1920)),
      "fade,drop",
      //this.durationValue(this.randomFloat(5,11)),
      this.durationValue(this.randomFloat(1,2)),
      this.setDelay(0,5)+ ', '+this.setDelay(0,5)
      );  
    }
    */
    


    
  }
  //establecer section mediante scroll
  setSectionByScroll(){
    //alto total del scroll (por si recarga la página detectar y seleccionar el section)    
    let scrollY=window.scrollY;
    //alto de cada section
    let sectionSize=window.innerHeight;
    //seleccionamos el section seleccionado por si se recarga la página
    for(let i=0;i<5;i++){
      if(window.scrollY == sectionSize * i){
      let sect;        
        if(i==1)
          this.selectedSection=this.section2.nativeElement;
        else if(i==2)
          this.selectedSection=this.section3.nativeElement;
        else if(i==3)
          this.selectedSection=this.section4.nativeElement;
        else if(i==4)
          this.selectedSection=this.section4.nativeElement;
        else 
          this.selectedSection=this.section1.nativeElement;
      }
    }
  }

  ngOnInit(): void {
    //comprobamos y almacenamos el ancho del section principal
    this.firstWidth=this.section1.nativeElement.clientWidth;
    console.log(this.firstWidth);
    this.setSectionByScroll()
    
    //console.log("total: ",576*2);
    document.getElementsByTagName("html")[0].style.overflow="hidden";
    
    window.addEventListener("resize",(e)=>{

      this.selectedSection.scrollIntoView();
      console.log("se esta moviendo:",e);
      console.log("el scrolltop es: ",this.section2.nativeElement.scrollTop)
      this.hideSnow();
      this.setSectionByScroll();
      //console.log(this.firstWidth=this.section1.nativeElement.clientWidth)
    })

      
      console.log("thissnow: ",this.snows)
    

    
    /*
    this.snows[1]=new Snow({name:"dd",animationName:2,animationDuration:2},1,1,"",1,2);
    let sn=new Snow({name:"dd",animationName:2,animationDuration:2},0,0,"",12,12);
    //let sn=new Snow({name:"sdf",animationName:12,animationDuration:12},0,600,"",12,12);
    */
    
    
    //window.removeEventListener("scroll",disableScroll);
    
    this.images=[
      new ImageItem({
        src:'./assets/river.jpg',thumb:'./assets/id_unity.jpeg'
      }),
      new ImageItem({
        src:'./assets/rio_borosa.jpg',thumb:'./assets/id_unity.jpg'
      }),
      new ImageItem({
        src:'./assets/rio_cazorla.jpg',thumb:'./assets/id_unity.jpg'
      }),
      new ImageItem({
        src:'./assets/salto_organos.jpg',thumb:'./assets/id_unity.jpg'
      }),

    ];
    this.switchAllOpacitySnow=true;
    if(this.firstWidth>=1000){
      this.animation1();
      this.animation2()
      this.rainAuto();

    }
    
  }
  animation1(){
    for(let i=0;i<200;i++){
      this.snows[i]=new Snow(
      {
        //name:"./assets/images/snow/snow"+this.randomInteger(1,6)+".png",
        name:"./assets/images/snow/gota_agua3.png",
        animationName:this.setSpinAnimationName(),
        animationDuration:this.durationValue(this.randomFloat(4,8)),
      },
      -100,
      this.pixelValue(this.randomInteger(0,this.firstWidth)),
      "fade,drop",
      //this.durationValue(this.randomFloat(5,11)),
      this.durationValue(this.randomFloat(1,2)),
      this.setDelay(0,5)+ ', '+this.setDelay(0,5)
      );  
    }
  }
  animation2(){
    for(let i=0;i<500;i++){
      this.snows2[i]=new Snow(
      {
        //name:"./assets/images/snow/snow"+this.randomInteger(1,6)+".png",
        name:"./assets/images/snow/gota_agua3.png",
        animationName:this.setSpinAnimationName(),
        animationDuration:this.durationValue(this.randomFloat(4,8)),
      },
      -100,
      this.pixelValue(this.randomInteger(0,this.firstWidth)),
      "fade,drop3",
      //this.durationValue(this.randomFloat(5,11)),
      this.durationValue(this.randomFloat(1,2)),
      this.setDelay(0,5)+ ', '+this.setDelay(0,5)
      );  
    }
  }

  rainAuto(){
    //interval
      //interruptor bloqueo inicial
      let blockActive=false;
      //contador de cada interval
      let counterInterval=0;
      
      let rainInterval = setInterval(()=>{
        //si el interruptor no está bloqueado
        if(!blockActive){          
          if(this.switchOpacitySnow=='0'){
            this.switchOpacitySnow='1';
          
            setTimeout(()=>{
              this.switchOpacitySnow2='0';
              //si ya ha pasado el segundo interval ocultamos y bloqueamos
              if(counterInterval>2){
                setTimeout(()=>{
                  this.switchOpacitySnow='0';
                  blockActive=true;
                },3000)
              }
            },3000);
          
          }else{

            this.switchOpacitySnow2='1';
            setTimeout(()=>{
              this.switchOpacitySnow='0';
            },3000);

          }  
        }
        counterInterval++;
        console.log("counter: ",counterInterval);
        //al llegar al interval 12 reinicia el contador a 0 y desbloquea
        if(counterInterval==12){
          counterInterval=0;
          blockActive=false;
        }
      },10000)
  }
  hideSnow(){
    this.switchAllOpacitySnow=false;
    clearInterval(this.rainInterval);
  }

  enviar(id:number){
    if(id==1){
      this.selectedSection=this.section1.nativeElement;
      console.log("al 1")
      this.selectedSection.scrollIntoView({behavior:"smooth"});       
    }else if(id==2){
      this.selectedSection=this.section2.nativeElement;
      console.log("al 2")

      this.selectedSection.scrollIntoView({behavior:"smooth",block:"center"});  
      //this.section1.nativeElement.style.display="none"
      //this.section1.nativeElement.style.height="auto";
      console.log(this.section2.nativeElement.getBoundingClientRect().top)
      console.log(this.section2.nativeElement.scrollTop);
    }else if(id==3){
      this.selectedSection=this.section3.nativeElement;
      console.log("al 3")
      this.selectedSection.scrollIntoView({behavior:"smooth",block:"center"});  
    }
    else if(id==4){
      this.selectedSection=this.section4.nativeElement;
      console.log("al 4")
      this.selectedSection.scrollIntoView({behavior:"smooth",block:"center"});  
    }
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
  showModal(place:GalleryPlaces){
    this.imageModal=place.image;
    this.textModal=place.detail;
    this.titleModal=place.title;
    console.log("detaller: ",place);
    this.switchModal=true;

  }


            //animation snow
  initSnow(){

  }

  randomInteger(low:number,high:number){
    return low + Math.floor(Math.random()*(high-low));   
  }

  randomFloat(low:number,high:number){
    return low + Math.random()*(high-low);
  }
  setSpinAnimationName(){
    return (Math.random() < 0.5) ? 'clockwiseSpin':'counterclockwiseSpinAndFlip';
  }
  setDelay(d:number,d2:number){
    return this.durationValue(this.randomFloat(d,d2));
  }

  pixelValue(value:number){
    return value+'px';
  }

  durationValue(value:number){
    return value+'s';
  }
  /*
  setSnow(){

    //10
    let images=[];
    for(let i =0;i<10;i++){
      images.push("./assets/images/snow/snow"+this.randomInteger(1,6)+'.png');
    }
  }
  */

}
