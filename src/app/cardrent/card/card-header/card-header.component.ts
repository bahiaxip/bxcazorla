import { Component, OnInit, Input, Output, ViewChild, ElementRef,EventEmitter } from '@angular/core';
import { CardService } from '../../../services/card.service';
import { CardrentService } from '../../services/cardrent.service';
import { CardRentData } from '../../models/card-rent-data';
import { CardRent } from '../../models/card-rent';
//import { LevelPipePipe, IconTypePipe } from '../../level-pipe.pipe';
//import { Subscription } from 'rxjs';

@Component({
  selector: 'pre-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.css']
})
export class CardHeaderComponent implements OnInit {
  
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
  
  //switch para mostrar/ocultar icono phone
  public switchDivContact:any;
  //switch para mostrar/ocultar icono capacity
  public switchDivCapacity:any;
  //max-width de bannerp3 para mostrar correctamente el white-space
  public maxWidthBannerp3:any;
  
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
  constructor(
    private _cardService:CardService,
    private _cardrentService:CardrentService
  ) {
//esto no sirve, puesto que no hay seleccionada ninguna por defecto, es
  //necesaria una suscripción
    this.selectedCard = _cardrentService.getSelectedCard();

    //this.selectedCard=CardRentData.midata[0];
    console.log("desde header: ",this.selectedCard)
  }

  ngOnInit(): void {    
    //actualizamos el ancho para los mensajes deslizantes de valoraciones
//necesario window.addEventListener(resize) para actualizar maxWidthBannerp3
    this.maxWidthBannerp3=this.bannerp3.nativeElement.parentElement.parentElement.clientWidth;

    this.subscriptionBanner1=this._cardrentService.observableBanner1$.subscribe(()=> {
      this.setBanner1(this._cardrentService.getBanner1());
    })
    this.subscriptionBanner2=this._cardrentService.banner2$.subscribe(()=> {
      this.setBanner2(this._cardrentService.getBanner2());      
    })
    this.subscriptionDivFeed=this._cardrentService.switchDivFeed$.subscribe(()=> {      
      this.switchDivFeed(this._cardrentService.getSwitchFeed());      
    })
    
    this.subscriptionSelectedCard = this._cardrentService.selectedCard$.subscribe(()=> {      
      let card=this.selectedCard;
      this.selectedCard = this._cardrentService.getSelectedCard();
    })

    window.addEventListener("resize",()=> {
      //para que el ancho de bannerp3 se actualice y realice el efecto 
      //white-space actualizamos maxWidthBannerp3 mediante el width del div padre (padre del padre)      
      this.maxWidthBannerp3=this.bannerp3.nativeElement.parentElement.parentElement.clientWidth;      
    })
  }
  
  //oculta todos los divs expandibles de card-header
  hideImagesCard(type:string){   
    this._cardrentService.setHeight("all","0");    
  }  

  showTooltip(card:any){
    console.log("dato");
  }

  dinamicMethod(){
    let miType=this._cardrentService.getTypeCard();
    let miCard=this._cardrentService.getSelectedCard();
    if(this.switchDivFeedback){
      this.setBanner2({selectedElement:"open_maps",card:miCard});
    }
    console.log("maxWidthBannerp3: ",this.maxWidthBannerp3)
    console.log("dinamicMethod: ",this.switchDivFeedback);
    console.log("dinamicMethod2: ",miType);
  }

  setBanner1(card:any){
  //console.log("datos desde SetBanner1: ",card.title)
    this._cardrentService.setSelectedCard(card);
    this.bannerp1.nativeElement.innerHTML=card.title;
  }
  //en setBanner2() no especificamos el tipo CardRent, al añadir otra propiedad y agruparla
  //en un nuevo objeto (el emit solo acepta un parámetro), esto es solo para
  //identificar si el botón pulsado es la imagen de la card. (recomendable 
  //optimizar identificando la pulsación de la imagen mediante otro método)
  setBanner2(card:any){

    //si el card es vacío (se ha pulsado el genérico un card distinto) limpiamos los 2 banners
    if(card == ""){      
      this.bannerp2.nativeElement.innerHTML="";
      this.bannerp3.nativeElement.innerHTML="";      
    }
    //si no es de tipo feedback, ni images, ni info limpiamos el tercer <p> 
    //(orientado a la rotación de mensajes de valoraciones, que van pasando una a una)    
    if(card.selectedElement && card.selectedElement != "feedback" 
      && card.selectedElement != "images" && card.selectedElement != "info" 
     // && card.selectedElement != "open_maps"
     )
      this.bannerp3.nativeElement.innerHTML="";  

    //comprobamos si es un objeto con propiedad selectedElement
    if(card.selectedElement  && card.selectedElement=="images"){

      //asignamos el card.card en lugar de utilizar el método getSelectedCard del servicio 
      //porque el emit se ejecuta antes(método selectOptionCard) y el card se establece 
      //después(método selectCard) mediante setSelectedCard() del servicio.      
      this.selectedCard=card.card;  
      this._cardrentService.setHeight("images","calc(100vh - 90px)");
    }else if(card.selectedElement && card.selectedElement=="open_maps"){
      this._cardrentService.setHeight("maps","calc(100vh - 90px)");
    }else if(card.selectedElement && card.selectedElement=="info"){
      this._cardrentService.setHeight("info","calc(100vh - 90px)");
    }else if(card.selectedElement && card.selectedElement=="feedback"){
      //limpiamos bannerp2
      this.bannerp2.nativeElement.innerHTML="";        
      
      //El tipo feedback se encuentra introducido dentro de un interval (creado en 
      //card.component.ts, método selectOptionCard()) que permite deslizar los mensajes,
      //para ello comprobamos si es la primera vez o se ha pulsado el botón feedback de otro card(posible opción),
      //o si está continuando el ciclo del interval (otra posible opción)

      if(this.bannerp3.nativeElement.innerHTML=="" || this.selectedCard != card.card){
        //PRIMERA VEZ interval;
        this.selectedCard=card.card;
        this.animationFeedback('hide',card);
        setTimeout(()=>{
          //para que no se mantenga el setTimeout() una vez seleccionado otro botón
          if(this.bannerp2.nativeElement.innerHTML=="" ){
            this.animationFeedback('visible');
          }
        },1000)  
      }else{
        //SEGUNDA VEZ
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
      this.bannerp2.nativeElement.innerHTML=card;  
    }    
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

//optimizar los 2 terniarios
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
    else if(data && data.type == "phone"){
      //si no viene card o numLevelLocation no viene null asignamos sin asignamos 0                 
      this.switchDivContact=data.value;
    }
    else if(data && data.type == "capacity"){
      this.switchDivCapacity=data.value;
    }
  }
  //slider de paneles
  setPanel(side:number){    
    let selectedCard = this._cardrentService.getSelectedCard();
    //Para acceder al panel de feedbacks es necesario tener seleccionado 
    //un alojamiento
    //console.log("selectedCard desde setPanel(): ",selectedCard)
  //al establecer el primero de la lista por defecto no es necesario este modal
    if(side == 0 && !selectedCard){
      this._cardrentService.setModal("Es necesario seleccionar un alojamiento para acceder al panel de valoraciones");
      return;
    }    
    this._cardService.setPanel(side);
  }
}