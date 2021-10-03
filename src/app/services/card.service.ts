import { Injectable } from '@angular/core';
import { CardRent } from '../models/card-rent';
import { Subject,Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  //text mainmenu detail
  public textDetailMenu:Array<string>=[];
  //switch detalle menú principal
  public switchDetailMenu:any=false;

  //observable para mostrar/ocultar detalle del menú principal
  private subjectDetailMenu = new Subject<void>();
  public detailMenu$ = this.subjectDetailMenu.asObservable();

  //observable para deslizar por panel
  //private subjectPanelActivity = new Subject<void>();
  //public panelActivity$ = this.subjectPanelActivity.asObservable();
  private subjectPanel = new Subject<void>();
  public panel$ = this.subjectPanel.asObservable();


  //observable para establecer y moverse entre los sections
  private subjectSection = new Subject<void>();
  public section$ = this.subjectSection.asObservable();
  //posición del panel (panel-left,center,panel-right)
  public panel:any;
  //sección seleccionada
  public selectedSection:any;
  
  constructor(private _http:HttpClient){}

  getWeather():Observable<any>{
    let headers = {
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
      'x-rapidapi-key' : '0e6d580fefmsh1b8736e3bdcfa1bp1e366bjsn7f9020d9f44c'
    }
    return this._http.get('https://community-open-weather-map.p.rapidapi.com/weather/',{params:{q:'Cazorla,es'},headers:headers});
  }



  setDetailMenu(type:any){   
    //this.textDetailMenu=[];     
    this.textDetailMenu=this.testType(type);
    this.subjectDetailMenu.next();
  }
  getDetailMenu(){
    return this.textDetailMenu;
  }
  //asigna el menú de opciones correspondiente al botón de cada section (mainmenu)
  //método llamado desde setDetailMenu(type)
  testType(type:string){
    let list=[];
    if(type=="arroyofrio"){
      console.log("arroyofrio")
      let arroyofrio=`Arroyo Frío es un municipio ubicado en el parque natural de Cazorla (Jaén),
        `;
        list.push(arroyofrio)
    }
    else if(type=="places"){
      let nearPlaces="Lugares cercanos a Arroyo Frío";
      let proxPlaces = "Lugares próximos a Arroyo Frío"
      list.push(nearPlaces);
      list.push(proxPlaces);
    }else if(type=="renting"){
      let rents="Buscador de alojamiento";
      let feedrent = "Valoraciones de alojamiento";
      let newrent="Publicar alojamiento";      
      list.push(rents);
      list.push(feedrent);
      list.push(newrent);
    }else if(type=="gallery"){
      let gallery="Galería de imágenes";
      list.push(gallery);
    }
    return list;
  }

  //establecemos section y el panel horizontal
  //el panel pueder entero o cadena si es número se debe convertir a string
  setPanel(panel:number){
    console.log("llega al servicio")
    let finalPanel=panel;
    //si el panel es número (viene del mainmenu.component.html mediante array ngFor)
    //if(typeof panel=="number"){
      //obtenemos el panel en formato string, correspondiente al section y al panel pasados      
      //finalPanel=this.getPanelFromNum(section,panel);
    //}
    //establecemos el panel a mostrar
    this.panel=finalPanel;    
    this.subjectPanel.next();
  }
  getPanel(){
    return this.panel;
  }
  //obtener el panel en string desde un número 
  /*
  getPanelFromNum(section:number,num:number){
    let panel="";
    //si el section es el 3
    if(section==3){
      if(num==0)
        panel='panel-left'
      else if(num==1)
        panel="panel-right"
    //si el section es el 4
    }else if(section==4){
      if(num==0)
        panel='panel-left';
      else if(num==1)
        panel='panel-center'
      else if (num==2)
        panel='panel-right'
    }
    return panel;
  }
  */

  setSection(section:number){
    this.selectedSection=section;
    this.subjectSection.next();
  }
  getSection(){
    return this.selectedSection;
  }


  





  /*
  showDetailMenu(type:string){
    //this.switchDetailMenu=false;
    let list=[];
    if(type=="places"){
      let nearPlaces="Lugares cercanos a Arroyo Frío";
      let proxPlaces = "Lugares próximos a Arroyo Frío"
      list.push(nearPlaces);
      list.push(proxPlaces);
    }else if(type=="renting"){
      let nearPlaces="Lugares cercanos a Arroyo Frío";
      let proxPlaces = "Lugares próximos a Arroyo Frío"
      list.push(nearPlaces);
      list.push(proxPlaces);
    }
    this.textDetailMenu=list;
    this.switchDetailMenu=true;
  } 
  */
  /*
  private subjectBanner1 = new Subject<void>();
  public observableBanner1$ = this.subjectBanner1.asObservable();

  private banner2Subject = new Subject<void>();
  public banner2$ = this.banner2Subject.asObservable();

  private switchDivFeed = new Subject<void>();
  public switchDivFeed$ = this.switchDivFeed.asObservable();

  public selectedCard:any;
  public typeCard:any;
  public banner1:any;
  public banner2:any;
  
  public switchFeed:any;
  constructor() { }

  getSelectedCard(){
    return this.selectedCard;
  }

  setSelectedCard(card:CardRent){
    this.selectedCard=card;
  }

  getCards(){
    //return this._http.get(this.url+"cardrents");
  }
  getTypeCard(){
    return this.typeCard;
  }
  setTypeCard(type:any){
    this.typeCard=type;
  }
  
  setBanner1(data:any){
    this.banner1=data;
    this.subjectBanner1.next();
  }
  getBanner1(){
    return this.banner1;
  }
  setBanner2(data:any){    
    this.banner2=data;
    this.banner2Subject.next();
  }
  getBanner2(){
    return this.banner2;
  }

  setSwitchFeed(data:any){
    this.switchFeed=data;
    this.switchDivFeed.next();
  }

  getSwitchFeed(){
    return this.switchFeed;
  }
  */





  
}
