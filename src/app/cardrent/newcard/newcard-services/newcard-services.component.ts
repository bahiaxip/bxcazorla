import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators,FormArray } from '@angular/forms';
@Component({
  selector: 'pre-newcard-services',
  templateUrl: './newcard-services.component.html',
  styleUrls: ['./newcard-services.component.css']
})
export class NewcardServicesComponent implements OnInit {
  @Output()
  changedCheckbox=new EventEmitter<any>();
  public services= new FormGroup({
      wifi:new FormControl(false),
      mascotas:new FormControl(false),
      parking:new FormControl(false),
      piscina: new FormControl(false),
      spa: new FormControl(false),
      cafetería: new FormControl(false),
      restaurante: new FormControl(false),
      aa:new FormControl(false),
      accesibilidad:new FormControl(false),
      cuna:new FormControl(false),
      fumar:new FormControl(false)

    })
  constructor() { }

  ngOnInit(): void {
  }

  cambio(){
    this.changedCheckbox.emit(this.services);
    //console.log(this.services);
  }

}
