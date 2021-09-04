import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CardRentData } from '../models/card-rent-data';
import { CardRent } from '../models/card-rent';
import { FeedbackRentData } from '../models/feedback-rent-data';
import { FeedbackRent } from '../models/feedback-rent';
import { PriceRentData } from '../models/price-rent-data';
import { LevelPipePipe, IconTypePipe } from '../level-pipe.pipe';
import { PricePipe } from '../pipes/price.pipe';
import { MinimrentPipe } from '../pipes/minimrent.pipe';
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
    private _cardService:CardService,
  ) {
    this.cardrentdata=CardRentData.midata;
    this.feedrentdata=FeedbackRentData.midata;
    this.pricerentdata = PriceRentData.midata;
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
  //mostrar/ocultar div de feedback de location(rayitas) en home.component
  swDivFeed(value:boolean){
    this.switchDivFeed.emit({type:'location',value:value})
  }
  //mostrar/ocultar div de feedback de feedbacks(estrellitas) en home.component
  swDivFeed2(value:boolean){
     this.switchDivFeed.emit({type:'feedback',value:value}) 
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
        this.banner2.emit("");
      }
      this.banner1.emit(card);
    }
    /*
    if(card == this.selectedCard){
      console.log("es la misma")
      console.log("el tipo es: ",this.selTypeCard);
      console.log("el tipo es: ",this.oldTypeCard);
      if(this.selTypeCard == this.oldTypeCard
        || this.selTypeCard == "images"){
        console.log("no hacemos nada")
      }else{
        if(this.selTypeCard == "location"){          
          //this.levelLocation = card.numLevelLocation;

          this.swDivFeed(true);
        }else{
          this.swDivFeed(false);
        }
        if(this.selTypeCard == "feedback"){

        }
      }
    
    }else{      
      console.log("es distinta")
      if(!this.pushedOptionCard){
        
      }

    }
    */
    //console.log(this.selectedCard)  

    //actualizamos card
    this._cardService.setSelectedCard(card);
    this.selectedCard=card;  
    if(this.pushedOptionCard){      
      this.pushedOptionCard=false;
    }
//falla aquí o en selectOptionCard o en los 2
    //para no repetir el mismo botón de la card 
    /*   
    if(this.selTypeCard != null && this.oldTypeCard==this.selTypeCard && this.selectedCard == card){

      console.log("ultimo: ",this.selectedCard)
      return;
    }
    */
    //console.log("selTypeCard antes de condición location: ",this.selTypeCard);

/*
    //con la siguiente condición comprobamos:
    //1 -Si el anterior era location y se ha pulsado el card externamente (ninguno
    //de los botones del card) 
    //2- Si se ha pulsado el botón location del card o la galería de imágenes
    console.log("la seleccionada actual es: ",this.selTypeCard);
    if(this.selTypeCard=="location" 
      //|| this.selTypeCard=="images" && this.oldTypeCard=="location" 
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

    //si se ha pulsado el genérico de un card distinto al anterior
    //o se ha pulsado images de un card distinto al anterior
    //limpiamos banners (incluyendo divs de los 2 feedbacks e interval 
    //si se encuentra activo)
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
    

    //actualizamos oldTypeCard al final, para mantener el divFeedback cuando 
    //seleccionamos la opción de mostrar las imágenes y que no se oculte
    if(this.selTypeCard != "images")
      this.oldTypeCard=this.selTypeCard;
    //this._cardService.setBanner1(card.title);    
    this.banner1.emit(card);
    //this.bannerp1.nativeElement.innerHTML=card.title;
    //console.log("la pushedOptionCard es: ",this.pushedOptionCard);

    //volvemos a pasar a false si se ha pulsado un botón del card
    if(this.pushedOptionCard){      
      this.pushedOptionCard=false;
    }
*/
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
      console.log("llega")
      //actualizamos el tipo de botón pulsado
      this._cardService.setTypeCard(type);
      this.selTypeCard=type;
      
      //si el botón pulsado no es ni images ni feedback y el interval
      //se encuentra activo, limpiamos el interval y el div de valoraciones(estrellitas)
      if(type != "feedback" && type != "images" ||card !=this.selectedCard){
        this.resetFeed2Interval();
        this.banner2.emit("");
      }

      //si el botón pulsado no es location ni images limpiamos el div de nivel de ubicación(rayitas)
      if(type != "location" && type != "images"){
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
              this.banner2.emit({'selectedElement':'feedback',totalText,'card':this.selectedCard})          
              //al llegar al final comenzamos de 0
              if(num==feed.length-1)
                num=0;
              else
                num++;
            },10000);  
          }          
          this.banner2.emit({selectedElement,totalText,card});        
        }else if(type == "images"){          
          selectedElement=type;
          //enviamos un objeto en lugar de un string y detenemos
          this.banner2.emit({selectedElement,totalText,card})
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
        this.banner2.emit(totalText);
      }
    }

    
  }

  selectOptionCard2(type:string, text:any=null){
    let totalText;
    let aux;
    let div;
    //identificador de botón de card pulsado
    this.pushedOptionCard=true;
    console.log("la seleccionada anterior es: ",this.selTypeCard)
    //si el anterior botón pulsado era feedback y el nuevo seleccionado no lo es, 
    //a excepción del mismo feedback y el botón de images: 
    //limpiamos el interval() (que rota los mensajes de valoraciones)
    if(type != "feedback" && type != "images"){
      if(this.intervalFeedActive){
        this.intervalFeedActive=false;

        clearInterval(this.intervalFeedText)        
      }
    }
    /*
    if(type!="feedback" && type!="images" && this.selTypeCard == "feedback"
      || type!="feedback" && type!="images" && this.selTypeCard == "images"      
      ){

      this.intervalFeedActive=false;
      clearInterval(this.intervalFeedText)
    }
    */

    //actualizamos el tipo de botón pulsado
    this._cardService.setTypeCard(type);
    this.selTypeCard=type;
    //para no repetir el mismo botón de la card
    
    //console.log("type antes de feedback: ",type)
    
    if(type=="feedback"){
      //si el feedback de valoraciones está activo no hacemos nada
      if(this.intervalFeedActive){
        //no hacer nada
        console.log("no hacer nada");
        return;
      }
      /*
      if(this.selTypeCard != null && this.oldTypeCard==this.selTypeCard){
        //console.log("ultimo")
        return;
      } 
      */
      //mostramos el div de feedback de valoraciones (estrellitas) 
      //que se encuentra en el componente padre (home.component)
      this.swDivFeed2(true);
      //aux=text;
      //almacenamos una lista de objetos para obtener los mensajes con selectFeedbackByRent
      //para después manejarlos
      let feed=this.selectFeedbackByRent(text);
      console.log("feed: ",feed)
      
      if(text){
        //asignamos el primer mensaje antes de iniciar el interval
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
      //iniciamos el interval con la lista de mensajes,ya que,hemos asignado ya el primero.
      let num=1;
      if(!this.intervalFeedActive){
        this.intervalFeedActive=true;
        this.intervalFeedText=setInterval(()=>{
          console.log("creado nuevo interval")
          totalText=
          //pasado a la vista directamente
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
          this.banner2.emit(totalText)          
          //al llegar al final comenzamos de 0
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
      //console.log("llega a imaages")
      let selectedElement=type
      let card=text;

      //enviamos un objeto en lugar de un string y detenemos
      this.banner2.emit({selectedElement,card})
      return;
    }
    
    this.banner2.emit(totalText);
    //this.bannerp2.nativeElement.innerHTML=totalText;
    //this.textbanner='<span class="material-icons">share_location</span>';

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
