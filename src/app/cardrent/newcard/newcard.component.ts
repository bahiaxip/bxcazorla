import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators,FormArray } from '@angular/forms';
import { CardrentService } from '../services/cardrent.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pre-newcard',
  templateUrl: './newcard.component.html',
  styleUrls: ['./newcard.component.css']
})
export class NewcardComponent implements OnInit {

  @Output()
  modal=new EventEmitter<any>();
  
  public selectCapacity:any;
  //creamos listImages aquí en lugar de newcard-images, para poder limpiar
  //los dataTransfer al resetear el formulario, mediante el decorador Input
  public listImages:any=[];
  
  //public formCardRent = new FormGroup({})
  public formCardRent:any;
  //formGroup services
  public formServices:any;
  //objeto de envío
  public cardrent:any
  //objeto de envío
  public pricerent:any;

  private subscriptionForm :any;

  public listCapacities:any;
  public listCapacity:any;
  public listtypeGroup:any;
  constructor(private _cardrentService:CardrentService) {
    this.formCardRent=_cardrentService.getFormCardRent(); 
    console.log("formCardRent desde newcard: ",this.formCardRent)   
    //this.listCapacities = this.formCardRent.controls.capacities;
    this.listCapacity=this.formCardRent.controls.capacities.controls;
    this.listtypeGroup=this.formCardRent.controls.type.controls;
    //console.log("listCapacity: ",this.listCapacity)
  }

  ngOnInit(): void {
    //podríamos establecer un switch para evitar actualizar el formCardRent 2 veces
    //, si se establece desde aquí
    this.subscriptionForm = this._cardrentService.formCardRent$.subscribe(()=> {
      this.formCardRent = this._cardrentService.getFormCardRent();
      this.listCapacity=this.formCardRent.controls.capacities.controls;

      this.listtypeGroup=this.formCardRent.controls.type;
      console.log("listtyupeGroup: ",this.listtypeGroup)
      console.log("desde newcard.component listCapacity: ",this.formCardRent.controls)
      //this.listCapacities = this.formCardRent.controls.capacities;

    })

    //añadimos el formControl type y el formControl capacity al formCardRent
    //ya que nos genera error con la directiva formControlName.
    //Este error se debe a que es un select múltiple y eso implica asignar la  
    //directiva formArrayName, debiendo aplicar otro método similar a createFormArray(),
    //si no da errores, lo mantenemos así y evitamos crear otro método teniendo que crear
    // un nuevo FormArray con la misma cantidad de FormControl que de elementos 
    //seleccionados en el select
  }

  showModal(value:any){
    this.modal.emit(value);
  }
  

  addCapacity(data:any){
    if(data){
      console.log(data)
    }
  }

  updateServices(data:any){
    this.formServices=data;
    
  }

  onSubmit(){

    console.log(this.formCardRent)
    this.cardrent={
      title:this.formCardRent.controls.name.value,
      //minPrice:this.formCardRent.controls.capacities.controls[0].controls.priceBase,
      minPrice:null,
      //minNights:this.formCardRent.controls.capacities.controls[0].controls.minNights,
      minNights:null,
      //minCapacity:this.formCardRent.controls.capacities.controls[0].controls.capacity,
      minCapacity:null,
      capacity:this.formCardRent.controls.capacity.value,
      capacities:[],
      services:[],
      images:[],      
      logo:null,
      image:null,
      selectedImage:null,
      type:this.formCardRent.controls.type.value,
      web:this.formCardRent.controls.web.value,
      phone:this.formCardRent.controls.phone.value,
      numLevelFeedback:null,
      numLevelLocation:null,
      maps:this.formCardRent.controls.maps.value,
      text:this.formCardRent.controls.text.value,
    }
    this.cardrent.capacities=this.getCapacities()    
    this.cardrent.services=this.getServices()
    
    //las imágenes en otro método
    //this.cardrent.images=this.getImages();
    //console.log(this.cardrent.images);
    //if(this.cardrent.capacities && this.cardrent.title && this.cardrent.phone
      //&& this.cardrent.type)  

      //this.createCardRent();    
  }

  uploadImages(id:string){    
    let fd=new FormData();
    let images = this.getImages();
    if(images.length>0){
      for(let i=0;i<images.length;i++){
        fd.append("files",images[i]);
      }    
      this._cardrentService.uploadImages(fd,id).subscribe(
        response => {        
          if(response){
            console.log(response)
            //actualizamos la lista de rentcards (cardrent.component)
            this._cardrentService.cardRentsSubject.next();
            this.formCardRent.reset();
            this.listImages=[];
            this._cardrentService.setFormCardRent(this.formCardRent);
          }
        },
        error => {
          console.log("Error: ",error);
        }
      )  
    }
  }

  getCapacities(){    
    let capacities = this.formCardRent.controls.capacities.controls;
    let list;
    if(capacities){
      list = capacities.map( (capacity:any) => capacity.value);
    }    
    return list;    
  }
  getImages(){
    return this._cardrentService.getImages();
  }

  getServices():any{

    let services:Array<string>=[];
    //console.log("services antes: ",services)  
    if(this.formServices && this.formServices.controls){
      let listNameServices=Object.keys(this.formServices.controls);
      if(listNameServices.length>0)
        services = listNameServices.filter(
          (name:any)=> this.formServices.controls[name].value
        );
    }

    return services;  
  }

  //crear nuevo rentcard
  /*
  createCardRent(){
    //console.log("desde createCardrent: ",this.cardrent) 
    this._cardrentService.addCardRent(this.cardrent).subscribe(
  
      response=> {       
        if(response){
          console.log(response);          
          if(this._cardrentService.getImages().length>0){
            this.uploadImages(response.id)
          }else{
            //actualizamos la lista de rentcards (cardrent.component)
            this._cardrentService.cardRentsSubject.next();
            this.formCardRent.reset();
            this.listImages=[];
            this._cardrentService.setFormCardRent(this.formCardRent);
          }
        }
      },
      error => {
        //mensaje Error durante la creación del alojamiento
        console.log("Error newcard: ",error);
      }
    )
  }
  */
  /* anulado */
  /*
  boton(){
    //no necesario setValue() de cada uno, finalmente funciona asignando el ngFor
    //con el formArray creado con los formGroup y no con el array de capacity.value
    //this.formCardRent.controls.capacities.value[0].subtype="marrano"
    console.log(this.formCardRent);
  }
  */

  //creado para establecer con setValue() cada campo mediante su índice de cada elemento 
  //FormGroup() del FormArray() de capacities que pertenece a los elementos de la 
  //sección de tarifas del formulario
  //anulado, no necesario al solucionar el error del FormArray en el template, (solo 
  //establecía valores al último FormGroup() creado).
  //Para solucionarlo hemos modificado el array del ngfor desde el template,
  // sustituyendo el capacity.value.length por listCapacities.controls, generado
  //en el método createFormArray()
  /*
  changeData(d1:any,d2:any){
    console.log(d1)
    console.log(d2)
    console.log("cambio")
  }
  */
}
