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
  
  //public formCardRent = new FormGroup({})
  public formCardRent:any;

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
    this.subscriptionForm= this._cardrentService.formCardRent$.subscribe(()=> {
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

  onSubmit(){

  }
  

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
