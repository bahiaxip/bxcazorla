import { Component, OnInit, Input, Output, ViewChild, ElementRef,EventEmitter } from '@angular/core';
import { CardrentService } from '../../services/cardrent.service';
import { CardRentData } from '../../models/card-rent-data';
import { CardRent } from '../../models/card-rent';
//import { LevelPipePipe, IconTypePipe } from '../../level-pipe.pipe';

import { Subscription } from 'rxjs';

@Component({
  selector: 'pre-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.css']
})
export class CardHeaderComponent implements OnInit {

  @Output()
  emitWidth=new EventEmitter<any>();
  @Output()
  modal = new EventEmitter<any>();
  public lastBannerDom2:any;
  public lastSwitchDivInfo:any;
  //switch para mostrar/ocultar feedback de location
  public switchDivFeedback:any;
  public lastswitchDivFeedback:any;
  //puntuación de feedback general del alojamiento (Atributo para pre-divlevel)
  public numLevelFeedback:number=0;
  //puntuación de ubicación del alojamiento (Atributo para pre-divlevel2)
  public numLevelLocation:number=0;
  //switch para mostrar/ocultar feedback de valoraciones
  public switchDivFeedback2:any;
  public lastswitchDivFeedback2:any;
  public selectedCard:any;
  //max-width de bannerp3 para mostrar correctamente el white-space
  public maxWidthBannerp3:any;
  

  public myHeight:string="0";
  public myHeight2:string="0";
  public myHeightInfo:string="0";

  private subscriptionBanner1:any;
  private subscriptionBanner2:any;
  private subscriptionDivFeed:any; 
  private subscriptionHeightInfo:any;
  private subscriptionSelectedCard:any;


  //section4
  @ViewChild('bannerp1',{static:true}) private bannerp1!:ElementRef;
  @ViewChild('bannerp2',{static:true}) private bannerp2!:ElementRef;
  @ViewChild('bannerp3',{static:true}) private bannerp3!:ElementRef;
  constructor(private _cardService:CardrentService) {
//esto no sirve, puesto que no hay seleccionada ninguna por defecto, es
  //necesaria una suscripción
    this.selectedCard = _cardService.getSelectedCard();

    //this.selectedCard=CardRentData.midata[0];
    console.log("desde header: ",this.selectedCard)
  }

  ngOnInit(): void {    
    //actualizamos el ancho para los mensajes deslizantes de valoraciones
//necesario window.addEventListener(resize) para actualizar maxWidthBannerp3
    this.maxWidthBannerp3=this.bannerp3.nativeElement.parentElement.parentElement.clientWidth;

    this.subscriptionBanner1=this._cardService.observableBanner1$.subscribe(()=> {
      this.setBanner1(this._cardService.getBanner1());
    })
    this.subscriptionBanner2=this._cardService.banner2$.subscribe(()=> {
      this.setBanner2(this._cardService.getBanner2());      
    })
    this.subscriptionDivFeed=this._cardService.switchDivFeed$.subscribe(()=> {      
      this.switchDivFeed(this._cardService.getSwitchFeed());      
    })

    this.subscriptionHeightInfo= this._cardService.heightInfo$.subscribe(()=> {
      console.log("desde subscr: ",this._cardService.getHeight('info'))
      this.myHeightInfo=this._cardService.getHeight('info');
    })
    this.subscriptionSelectedCard = this._cardService.selectedCard$.subscribe(()=> {      
      this.selectedCard = this._cardService.getSelectedCard();
      console.log("selectedCard desde header con suscription: ",this.selectedCard)
    })


    window.addEventListener("resize",()=> {
      //para que el ancho de bannerp3 se actualice y realice el efecto 
      //white-space actualizamos maxWidthBannerp3 
      this.maxWidthBannerp3=this.bannerp3.nativeElement.parentElement.parentElement.clientWidth;
    })
  }

  ngOnChanges(){
    
    
  }

  hideImagesCard(type:string){
    console.log("el type: ",type)
    //this.fixedCloseGal=false;
    if(type=="images"){
      if(this.myHeight != "0")
        this.myHeight="0";
      if(this.myHeight2 != "0")
        this.myHeight2 = "0";
    }else if(type == "open_maps"){
      if(this.myHeight2 != "0")
        this.myHeight2="0";        
    }else{
        this.myHeight2 = "0"
        this.myHeight = "0"
        this.myHeightInfo="0";
    }
    console.log("type es: ",type)

    
  }
  updateHeight(data:any){
    this.myHeight=data.myHeight;
    this.myHeight2=data.myHeight2;
    console.log("desde updateHeight: ",data)
  }

  showTooltip(card:any){
    console.log("dato");
  }

  dinamicMethod(){
    let miType=this._cardService.getTypeCard();
    let miCard=this._cardService.getSelectedCard();
    if(this.switchDivFeedback){
      this.setBanner2({selectedElement:"open_maps",card:miCard});
    }
    console.log("maxWidthBannerp3: ",this.maxWidthBannerp3)
    console.log("dinamicMethod: ",this.switchDivFeedback);
    console.log("dinamicMethod2: ",miType);
  }

  setBanner1(card:any){
  //console.log("datos desde SetBanner1: ",card.title)
    this._cardService.setSelectedCard(card);
    this.bannerp1.nativeElement.innerHTML=card.title;    
    /*
    this.selectedCard=this._cardService.getSelectedCard();
    console.log(this.selectedCard); 
    this.bannerp1.nativeElement.innerHTML=title;
    this.myHeight="calc(100vh - 90px)";
    */
  }

