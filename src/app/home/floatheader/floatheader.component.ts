import { Component, OnInit } from '@angular/core';
import {CardService } from '../../services/card.service';
@Component({
  selector: 'pre-floatheader',
  templateUrl: './floatheader.component.html',
  styleUrls: ['./floatheader.component.css']
})
export class FloatheaderComponent implements OnInit {

  //header flotante
  //switch para mostrar ocultar banner ([ngStyle])
  public activeHeader:any=false;
  public weather:any;
  public tempWeather:any;
  public iconWeather:any;
  constructor(private _cardService:CardService) { }

  ngOnInit(): void {
    this.callWeather();
  }

  showHeader(){
    //console.log("pasa por setHeader()")
    if(this.activeHeader)
      this.activeHeader=false;
    else
      this.activeHeader=true;
  }
  callWeather(){
    //Fórmula Kelvin a Cesius -> C = K -273,15
    this._cardService.getWeather().subscribe(
      response=>{
        if(response){
          this.weather=response;
          this.tempWeather=this.getTempCelsius(response.main.temp);
          this.iconWeather=response.weather[0].icon;
          console.log("eiii:",response.weather[0].icon)

        }else{
          this.tempWeather="N/A"
          this.iconWeather="unknown"
        }
        console.log("response de weather: ",response)
        console.log(response.main.temp)
      },
      error => {

      }
    )
  }
  getTempCelsius(tempKelvin:any){
    let tmpKelvin=parseFloat(tempKelvin.toFixed(2));
    let kelvin = parseFloat(273.15.toFixed(2));
    let tempCelsius=(tmpKelvin-kelvin).toFixed();
    return tempCelsius;
  }

}
