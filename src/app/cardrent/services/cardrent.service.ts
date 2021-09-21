import { Injectable } from '@angular/core';
import { CardRent } from '../models/card-rent';
import { FormControl, FormGroup, Validators,FormArray } from '@angular/forms';
import { Subject,Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Global } from '../../shared/global';
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

  public selectedFeeds:any;
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

  addFeedback(feedback:any){
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this._http.post(this.url+'feedbackrent',feedback);
  }
  setSelectFeeds(feeds:any){
    this.selectedFeeds = feeds;
    this.selFeedsSubject.next();
  }
  getSelectFeeds(){
    return this.selectedFeeds;
  }

  getFeedbacks():Observable<any>{
    return this._http.get(this.url+"feedbackrents");
  }
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
    console.log("pasamos dataos")
    return this.formCardRent;
  }

  addCardRent(cardrent:any):Observable<any>{
    let headers=new HttpHeaders({
      "Content-Type":"application/json"
    });
    console.log("llega al addCardRent...",cardrent)
    
    return this._http.post(this.url+"cardrent",cardrent,{headers:headers});  
    
    
    
  }

  //recomendable optimizar subiendo o eliminando una a una y no todas 
  //cada vez
  setImages(images:Array<any>){
    this.images=images;
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

  
}
