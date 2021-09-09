import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormArray } from '@angular/forms';
@Component({
  selector: 'pre-newcard',
  templateUrl: './newcard.component.html',
  styleUrls: ['./newcard.component.css']
})
export class NewcardComponent implements OnInit {
  public lista:any;
  public listTypeRent:Array<string>=[
    "casa","apartamento","bungalow","cabaña","piso","hotel"
  ];
  public selectCapacity:any;
  public listCapacity:any;

  //capacity se obtiene fuera del formCardRent
  public capacity=new FormControl('',Validators.required);

  //type se obtiene fuera del formCardRent
  public type = new FormControl('',Validators.required);  
    
  public listCapacities:any;
  
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
    maps: new FormControl('',[Validators.required,Validators.pattern("https://www.google.*")]),
    text: new FormControl(''),
    //omitido temporalmente
    //logo: new FormControl(''),
    //image: new FormControl(''),
    images: new FormControl(''),
    capacities:new FormArray([]),
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
  })

  constructor() {
    this.lista=[...Array(10).keys()];
    this.lista.shift();
  }

  ngOnInit(): void {
    //añadimos el formControl type y el formControl capacity al formCardRent
    //ya que nos genera error con la directiva formControlName.
    //Este error se debe a que es un select múltiple y eso implica asignar la  
    //directiva formArrayName, debiendo aplicar otro método similar a createFormArray(),
    //si no da errores, lo mantenemos así y evitamos crear otro método teniendo que crear
    // un nuevo FormArray con la misma cantidad de FormControl que de elementos 
    //seleccionados en el select
    this.formCardRent.controls.type=this.type;
    this.formCardRent.controls.capacity=this.capacity;

  }

  addCapacity(data:any){
    if(data){
      console.log(data)
    }
  }

  onSubmit(){

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
      console.log("capacities: ",this.listCapacities.controls)

      this.formCardRent.controls.capacities=this.listCapacities;
      console.log("list al final: ",this.formCardRent.controls.capacities);
    
    
  }
  boton(){
    //no necesario setValue() de cada uno, finalmente funciona asignando el ngFor
    //con el formArray creado con los formGroup y no con el array de capacity.value
    //this.formCardRent.controls.capacities.value[0].subtype="marrano"
    console.log(this.formCardRent);
   
  }

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
