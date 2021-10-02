import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GalleryItem, ImageItem} from 'ng-gallery';

import { MatAccordion } from '@angular/material/expansion';
import { Snow } from '../models/snow';

import { Title } from '@angular/platform-browser';
//import { IconPipe } from '../pipes/icon.pipe';
import { CardRent } from '../models/card-rent';

//services
import { CardrentService } from '../cardrent/services/cardrent.service';
import { CardService } from '../services/card.service';

@Component({
  selector: 'pre-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {

  public banner1:any;
  public banner2:any;
  public banner3:any;
  public cardrentdata:any;
  public selectedCard:any;

//elemento DOM del section seleccionado
  private selectedSection:any=null;
  //id correspondiente al section
  public sectionId:any;
  //botón de buttongroup 
  //el buttonValue permite relacionar el botón checkeado en el buttongroup(del grupo de botones lateral)
  //de Angular Material, tb se pueden modificar el CSS por defecto 
  public buttonValue:any;

  public images2:any;
  panelOpenState=false;
  images: any;
  private selectActivity:any;
  
  //height para card-header
  public myHeight:string="0";
  public myHeight2:string="0";
  
  //width de window para establecer al cargar y redimensionar
  public firstWidth:any;
  public firstHeight:any;
  //snow
  public switchAllOpacitySnow=false
  public switchOpacitySnow='1';
  public switchOpacitySnow2='0';
  public snows:Snow[]=[];  
  public snows2:Snow[]=[];  
  public snow:any;
  //fin snow
  //switch para mostrar el modal de mensaje al restablecer valores por defecto
   public switchModalCardRentDefault:any=false;

  //switch para mostrar/ocultar feedback de location
  public switchDivFeedback:any;
  //switch para mostrar/ocultar feedback de valoraciones
  public switchDivFeedback2:any;

  public swDivFeedback:any;
  public swDivFeedback2:any;
  //puntuación de ubicación
  public levelLocation:number=5;
  
  public feedbytitle:any;
  public typeFeedback:any;
  public switchDivMaps:any;

  //max-width de bannerp3 para mostrar correctamente el white-space
  public maxWidthBannerp3:any;
  public textbanner:any;
  //interval de lluvia
  private rainInterval:any;
  
//header flotante
  //switch para mostrar ocultar banner ([ngStyle])
  public activeHeader:any=false;

//menú principal (mainmenu)
  //switch para mostrar/ocultar de menú principal ([ngClass])
  public classMainMenu:boolean=false;
  //text mainmenu detail
  public textDetailMenu:Array<string>=[];
  //switch detalle menú principal
  public switchDetailMenu:any=false;  
  //suscripción a detailmenu
  public subscriptionDetailMenu:any;
//fin menú principal

  //suscripción para actualizar el section
  public subscriptionSection:any;
//número de section (comprobar si se puede sintetizar con sectionId)
  //public section:any;

  @ViewChild('section1',{static:true}) private section1!:ElementRef;
  @ViewChild('section2',{static:true}) private section2!:ElementRef;
  @ViewChild('section3',{static:true}) private section3!:ElementRef;
  @ViewChild('section4',{static:true}) private section4!:ElementRef;
  //section2
  //@ViewChild('midivslider',{static:true}) private midivslider!:ElementRef;
  //section1
  @ViewChild('backimage',{static:true}) private backimage!:ElementRef;
  @ViewChild('backimage2',{static:true}) private backimage2!:ElementRef;
  //section4
  //@ViewChild('bannerp1',{static:true}) private bannerp1!:ElementRef;
  //@ViewChild('bannerp2',{static:true}) private bannerp2!:ElementRef;
  //@ViewChild('bannerp3',{static:true}) private bannerp3!:ElementRef;

  constructor(
    private titleService:Title,
    private _cardrentService:CardrentService,
    private _cardService:CardService    
  ) {
    this.typeFeedback=true;
    this.titleService.setTitle("Arroyo Frío");

    
    
    //cargamos la primera card para que la transición tome efecto desde la primera vez
    //this.selectedCard=CardRentData.midata[0];
    /*
    let cardrents=this._cardrentService.getCardRents().subscribe(
      response => {
        this.selectedCard=response[0];
      },
      error => {

      }
    );
    */
    



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

    //no necesario
//objetos creados
    //this.cardrentdata=CardRentData.midata;
  }

  ngOnInit(): void {
    
    
    
    //comprobamos y almacenamos el ancho del section principal
    this.firstWidth=this.section1.nativeElement.clientWidth;
    //console.log(this.firstWidth);
    this.firstHeight=this.section1.nativeElement.clientHeight;
    //console.log(this.firstHeight);
    this.setSectionByScroll()

    //actualizamos el ancho para los mensajes deslizantes de valoraciones

    //establecemos overflow hidden genérico a la etiqueta html para que no se pueda
    //hacer scroll entre sections, se podría hacer un event scrollWheel para detectar
    //2 o 3 veces la rueda y cambiar de section, aunque solo podría ser en algunos sections
    //pk existe scrolling en div internos en algunos de los sections
    document.getElementsByTagName("html")[0].style.overflow="hidden";
    
    
    window.addEventListener("resize",(e)=>{
      //console.log(this.section4.nativeElement.getBoundingClientRect().top)
    //evitamos scrollear a 0 si no es necesario
      
      //console.log(window.scrollY)
      //this.selectedSection.styletop=0
      //console.log(this.selectedSection.scrollTop)
//probamos al final
      //this.selectedSection.scrollIntoView();
      //console.log("se esta moviendo:",e);      
      this.hideSnow();
//revisar si no es necesario
      this.setSectionByScroll();
      this.firstWidth=this.section1.nativeElement.clientWidth;
      //console.log("nuevo firstWidth: ",this.firstWidth)
      //console.log(this.firstWidth=this.section1.nativeElement.clientWidth)
      this.selectedSection.scrollIntoView();
    })

      
      //console.log("thissnow: ",this.snows)
    

    
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
    }
    //suscripción detailMenu
    this.subscriptionDetailMenu = this._cardService.detailMenu$.subscribe(()=> {
        //console.log("suscripción home.component");
        this.textDetailMenu=this._cardService.getDetailMenu();
    })
    //suscripción section
    this.subscriptionSection = this._cardService.section$.subscribe(()=> {        
        let section=this._cardService.getSection();
        this.setSection(section);
    })

    //set default card
    //this._cardService.setSelectedCard(this.cardrentdata[0])
    //this.selectedCard=this.cardrentdata[0];
    
  }
  //switch que permite mostrar/ocultar el div del feedback de location
  switchDivFeed(data:any){
    /*
    if(data && data.type == "location")    
      this.switchDivFeedback=data.value;
      
    else if(data && data.type == "feedback"){
      this.switchDivFeedback2=data.value;
//console.log(this.switchDivFeedback2)
    }
    */
    this.swDivFeedback=data;
         
      
    //this.switchDivMaps=value;
//console.log("data desde switchDivFeed: ",data)
  }  
  
  
  

  miPrueba(){
    console.log("prueba de mostrar mapa")
  }
  
  //establecer section mediante scroll
  setSectionByScroll(){
    //alto total del scroll (por si recarga la página detectar y seleccionar el section)    
    let scrollY=window.scrollY;
    //console.log("desde setSectionByScroll(): ",scrollY)    
    //alto de cada section
    let sectionSize=window.innerHeight;
    //console.log("desde setSectionByScroll(): ",sectionSize)
    //seleccionamos el section seleccionado por si se recarga la página
    for(let i=0;i<5;i++){
      if(window.scrollY == sectionSize * i 
        ){
        console.log("entra en el loop: ",i)
        let sect;        
          if(i==1){
            this.selectedSection=this.section2.nativeElement;
            this.sectionId=i+1;
            break;            
          }else if(i==2){
            this.selectedSection=this.section3.nativeElement;
            this.sectionId=i+1;
            break;
          }else if(i==3){
            this.selectedSection=this.section4.nativeElement;
            this.sectionId=i+1;
            break;
          }else if(i==4){
            this.selectedSection=this.section4.nativeElement;
            this.sectionId=i+1;
            break;
          }
          else{ 
            this.selectedSection=this.section1.nativeElement;
            this.sectionId=i+1;
            break;
          }
      }else{
        //console.log("NO entra en el loop")
      }      
    }
    //establecemos un section al cargar la página    
    this._cardService.setSection(this.sectionId);
  }
  //animación flash en section-home
  flash(){
    console.log("llega al falash")    
    //this.backimage.nativeElement.style.backgroundImage="url('../../assets/cerrada_de_elias_byn.png')";
    this.backimage2.nativeElement.className="back_image2 flash animated"
    setTimeout(()=>{
      this.backimage2.nativeElement.className="back_image2"
    },10000)
  }

  showTooltip(card:any){
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
  //console.log("counter: ",counterInterval);
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

  sendSection(data:any){
    this.toggleMainMenu();
    setTimeout(()=> {
      this.setSection(data);
    },300)
    
    /*
    if(data.firstwidth){
      //this.firstWidth=data.firstwidth;
      this.setSection(data.section);
      
    }
    */
    
    console.log(data)
  }
  
  //dirigir al section pasado por parámetro
  setSection(id:number){    
    if(id==1){
      this.selectedSection=this.section1.nativeElement;
      this.sectionId=1;
      this.buttonValue="home"
      console.log("al 1")
      this.selectedSection.scrollIntoView({behavior:"smooth"});       
    }else if(id==2){
      this.selectedSection=this.section2.nativeElement;
      this.sectionId=2;
      this.buttonValue="places"
      console.log("al 2")
      this.selectedSection.scrollIntoView({behavior:"smooth",block:"center"});
    }else if(id==3){
      this.selectedSection=this.section3.nativeElement;
      this.sectionId=3;
      this.buttonValue="rent"
      console.log("al 3")
      this.selectedSection.scrollIntoView({behavior:"smooth",block:"center"});
    }
    else if(id==4){
      this.selectedSection=this.section4.nativeElement;
      this.sectionId=4;
      this.buttonValue="gallery"
      console.log("al 4")

      this.selectedSection.scrollIntoView({behavior:"smooth",block:"center"});        
      console.log(this.section4.nativeElement.scrollTop);
    }
    
    console.log("tipo de botón: ",this.buttonValue)
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


  //rellenar base de datos con un array de objetos ya creado
  //pasado a buttongroup
  /*
  fillDB(){
    this.switchModalCardRentDefault=true;
    this._cardrentService.fillDB();        
  }
  */
  setAnimations(){
    this.animation1();
    this.animation2()
    this.rainAuto();
    setTimeout(()=> {
      this.flash();
    },6000)
  }

  //pasado a floatheader component
  /*
  showHeader(){
    //console.log("pasa por setHeader()")
    if(this.activeHeader)
      this.activeHeader=false;
    else
      this.activeHeader=true;
  }
  */

  
  toggleMainMenu(){

    if(this.classMainMenu){
      this.classMainMenu=false;
      this._cardService.setDetailMenu([]);
    }
    else
      this.classMainMenu=true;
    //console.log(this.classMainMenu)
  }

  



}
