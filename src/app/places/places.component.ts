import { Component, OnInit,Input, ViewChild, ElementRef } from '@angular/core';
import { GalleryPlaces } from '../models/gallery-places';
import { CardService } from '../services/card.service';
import { Places,Places2 } from './places';
@Component({
  selector: 'pre-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  @Input()
  firstwidth:any;
  @Input()
  //misection:

  public switchModal:boolean=false;
  public switchModal2:boolean=false;
  public imageModal:string="";
  public textModal:string="";
  public titleModal:string="";
  //public selectedPanel:string="panel-left";
  public selectedPanel:number=0;

  //suscripción para deslizar por los paneles horizontales
  public subscriptionPanel:any;
  public places:Array<GalleryPlaces>=Places; 
  public places2:Array<GalleryPlaces>=Places2; 

  public headerTitle:string = "Lugares cercanos a Arroyo Frío";
  public headerTitle2:string = "Lugares próximos a Arroyo Frío";
  public icons:any;
  public icons2:any;
  public headerPanels:any;
  public headerPanels2:any;
  //section2
  @ViewChild('midivslider',{static:true}) private midivslider!:ElementRef;
  constructor(private _cardService:CardService) {

    this.textModal="";
    this.titleModal="";
  }

  ngOnInit(): void {
    this.headerPanels = {
      right: '1',
      tooltip_right:this.headerTitle2,
    }
    this.headerPanels2 = {
      left: '0',
      tooltip_left:this.headerTitle,
    }
    this.icons = {
      //section:2,    
      right:'1'
    }
    this.icons2 = {
      //section:2,
      left:'0',
    } 
    //suscripción para dirigir al panel almacenado en el servicio (getPanel()) 
    this.subscriptionPanel = this._cardService.panel$.subscribe(()=> {
      let section=this._cardService.getSection();
      //console.log("el section desde activity: ",section)
//si se cambia el section cambiar el número 2 por el correspondiente
      if(section==2){
        let panel = this._cardService.getPanel();
        this.sendToPanel(this.firstwidth+'px','1s',panel)        
      }
      
    })

    
    window.addEventListener("resize",(e)=>{
      let midivsliderStyle = this.midivslider.nativeElement.style
      //console.log("el divslider transform: ",midivsliderStyle);
      console.log("hola2: ",window.scrollY)
      if(midivsliderStyle.transform && midivsliderStyle!="translateX(0px)"){

        this.sendToPanel(this.firstwidth+'px','0s',this.selectedPanel);
      }
    });
  }

  sendToEmit(panel:number){
    console.log("enviando a :",panel)
    
    this.sendToPanel(this.firstwidth+'px','1s',panel);
    
  }
//llevarlo al servicio y este método y compartirlo con todos, sobre todo por la 
//duración de la transición, es necesaria para el event resize
  //cambiamos a suscripción , por tanto los hijos que tengan emit sse pueden sustituir
  //por suscripciones
  sendToPanel(size:string,duration:string,toPanel:number){    
    //this.midivslider.nativeElement.style.transitionDuration=duration;    
    //this.section3.nativeElement.style.transform="translateX(-"+size+")";
  //solo 2 panels (panel-left,panel-right)
    this.midivslider.nativeElement.style.transitionDuration='1s';
    if(toPanel==0){
      this.selectedPanel=0;
      this.midivslider.nativeElement.style.transform="translateX(0px)";
    }else if(toPanel==1){
      this.selectedPanel=1;
      this.midivslider.nativeElement.style.transform="translateX(-"+size+")";  
    }
    console.log(this.selectedPanel)
    
  }
  misectionHorizontal2(){
    
    
    
    
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
