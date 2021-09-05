import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CardRentData } from '../models/card-rent-data';
import { CardRent } from '../models/card-rent';
import { FeedbackRentData } from '../models/feedback-rent-data';
import { FeedbackRent } from '../models/feedback-rent';
import { PriceRentData } from '../models/price-rent-data';
//import { LevelPipePipe, IconTypePipe } from '../../level-pipe.pipe';
//import { PricePipe } from '../../pipes/price.pipe';
//import { MinimrentPipe } from '../../pipes/minimrent.pipe';
import { CardrentService } from '../services/cardrent.service';


@Component({
  selector: 'pre-card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.css']
})
export class CardContentComponent implements OnInit {  
  
  
//@Input(cardrentdata)
  public feedrentdata:any;
  public cardrentdata:any;
  public pricerentdata:any;
  //card seleccionada
  public selectedCard!:CardRent;

  public myHeight:string="0";
  //tipo de card seleccionada(feedback,location,phone,images, title,price)
  public selTypeCard:any;
  //tipo de card seleccionada en la selección anterior a la actual para poder mantener
  //el divFeedback cuando se pulsa imágenes
  public oldTypeCard:any;
  public fixedCloseGal:boolean=false;
  //switchImages sustituido por myHeight
  
  //array valoracion localización
  public levelLocation:number=5;
  //switch que indica si se ha pulsado un botón de la card o la card
  public pushedOptionCard:any;
  //mostrar ocultar distintos menu de tarifas
  public menuPrice:any=false;
  public menuPrice2:any=false;

  public pushedPrice:any;
  public intervalFeedText:any;
  //interruptor para no repetir interval() de rotación de mensajes de valoraciones
  public intervalFeedActive:boolean=false;

  constructor(
    private _cardService:CardrentService,
  ) {
    this.cardrentdata=CardRentData.midata;
    this.feedrentdata=FeedbackRentData.midata;
    this.pricerentdata = PriceRentData.midata;
    _cardService.setSelectedCard(this.cardrentdata[0]);
  }

  ngOnInit(): void {
  }

  selectFeedbackByRent(rentTitle:string){
    //console.log(rentTitle+" hola")
    let listFeedback:any=[];
    this.feedrentdata.map((feed:FeedbackRent)=>{
      if(feed.titleRent=="Apartamentos Martín"){
        listFeedback.push(feed);
      }
    })
    return listFeedback;
  }

  sendDataToExpansion(){

  }
  /*
  showImagesCard(card:CardRent){
    this.fixedCloseGal=true;
    this.selectedCard=card;
    console.log(card.listImages);
    //this.switchImages=true;
  }
  */
  //mostrar/ocultar div de feedback de location(rayitas) en home.component
  swDivFeed(value:boolean){
    this._cardService.setSwitchFeed({type:'location',value:value})    
  }
  //mostrar/ocultar div de feedback de feedbacks(estrellitas) en home.component
  swDivFeed2(value:boolean){
      this._cardService.setSwitchFeed({type:'feedback',value:value})      
  }

  resetFeed2Interval(){
    if(this.intervalFeedActive){        
      this.swDivFeed2(false);
      this.intervalFeedActive=false;
      //console.log("cerraado interval")
      clearInterval(this.intervalFeedText)        
    }
  }
  
  
  selectCard(card:CardRent){    

    if(card != this.selectedCard){
      if(!this.pushedOptionCard){        
        this.selTypeCard=null;
        this.swDivFeed(false);
        this.resetFeed2Interval();
        this._cardService.setBanner2("");        
      }
      this._cardService.setBanner1(card);      
    }
    //actualizamos card
    this._cardService.setSelectedCard(card);
    this.selectedCard=card;  
    if(this.pushedOptionCard){      
      this.pushedOptionCard=false;
    }
  }


