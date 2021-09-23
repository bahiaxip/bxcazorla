import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators, FormArray} from '@angular/forms';
import { CardrentService } from '../../services/cardrent.service';
@Component({
  selector: 'pre-newcard-inputs',
  templateUrl: './newcard-inputs.component.html',
  styleUrls: ['./newcard-inputs.component.css']
})
export class NewcardInputsComponent implements OnInit {

  public listCapacity:any;
  public listCapacities:any;

  public listTypeRent:Array<string>=[
    "casa","apartamento","bungalow","cabaña","piso","hotel"
  ];
  public lista:any;

  //capacity se obtiene fuera del formCardRent
  public capacity=new FormControl('',[Validators.required]);

  //type se obtiene fuera del formCardRent
  public type = new FormControl('',[Validators.required]); 

  public formCardRent:any;

  private subscriptionForm :any;

  constructor(private _cardrentService:CardrentService ){
    this.formCardRent=_cardrentService.getFormCardRent();
    console.log("- getting formcardrent from newcard-inputs to cardrentService: ", this.formCardRent);
    //creamos lista de las distintas capacidades de personas(del 1 al 10 
    //y convertimos en 9 con shift())
    this.lista=[...Array(10).keys()];    
    this.lista.shift();
  }

  ngOnInit(): void { 
    //podríamos establecer un switch para evitar actualizar el formCardRent 2 veces
    //, si se establece desde aquí   
    //de momento no actualizamos type ni capacity, ya que no se requiere actualizar
    //desde el componente tarifas
    this.subscriptionForm= this._cardrentService.formCardRent$.subscribe(()=> {
      this.formCardRent = this._cardrentService.getFormCardRent();
    })
  }

  //al seleccionar la o las capacidades se crea un FormArray() nuevo con un array 
  //de tipo FormGroup(), un FormGroup por cada capacidad seleccionada.
  createFormArray(){
      
      let list=new FormArray([],[Validators.required]);
      //creamos tantos como elementos de array capacity existan y se añaden en
      //el formArray
      for(let i=0;i<this.capacity.value.length;i++){          
          list.push(
            new FormGroup({
              capacity:new FormControl(this.capacity.value[i]),
              subtype : new FormControl('',Validators.required),
              minNights: new FormControl('',Validators.required),
              priceBase: new FormControl('',Validators.required),
              priceNight: new FormControl('',Validators.required)

            })
          );
      }
      this.listCapacities=list;
      //actualizamos la propiedad capacity y capacities del formGroup(formCardRent)
      this.formCardRent.controls.capacity=this.capacity;
      this.formCardRent.controls.capacities=this.listCapacities;
      //actualizar formGroup en el servicio
      this._cardrentService.setFormCardRent(this.formCardRent);
      //console.log("list al final: ",this.formCardRent.controls.capacities);
  }

  updateType(){

    
    //a diferencia de capacity, al ser solo un array de strings, se puede establecer
    //el array desde type.value sin tener que crear los formGroup de cada uno
    this.formCardRent.controls.type=this.type;

    //this.formCardRent.value.type=this.type.value;
    console.log(this.formCardRent);
    console.log(this.type)
    this._cardrentService.setFormCardRent(this.formCardRent)
    console.log("desde updateType(): ",this.formCardRent.controls)
  }

}
