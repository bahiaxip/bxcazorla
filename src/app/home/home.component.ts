import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GalleryItem, ImageItem} from 'ng-gallery';
import { GalleryPlaces } from '../models/gallery-places';
import { MatAccordion } from '@angular/material/expansion';
import { Snow } from '../models/snow';
import { CardRentData } from '../models/card-rent-data';
import { CardRent } from '../models/card-rent';
import { LevelPipePipe, IconTypePipe } from '../level-pipe.pipe';
import { Title } from '@angular/platform-browser';
//import { IconPipe } from '../pipes/icon.pipe';


@Component({
  selector: 'pre-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  


})
export class HomeComponent implements OnInit {


  public myHeight:string="0";
  public fixedCloseGal:boolean=false;
  private selectedSection:any=null;
  public images2:any;
  panelOpenState=false;
  images: any;
  private selectActivity:any;
  public selectedCard!:CardRent;
  //switchImages sustituido por myHeight
  //public switchImages=false;
  public switchDivFeedback:any;
  public selTypeCard:any;
  public pushedOptionCard:any;
  public firstWidth:any;
  public firstHeight:any;
  public switchAllOpacitySnow=false
  public switchOpacitySnow='1';
  public switchOpacitySnow2='0';
  public snows:Snow[]=[];  
  public snows2:Snow[]=[];  
  public snow:any;
  public switchModal:boolean=false;
  public switchModal2:boolean=false;
  public imageModal:string="";
  public textModal:string="";
  public titleModal:string="";

  //array valoracion localización
  public levelLocation:number=5;
  public cardrentdata:any;
  public textbanner:any;
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
  @ViewChild('midivslider',{static:true}) private midivslider!:ElementRef;
  @ViewChild('backimage',{static:true}) private backimage!:ElementRef;
  @ViewChild('backimage2',{static:true}) private backimage2!:ElementRef;
  @ViewChild('bannerp1',{static:true}) private bannerp1!:ElementRef;
  @ViewChild('bannerp2',{static:true}) private bannerp2!:ElementRef;

  constructor(
    private titleService:Title,    
  ) {

    this.titleService.setTitle("Mi titulo");

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

    this.cardrentdata=CardRentData.midata;


    
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

    //console.log("cardrentdata: ",this.cardrentdata[0]);
    //comprobamos y almacenamos el ancho del section principal
    this.firstWidth=this.section1.nativeElement.clientWidth;
    console.log(this.firstWidth);
    this.firstHeight=this.section1.nativeElement.clientHeight;
    console.log(this.firstHeight);
    this.setSectionByScroll()
    
    //console.log("total: ",576*2);
    document.getElementsByTagName("html")[0].style.overflow="hidden";
    
    window.addEventListener("resize",(e)=>{

      this.selectedSection.scrollIntoView();
      console.log("se esta moviendo:",e);
      console.log("el scrolltop es: ",this.section2.nativeElement.scrollTop)
      this.hideSnow();
      this.setSectionByScroll();
      this.firstWidth=this.section1.nativeElement.clientWidth;
      console.log("nuevo firstWidth: ",this.firstWidth)
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
    if(this.firstWidth>=1000 && this.firstHeight<=this.firstWidth){
      //anulada animación (poco realista)
      
      this.animation1();
      this.animation2()
      this.rainAuto();
      

    }
    this.selectedCard=this.cardrentdata[0];

    
  }

  flash(){
    console.log("llega al falash")    
    //this.backimage.nativeElement.style.backgroundImage="url('../../assets/cerrada_de_elias_byn.png')";
    this.backimage2.nativeElement.className="back_image2 flash animated"
    setTimeout(()=>{
      this.backimage2.nativeElement.className="back_image2"
    },10000)
  }
  sendDataToExpansion(){

  }
  showImagesCard(card:CardRent){
    this.fixedCloseGal=true;
    this.selectedCard=card;
    console.log(card.listImages);
    //this.switchImages=true;
    this.myHeight="calc(100vh - 90px)";
  }
  hideImagesCard(){
    //this.fixedCloseGal=false;
    if(this.myHeight != "0"){
      this.myHeight="0";
    }
    
  }
  location(){
    console.log("solo location");
  }
  selectCard(card:CardRent){ 
    if(this.myHeight != "0"){
      //this.myHeight="0";
    }   
    console.log("tipo: ",this.selTypeCard);
    if(this.selTypeCard=="location" ){
      console.log("la seleccionada es: ",card.numLevelLocation);
      this.levelLocation=card.numLevelLocation;
      console.log(this.levelLocation)
      this.switchDivFeedback=true;
    }
    else
      this.switchDivFeedback=false
    if(!this.pushedOptionCard && this.selectedCard!=card){
      this.switchDivFeedback=false
      this.bannerp2.nativeElement.innerHTML="";
    }
    //this.selTypeCard=null;
    this.selectedCard=card;
    //detecta si se ha pulsado el option card 
    if(this.pushedOptionCard){
      console.log("se ha pulsado optioncard")
      this.pushedOptionCard=false;
    }
    this.bannerp1.nativeElement.innerHTML=card.title;
  }
  selectOptionCard(type:string, text:any=null){
    let totalText;
    let aux;
    let div;
    this.pushedOptionCard=true;
    this.selTypeCard=type;
    
    if(type=="feedback"){ 
      aux=text;
      totalText="mifeedback"
      //div='<div>'
    }else if(type=="capacity"){
      /*
      if(text){        
        for(let i=0;i<text.length;i++){          
          if(i>0){
            list+',';
          }
          list+text[i];
        }
        console.log(list)
      }
      */
      totalText='<span style="color:orange">Capacidad: </span><span style="font-size:16px;margin-left:10px">'+text+' personas</span>';

    }else if(type=="phone"){
      totalText='<span style="color:orange">Teléfono de contacto: </span><span style="font-size:16px;margin-left:10px">'+text+'</span>';
    }else if(type=="location"){
      aux=text;
      totalText='<span style="color:orange;font-size:10px">Mostrar mapa </span>'+' <span class="material-icons" style="vertical-align:middle">share_location</span>';
    }
    if(!text){
      console.log("mi text no existe")
    }else{
      console.log(totalText)
    }
    this.bannerp2.nativeElement.innerHTML=totalText;
    //this.textbanner='<span class="material-icons">share_location</span>';

  }
  getLevelLocationString(card:any){
    //obtenemos una media de la localización... 
    //si es menor a 1 km : Excelente, si es entre 1 y 2 : muy bueno, si es entre 2 y 3: bueno
    if(card.numLevelLocation){}
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

  showTooltip(card:CardRent){
    console.log("dato");
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
  showDivFeedback(){

  }
  hideDivFeedback(){

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
              if(counterInterval>1){
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

  //método cálculo fórmula de Haversine (calcular distancia entre 2 puntos)
  /*
  var rad = function(x) {
    return x * Math.PI / 180;
  };

  var getDistance = function(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.lat() - p1.lat());
    var dLong = rad(p2.lng() - p1.lng());
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
  };
  */
}