  //el text puede ser un string o puede ser otra cosa:en feedback es un título,
  //aunque debería ser un id.
  //selectOptionCard(type:string,text:any=null){
  selectOptionCard(type:string,card:any){
    let totalText;
    
    //asignamos botón pulsado
    this.pushedOptionCard=true;

    if(card == this.selectedCard && this.selTypeCard != type
      || card != this.selectedCard || this.selTypeCard == "images"){
      console.log("entra en selectOptionCard")
      //actualizamos el tipo de botón pulsado
      this._cardService.setTypeCard(type);
      this.selTypeCard=type;
      
      //si el botón pulsado no es ni images ni feedback y el interval
      //se encuentra activo, limpiamos el interval y el div de valoraciones(estrellitas)
      if(type != "feedback" && type != "images" ||card !=this.selectedCard){
        console.log("es distinta card")
        this.resetFeed2Interval();
        this._cardService.setBanner2("");        
      }

      //si el botón pulsado no es location ni images limpiamos el div de nivel de ubicación(rayitas)
      if(type != "location" && type != "images"|| type == "images" && card != this.selectedCard){
        this.swDivFeed(false)
      }
      
      if(type == "feedback" || type == "images"){
        
        let selectedElement;
        selectedElement=type;        
        if(type == "feedback"){
          /*
          //si el feedback de valoraciones ya está activo no hacemos nada
          //este condicional sirve si se pulsa images
          if(this.intervalFeedActive){
            //no hacer nada
            console.log("no hacer nada");
            return;
          }else{
            //mostramos el div de feedback de valoraciones (estrellitas) 
            //que se encuentra en el componente padre (home.component)
            this.swDivFeed2(true);
          }
          */

          this.swDivFeed2(true);
          //almacenamos una lista de objetos para obtener los mensajes con selectFeedbackByRent
          //para después manejarlos
          let feed=this.selectFeedbackByRent(card.title);

          console.log("feed: ",feed)
          if(card.title){
            //asignamos el primer mensaje antes de iniciar el interval
            totalText='<span style="">'+feed[0].text+'</span>';
          }
        
          //iniciamos el interval con la lista de mensajes, comenzando por el segundo
          //(let num=1) la primera vez, ya que anteriormente hemos asignado el primer mensaje.
          let num=1;
          if(!this.intervalFeedActive){
            this.intervalFeedActive=true;
            this.intervalFeedText=setInterval(()=>{
              console.log("creado nuevo interval")
              totalText='<span style="">'+feed[num].text+'</span>'; 
              this._cardService.setBanner2({'selectedElement':'feedback',totalText,'card':this.selectedCard});                       
              //al llegar al final comenzamos de 0
              if(num==feed.length-1)
                num=0;
              else
                num++;
            },10000);  
          }       
          this._cardService.setBanner2({selectedElement,totalText,card});          
        }else if(type == "images"){          
          selectedElement=type;
          //enviamos un objeto en lugar de un string y detenemos
          this._cardService.setBanner2({selectedElement,totalText,card})          
        }

      }else{
        if(type=="capacity"){
          totalText='<span style="color:orange">Capacidad: </span><span style="font-size:16px;margin-left:10px">'+card.capacity+' personas</span>';
        }else if(type == "phone"){
          totalText='<span style="color:orange">Teléfono de contacto: </span><span style="font-size:16px;margin-left:10px">'+card.phone+'</span>';
        }else if(type == "location"){
          this.levelLocation = card.numLevelLocation;
          this.swDivFeed(true);
          totalText='<span style="color:orange;font-size:10px;user-select:none">Mostrar mapa </span>'+' <span class="material-icons" style="vertical-align:middle">share_location</span>';
        }
        this._cardService.setBanner2(totalText)        
      }
    }
  }

  editPrice(num:number){    
    if(num==1){
      if(this.menuPrice){
        this.menuPrice=false;
      }else{
        this.menuPrice=true;  
      }      
    }else if(num==2){
      if(this.menuPrice2){
        this.menuPrice2=false;
      }else{
        this.menuPrice2=true;  
      }
    }
  }

  divPrice(){
    if(!this.pushedPrice){
      this.menuPrice=false;
      this.menuPrice2=false;
    }else{
      this.pushedPrice=false;
    }
  }

  updatePrice(){
    console.log("edit")
    this.pushedPrice=true;

  }

  miPrueba(){
    console.log("prueba de mostrar mapa")
  }
  getLevelLocationString(card:any){
    //obtenemos una media de la localización... 
    //si es menor a 1 km : Excelente, si es entre 1 y 2 : muy bueno, si es entre 2 y 3: bueno
    if(card.numLevelLocation){}
  }


}
