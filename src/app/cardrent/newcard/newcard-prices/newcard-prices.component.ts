import { Component, OnInit } from '@angular/core';
import { CardrentService } from '../../services/cardrent.service';
import { FormControl,FormGroup,FormArray,Validators } from '@angular/forms';
@Component({
  selector: 'pre-newcard-prices',
  templateUrl: './newcard-prices.component.html',
  styleUrls: ['./newcard-prices.component.css']
})
export class NewcardPricesComponent implements OnInit {

  public formCardRent:any;
  public listCapacity:any;
  public listtypeGroup:any;
  public subscriptionForm:any;

  constructor(private _cardrentService:CardrentService) {
    this.formCardRent = _cardrentService.getFormCardRent();
    this.listCapacity=this.formCardRent.controls.capacities.controls;
    this.listtypeGroup=this.formCardRent.controls.type.controls;
  }

  ngOnInit(): void {
    this.subscriptionForm= this._cardrentService.formCardRent$.subscribe(()=> {
      this.formCardRent = this._cardrentService.getFormCardRent();
      this.listCapacity=this.formCardRent.controls.capacities.controls;

      this.listtypeGroup=this.formCardRent.controls.type;
      console.log("listtyupeGroup: ",this.listtypeGroup)
      console.log("desde newcard.component listCapacity: ",this.formCardRent.controls)
      //this.listCapacities = this.formCardRent.controls.capacities;

    })
  }

}
