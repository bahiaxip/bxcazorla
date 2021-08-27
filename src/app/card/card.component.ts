import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CardRentData } from '../models/card-rent-data';
import { CardRent } from '../models/card-rent';
import { FeedbackRentData } from '../models/feedback-rent-data';
import { FeedbackRent } from '../models/feedback-rent';
import { LevelPipePipe, IconTypePipe } from '../level-pipe.pipe';

@Component({
  selector: 'pre-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

//@Input(cardrentdata)
  public feedrentdata:any;
  public cardrentdata:any;
  //card seleccionada
  public selectedCard!:CardRent;

  public myHeight:string="0";
  //tipo de card seleccionada(feedback,location,phone,images, title,price)
  public selTypeCard:any;

  public fixedCloseGal:boolean=false;
  //switchImages sustituido por myHeight
  //public switchImages=false;
  public switchDivFeedback:any;
  //array valoracion localización
  public levelLocation:number=5;

  public pushedOptionCard:any;

  public intervalFeedText:any;
  //interruptor para no repetir interval() de rotación de mensajes de valoraciones
  public intervalFeedActive:boolean=false;

  
  constructor() {
    this.cardrentdata=CardRentData.midata;
    this.feedrentdata=FeedbackRentData.midata;
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
  showImagesCard(card:CardRent){
    this.fixedCloseGal=true;
    this.selectedCard=card;
    console.log(card.listImages);
    //this.switchImages=true;
    this.myHeight="calc(100vh - 90px)";
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
      //this.bannerp2.nativeElement.innerHTML="";
    }
    //this.selTypeCard=null;
    this.selectedCard=card;
    //detecta si se ha pulsado el option card 
    if(this.pushedOptionCard){
      console.log("se ha pulsado optioncard")
      this.pushedOptionCard=false;
    }
    //this.bannerp1.nativeElement.innerHTML=card.title;
  }
  selectOptionCard(type:string, text:any=null){
    let totalText;
    let aux;
    let div;
    this.pushedOptionCard=true;
    console.log("la seleccionada anterior es: ",this.selTypeCard)
    //si la anterior era feedback y la nueva seleccionada no lo es:
    // limpiamos el interval() que rota los mensajes de valoraciones
    if(type!="feedback" && this.selTypeCard == "feedback"){
      this.intervalFeedActive=false;
      clearInterval(this.intervalFeedText)
    }
    this.selTypeCard=type;
    console.log("type antes de feedback: ",type)
    

    
    if(type=="feedback"){ 
      //aux=text;
      let feed=this.selectFeedbackByRent(text);
      if(text){
        
        totalText=`
            <div style="">
            <span class="material-icons feed_level">star</span>
            <span class="material-icons feed_level">star</span>
            <span class="material-icons feed_level">star</span>
            <span class="material-icons feed_level">star</span>
            <span class="material-icons feed_level">star</span>
            </div>            
            `+'<span style="">'+feed[0].text+'</span>';
        console.log("mi feed: ",feed)
      }
      let num=0;
      if(!this.intervalFeedActive){
        this.intervalFeedActive=true;
        this.intervalFeedText=setInterval(()=>{
          console.log("creado nuevo interval")
          totalText=`
              <div style="">
              <span class="material-icons feed_level">star</span>
              <span class="material-icons feed_level">star</span>
              <span class="material-icons feed_level">star</span>
              <span class="material-icons feed_level">star</span>
              <span class="material-icons feed_level">star</span>
              </div>            
              `+'<span style="">'+feed[num].text+'</span>';
          //this.bannerp2.nativeElement.innerHTML=totalText;
          console.log("interval de valoraciones, feed: ",num)

          if(num==feed.length-1)
            num=0;
          else
            num++;

        },10000);  
      }
      
      //totalText="mifeedback"
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
    //this.bannerp2.nativeElement.innerHTML=totalText;
    //this.textbanner='<span class="material-icons">share_location</span>';

  }
  getLevelLocationString(card:any){
    //obtenemos una media de la localización... 
    //si es menor a 1 km : Excelente, si es entre 1 y 2 : muy bueno, si es entre 2 y 3: bueno
    if(card.numLevelLocation){}
  }

}
