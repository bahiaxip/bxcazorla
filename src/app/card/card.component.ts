import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CardRentData } from '../models/card-rent-data';
import { CardRent } from '../models/card-rent';
import { FeedbackRentData } from '../models/feedback-rent-data';
import { FeedbackRent } from '../models/feedback-rent';
import { LevelPipePipe, IconTypePipe } from '../level-pipe.pipe';
import { CardService } from '../services/card.service';

@Component({
  selector: 'pre-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Output() banner1 = new EventEmitter<any>();
  @Output() banner2 = new EventEmitter<any>();
  //switch que muestra/oculta div feedback location
  @Output() switchDivFeed=new EventEmitter<any>();
//@Input(cardrentdata)
  public feedrentdata:any;
  public cardrentdata:any;
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

  public intervalFeedText:any;
  //interruptor para no repetir interval() de rotación de mensajes de valoraciones
  public intervalFeedActive:boolean=false;

  
  constructor(
    private _cardService:CardService,
  ) {
    this.cardrentdata=CardRentData.midata;
    this.feedrentdata=FeedbackRentData.midata;
    _cardService.setSelectedCard(this.cardrentdata[0]);
  }

  ngOnInit(): void {

    
  }

  selectFeedbackByRent(rentTitle:string){
    console.log(rentTitle+" hola")
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
  //mostrar/ocultar div de feedback de location en home.component
  swDivFeed(value:boolean){
    this.switchDivFeed.emit({type:'location',value:value})
  }
  //mostrar/ocultar div de feedback de feedbacks en home.component
  swDivFeed2(value:boolean){
     this.switchDivFeed.emit({type:'feedback',value:value}) 
  }
  
  
  selectCard(card:CardRent){ 
    if(this.myHeight != "0"){
      //this.myHeight="0";
    }   
    //para no repetir el mismo botón de la card    
    if(this.selTypeCard != null && this.oldTypeCard==this.selTypeCard){
      console.log("ultimo")
        return;
      }
    console.log("selTypeCard antes de condición location: ",this.selTypeCard);

    //con la siguiente condición comprobamos:
    //1 -Si el anterior era location y se ha pulsado el card externamente (ninguno
    //de los botones del card) 
    //2- Si se ha pulsado el botón location del card o la galería de imágenes
    if(this.selTypeCard=="location" 
      || this.selTypeCard=="images" && this.oldTypeCard=="location" 
      ){      
      this.levelLocation=card.numLevelLocation; 
      this.swDivFeed(true);           
    }
    else      
      this.swDivFeed(false);

    if(this.selTypeCard=="feedback"
      || this.selTypeCard=="images" && this.oldTypeCard=="feedback"){      
      this.swDivFeed2(true)

    }else
      this.swDivFeed2(false)

    //si no se ha pulsado ningún botón de la card y se ha seleccionada 
    //una nueva card limpiamos el segundo <p>(bannerp2)
    if(!this.pushedOptionCard && this.selectedCard!=card
      || this.selTypeCard=="images" && this.selectedCard!=card){      
      this.swDivFeed(false);
      this.swDivFeed2(false);
      //this.bannerp2.nativeElement.innerHTML="";
      this.banner2.emit("");
      if(this.intervalFeedActive ){
        this.intervalFeedActive=false;
        clearInterval(this.intervalFeedText)  
      }
      
    }
    
    //this.selTypeCard=null;
    //actualizamos card
    this._cardService.setSelectedCard(card);
    this.selectedCard=card;
    //detecta si se ha pulsado botón de la card (ha ejecutado selectOptionCard())
    if(this.pushedOptionCard){      
      this.pushedOptionCard=false;
    }

    //actualizamos oldTypeCard al final, para mantener el divFeedback cuando 
    //seleccionamos la opción de mostrar las imágenes y que no se oculte
    if(this.selTypeCard != "images")
      this.oldTypeCard=this.selTypeCard;
    //this._cardService.setBanner1(card.title);    
    this.banner1.emit(card);
    //this.bannerp1.nativeElement.innerHTML=card.title;
    console.log("la pushedOptionCard es: ",this.pushedOptionCard);
  }

  selectOptionCard(type:string, text:any=null){
    let totalText;
    let aux;
    let div;
    
    this.pushedOptionCard=true;
    console.log("la seleccionada anterior es: ",this.selTypeCard)
    //si la anterior era feedback y la nueva seleccionada no lo es:
    // limpiamos el interval() que rota los mensajes de valoraciones
    if(type!="feedback" && type!="images" && this.selTypeCard == "feedback"
      || type!="feedback" && type!="images" && this.selTypeCard == "images"      
      ){

      this.intervalFeedActive=false;
      clearInterval(this.intervalFeedText)
    }
    this._cardService.setTypeCard(type);
    this.selTypeCard=type;
    //para no repetir el mismo botón de la card
    if(this.selTypeCard != null && this.oldTypeCard==this.selTypeCard){
      console.log("ultimo")
        return;
      }
    console.log("type antes de feedback: ",type)
    
    if(type=="feedback"){ 
      this.swDivFeed2(true);
      //aux=text;
      let feed=this.selectFeedbackByRent(text);
      if(text){
        
        totalText=
        /*
        `
            <div style="">
              <span class="material-icons feed_level">star</span>
              <span class="material-icons feed_level">star</span>
              <span class="material-icons feed_level">star</span>
              <span class="material-icons feed_level">star</span>
              <span class="material-icons feed_level">star</span>
            </div>

        `+
        */
            '<span style="">'+feed[0].text+'</span>';
        //console.log("mi feed: ",feed)
      }
      let num=0;
      if(!this.intervalFeedActive){
        this.intervalFeedActive=true;
        this.intervalFeedText=setInterval(()=>{
          console.log("creado nuevo interval")
          totalText=
          /*
          `
              <div style="">
                <span class="material-icons feed_level">star</span>
                <span class="material-icons feed_level">star</span>
                <span class="material-icons feed_level">star</span>
                <span class="material-icons feed_level">star</span>
                <span class="material-icons feed_level">star</span>
              </div>            
          `+
          */
              '<span style="">'+feed[num].text+'</span>';
          //this.bannerp2.nativeElement.innerHTML=totalText;
          this.banner2.emit(totalText)
          //console.log("interval de valoraciones, feed: ",num)

          if(num==feed.length-1)
            num=0;
          else
            num++;

        },10000);  
      }
      /*
      let selectedElement=type;
      let card=text;
      this.banner2.emit({selectedElement,card})
      return;
      */
      
      
    }else if(type=="capacity"){      
      //if(text){        
      //  for(let i=0;i<text.length;i++){          
      //    if(i>0){
      //      list+',';
      //    }
      //    list+text[i];
      //  }
      //  console.log(list)
      //}
      
      totalText='<span style="color:orange">Capacidad: </span><span style="font-size:16px;margin-left:10px">'+text+' personas</span>';

    }else if(type=="phone"){
      totalText='<span style="color:orange">Teléfono de contacto: </span><span style="font-size:16px;margin-left:10px">'+text+'</span>';
    }else if(type=="location"){
      aux=text;
      totalText='<span style="color:orange;font-size:10px;user-select:none">Mostrar mapa </span>'+' <span class="material-icons" style="vertical-align:middle">share_location</span>';
    }else if(type=="images"){
      console.log("llega a imaages")
      let selectedElement=type
      let card=text;

      this.banner2.emit({selectedElement,card})
      return;
    }
    if(!text){
      console.log("mi text no existe")
    }else{
      console.log(totalText)
    }
    this.banner2.emit(totalText);
    //this.bannerp2.nativeElement.innerHTML=totalText;
    //this.textbanner='<span class="material-icons">share_location</span>';

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
