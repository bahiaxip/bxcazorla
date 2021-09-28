import { Injectable } from '@angular/core';
import { CardRent } from '../models/card-rent';
import { FormControl, FormGroup, Validators,FormArray } from '@angular/forms';
import { Subject,Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Global } from '../../shared/global';
import { CardRentData } from '../models/card-rent-data';
import { FeedbackRentData } from '../models/feedback-rent-data';
import { forkJoin,from, } from 'rxjs';
import { mergeMap,map,filter } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CardrentService {

  private url:string;

  private subjectBanner1 = new Subject<void>();
  public observableBanner1$ = this.subjectBanner1.asObservable();

  private banner2Subject = new Subject<void>();
  public banner2$ = this.banner2Subject.asObservable();

  private formCardRentSubject = new Subject<void>();
  public formCardRent$ = this.formCardRentSubject.asObservable();
//optimizar, ya que, los suscriptores actualizan tanto cuando es el 
//div location como el feedback, quizás mejor 2 suscripciones...
  private switchDivFeed = new Subject<void>();
  public switchDivFeed$ = this.switchDivFeed.asObservable();

  public cardRentsSubject = new Subject<void>();
  public cardRents$ = this.cardRentsSubject.asObservable();

  public selectedCardSubject = new Subject<void>();
  public selectedCard$ = this.selectedCardSubject.asObservable();

  private panelSubject = new Subject<void>();
  public panel$ = this.panelSubject.asObservable();

  private selFeedsSubject = new Subject<void>();
  public selFeeds$ = this.selFeedsSubject.asObservable();

  private heightInfoSubject = new Subject<void>();
  public heightInfo$ = this.heightInfoSubject.asObservable();

    

  //height del panel desplegable de información
  public heightInfo:any;
  //feedbacks del alojamiento seleccionado
  public selectedFeeds:any;
  //todos los feedbacks, más adelante serán todos por página
  public totalFeeds:any;
  //rentcard seleccionada
  public selectedCard:any;
  public typeCard:any;
  public banner1:any;
  public banner2:any;
  public images:Array<string>=[];
  //switch que permite mostrar/ocultar los 2 divs 
  //(rayitas de nivel de ubicación y estrellitas de nivel de valoraciones)
  public switchFeed:any;
  //slider de paneles dentro de cardrent
  private selectedPanel:any;

  public formCardRent = new FormGroup({
    name: new FormControl('',[Validators.required]),
    //omitido temporalmente
    //minNights: new FormControl('',[Validators.required]),
  //pasamos capacity mediante la directiva FormControl en lugar del
    //atributo FormControlName (ya que no actualiza el select)
    //capacity:new FormControl(),
  //pasamos capacity mediante la directiva FormControl en lugar del
    //atributo FormControlName  (ya que no actualiza el select) 
    //type:new FormControl('',[Validators.required]),
    web: new FormControl('',Validators.pattern("https://.*")),
    phone: new FormControl('',[Validators.required,Validators.minLength(6)]),
    //maps: new FormControl('',[Validators.required,Validators.pattern("https://www.google.*")]),
    maps: new FormControl('',[Validators.pattern("https://www.google.*")]),
    text: new FormControl(''),
    //omitido temporalmente
    //logo: new FormControl(''),
    //image: new FormControl(''),
    images: new FormControl(''),
    capacities:new FormControl(''),
    //capacities:new FormArray([]),
    capacity:new FormControl(''),
    //Validators.required da error en type
    type:new FormControl(''),
    /*
    services: new FormGroup({
      wifi:new FormControl(false),
      mascota:new FormControl(false),
      parking:new FormControl(false),
      piscina: new FormControl(false),
      spa: new FormControl(false),
      bar: new FormControl(false),
      restaurante: new FormControl(false),
      aa:new FormControl(false),
      sillaruedas:new FormControl(false),
      cuna:new FormControl(false),
      fumar:new FormControl(false)

    })
    */
  })

  
  constructor(private _http:HttpClient){
    this.url=Global.url;
  }

  /*
  fillDB(){
    //lista directa desde card-rent-data        
    //this.cardrentdata=CardRentData.midata;
    this.deleteCardRents().subscribe(
      response => {
        console.log("response desde deleteCardRents: ",response)
      },
      error => {

      }
    )
    this.deleteFeeds().subscribe(
      response => {
        console.log("feedbacks eliminados: ",response)
      },
      error => {

      }
    )
    this.deleteImages().subscribe(
      response => {
        console.log("imágenes eliminadas: ",response)
        let list=CardRentData.midata;        
          list.map((cardrent:any)=>{
            console.log("mi cardrent desde map: ",cardrent)      
            this.addCardRent(cardrent).subscribe(
              response => {
                if(response && response.id){
                  let id=response.id;
                  let listFeedback = FeedbackRentData.midata;
                  listFeedback.map((feedbackrent:any) => {
                    feedbackrent.rentId=id;
                    this.addFeedback(feedbackrent).subscribe();
                  })
                }
                console.log(response)
              },
              error => {

              }
            );
          })
      },
      error => {

      }
    )
  }
  */
  
  fillDB(){    
  //limpiar db de datos(cardrents,images,feedbacks), 2 posibles métodos  
    //método 1  
    /*
    this.deleteCardRents().pipe(
      mergeMap(()=> this.deleteFeeds()),
      mergeMap(()=> this.deleteImages()),
      
    ).subscribe(()=>{
      console.log("borrado")
    })
    */

    //método 2
    //eliminando todos los registros de alojamientos, todos los registros de
    //valoraciones y todos los registros de imágenes
    forkJoin(
      this.deleteCardRents(),
      this.deleteFeeds(),
      this.deleteImages()
    ).subscribe((res)=> {
      //muestra un array con los 3 mensajes
      console.log(res)
      //Cargar datos de alojamientos por defecto
      this.setNewData();
    })
  }

  //rellenar datos por defecto (cardrents,images,feedbacks)
  setNewData(){
    let list=CardRentData.midata;
    let listFeedback = FeedbackRentData.midata;
    from(list).pipe(
      mergeMap((card)=> this.addCardRent(card)),      
      mergeMap((res)=> from(listFeedback).pipe(        
        filter((feed)=>  feed.rentId=res.id)),
        //no funciona
        //mergeMap((res2)=> this.addFeedback(res2))
      )
    ).subscribe(
      response=> {
        if(response){
          this.addFeedback(response).subscribe(
            response=>{
              console.log(response)              
              //damos 5 segundos antes de refrescar
              setTimeout(()=>{
                window.location.reload();
              },5000)
            },
            error =>{
              console.log("Error: ",error)
            }
          );
        }
      },
      error => {
        console.log("Error: ",error)
      }
    )
  }

  addFeedback(feedback:any){
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this._http.post(this.url+'feedbackrent',feedback);
  }
  //establecemos los feeds filtrados por un alojamiento determinado
  setSelectFeeds(feeds:any){
    this.selectedFeeds = feeds;
    this.selFeedsSubject.next();
  }
  //establecemos todos los feeds devueltos anteriormente de la db
  setTotalFeeds(feeds:any){
    this.totalFeeds=feeds;
  }
  //todos los feedbacks de un rentcard(alojamiento)
  selectFeedbackByRent(card:any){
    //console.log(this.feedrentdata)    
    let listFeedback:any=[];
//cambiar por filter
    this.totalFeeds.map((feed:any)=>{
      //console.log("card desde selectFeedbackByRent(): ",card);
      if(feed.rentId==card._id){
        listFeedback.push(feed);
        //console.log("listFeedback: ",listFeedback)
      }
    })
    //this._cardrentService.setSelectFeeds(listFeedback)
    return listFeedback;
  }
  //obtenemos todos los feeds 
  getSelectFeeds(){
    return this.selectedFeeds;
  }
  //obtenemos todos los feedbacks de la db
  getFeedbacks():Observable<any>{
    return this._http.get(this.url+"feedbackrents");
  }
  //feedbacks por id, ahora no se utiliza
  getFeedbacksByRentId(id:string):Observable<any>{
    return this._http.get(this.url+"feedbackrents/"+id);
  }

  getSelectedCard(){
    return this.selectedCard;
  }

  setSelectedCard(card:CardRent){
    this.selectedCard=card;
    this.selectedCardSubject.next();
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
  //sirve para los 2 divs (estrellitas-> feedback, rayitas->location)
  setSwitchFeed(data:any){    
    this.switchFeed=data;
    this.switchDivFeed.next();
  }
  //sirve para los 2 divs (estrellitas-> feedback, rayitas->location)
  getSwitchFeed(){
    return this.switchFeed;
  }  

  setFormCardRent(form:any){
    console.log("establecemos dataos")
    this.formCardRent=form;
    this.formCardRentSubject.next();
  }
  getFormCardRent(){
    //console.log("pasamos dataos desde getFormCardRent()")
    return this.formCardRent;
  }

  addCardRent(cardrent:any):Observable<any>{
    let headers=new HttpHeaders({
      "Content-Type":"application/json"
    });
    console.log("llega al addCardRent...",cardrent)
    
    return this._http.post(this.url+"cardrent",cardrent,{headers:headers});  
    
    
    
  }
  //obtenemos todas las imágenes, más adelante serán con paginación
  getTotalImages(){
    this._http.get(this.url+'/images');
  }

  //recomendable optimizar subiendo o eliminando una a una y no todas 
  //cada vez
  setImages(images:Array<any>){  
    this.images=images;
    //console.log("estableciendo images en el service: ",this.images)
  }
  getImages(){
    return this.images;
  }

  uploadImages(images:any,id:string){
    return this._http.post(this.url+'images/'+id,images);
  }
  
  getCardRents():Observable<any>{
    return this._http.get(this.url+'cardrents');
  }

  setPanel(panel:any){
    this.selectedPanel=panel;
    this.panelSubject.next();
  }
  getPanel(){
    return this.selectedPanel;
  }
  

  deleteFeeds():Observable<any>{
    return this._http.delete(this.url+'feedbacks');
  }

  deleteCardRents():Observable<any>{
    return this._http.delete(this.url+'cardrents');
  }  
  deleteImages():Observable<any>{
    return this._http.delete(this.url+'images');
  }
  deleteCardRentById(id:string){
    return this._http.delete(this.url+'image/'+id);
  }

  setHeight(type:string,h:string){
    if(type=='info'){
      this.heightInfo = h;
      this.heightInfoSubject.next();
    }
  }
  getHeight(type:string){
    if(type=="info")
      return this.heightInfo;
  }

  
}