  //en setBanner2() no especificamos el tipo CardRent, al añadir otra propiedad y agruparla
  //en un nuevo objeto (el emit solo acepta un parámetro), esto es solo para
  //identificar si el botón pulsado es la imagen de la card. (recomendable 
  //optimizar identificando la pulsación de la imagen mediante otro método)
  setBanner2(card:any){

    //si el card es vacío (se ha pulsado el genérico un card distinto) limpiamos los 2 banners
    if(card == ""){
      console.log("es blanco")
      this.bannerp2.nativeElement.innerHTML="";
      this.bannerp3.nativeElement.innerHTML="";      
    }

    //si no es de tipo feedback ni tampoco images, limpiamos el tercer <p> 
    //(orientado a la rotación de mensajes de valoraciones, que van pasando una a una)    
    if(card.selectedElement && card.selectedElement != "feedback" 
      && card.selectedElement != "images" && card.selectedElement != "info")
      this.bannerp3.nativeElement.innerHTML="";
  //console.log("pasamos a 0 duration y vemos el typecard: ",this._cardService.getTypeCard())
    //

    //si el objeto trae la propiedad selectedElement y es images mostramos imágenes
    if(card.selectedElement  && card.selectedElement=="images"){

      //asignamos el card.card en lugar de utilizar el método getSelectedCard del servicio 
      //porque el emit se ejecuta antes(método selectOptionCard) y el card se establece 
      //después(método selectCard) mediante setSelectedCard() del servicio.      
      this.selectedCard=card.card;  
      console.log("el card: ",this.selectedCard)    
      
      this.myHeight2="0";
      this.myHeight="calc(100vh - 90px)";
      console.log("myHeight desde setBanner2: ",this.myHeight)
      console.log("myHeight2 desde setBanner2: ",this.myHeight2)      
    }else if(card.selectedElement && card.selectedElement=="open_maps"){
      
      this.myHeight="0";
      this.myHeight2="calc(100vh - 90px)";
    }else if(card.selectedElement && card.selectedElement=="info"){
      console.log("desde card-header: ",card.selectedElement.numLevelFeedback)
      this.myHeight="0";
      this.myHeight2="0";
      this.myHeightInfo="calc(100vh - 90px)";
    }else if(card.selectedElement && card.selectedElement=="feedback"){
      //limpiamos bannerp2
      this.bannerp2.nativeElement.innerHTML="";        
      
      //El tipo feedback se encuentra introducido dentro de un interval (creado en 
      //card.component.ts, método selectOptionCard()) que permite deslizar los mensajes,
      //para ello comprobamos si es la primera vez o se ha pulsado el botón feedback de otro card(posible opción),
      //o si está continuando el ciclo del interval (otra posible opción)

      if(this.bannerp3.nativeElement.innerHTML=="" || this.selectedCard != card.card){

        //console.log("PRIMERA VEZ interval");        
        this.selectedCard=card.card;
        this.animationFeedback('hide',card);        
        
        setTimeout(()=>{
          //para que no se mantenga el setTimeout() una vez seleccionado otro botón
          if(this.bannerp2.nativeElement.innerHTML=="" ){
            this.animationFeedback('visible');
          }
        },1000)  
      }else{
        //console.log("SEGUNDA VEZ")
        this.bannerp3.nativeElement.style.transform="translateX(-"+(this.maxWidthBannerp3+200)+"px)";
        
        setTimeout(()=> {
          this.animationFeedback('hide',card);
             
          setTimeout(()=> {
            //para que no se mantenga el setTimeout() una vez seleccionado otro botón
            if(this.bannerp2.nativeElement.innerHTML==""){
              this.animationFeedback('visible');
            }
          },800)

        },800)
      }

    }else{
      console.log("pasa por aquí : ",card)     
      this.bannerp2.nativeElement.innerHTML=card;  
    }
    console.log("hace un setbanner2")
  }

  //animación de mensajes deslizantes de valoraciones
  animationFeedback(type:string,card:any=null){
    //moviendo el elemento(mensaje) a la derecha de forma oculta
    if(type=="hide" && card){
      this.bannerp3.nativeElement.style.opacity="0";
      this.bannerp3.nativeElement.style.transform="translateX("+(this.maxWidthBannerp3+200)+"px)";
      this.bannerp3.nativeElement.innerHTML=card.totalText;  
    }else if(type=="visible"){
      this.bannerp3.nativeElement.style.opacity="1";
      this.bannerp3.nativeElement.style.transform="translateX(0)";
    }
  }
  //permite mostrar/ocultar los 2 divs (rayitas:location, estrellitas:feedback)
  switchDivFeed(data:any){     
    if(data && data.type == "location"){
      (data.card && data.card.numLevelLocation) ?
        this.numLevelLocation=data.card.numLevelLocation:this.numLevelLocation=0;
      this.switchDivFeedback=data.value;
    }      
    else if(data && data.type == "feedback"){
      //si no viene card o numLevelLocation no viene null asignamos sin asignamos 0     
      (data.card && data.card.numLevelFeedback) ?
        this.numLevelFeedback=data.card.numLevelFeedback:this.numLevelFeedback=0;
      this.switchDivFeedback2=data.value;
    }
  }
  //slider de paneles
  setPanel(side:string){    
    let selectedCard = this._cardService.getSelectedCard();
    //Para acceder al panel de feedbacks es necesario tener seleccionado 
    //un alojamiento
    console.log("selectedCard desde setPanel(): ",selectedCard)
    if(side =="left" && !selectedCard){
      this.modal.emit("Es necesario seleccionar un alojamiento para acceder al panel de valoraciones");
      //console.log("mensaje debe seleccionar un alojamiento");
      return;
    }
    this._cardService.setPanel(side)  
    
    
  }  

}
