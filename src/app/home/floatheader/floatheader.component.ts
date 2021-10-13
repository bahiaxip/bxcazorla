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
  public humidityWeather:any;
  public iconWeather:any;
  public infoWeather:any;

  constructor(private _cardService:CardService) { }

  ngOnInit(): void {
    //this.callWeather();
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
          let infoWeather=response.weather[0].main;
          this.infoWeather=this.getSpanishInfoWeather(infoWeather);
          this.humidityWeather=response.main.humidity
          console.log("eiii:",response.main.humidity)

        }else{
          this.tempWeather="N/A"
          this.iconWeather="unknown"
          this.humidityWeather="N/A"
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

  getSpanishInfoWeather(info:string){
    let spanishInfo="";
    switch(info){
      case 'Clouds':
        spanishInfo="Nublado";
        break;
      case 'Rain':
        spanishInfo="Lluvia";
        break;
      case 'Clear':
        spanishInfo="Despejado";
        break;
      case 'Drizzle':
        spanishInfo="Llovizna";
        break;
      case 'Snow':
        spanishInfo="Nieve";
        break;
      case 'Thunderstorm':
        spanishInfo="Tormenta";
        break;
      case 'Snow':
        spanishInfo="Nieve";
        break;
      default:
        spanishInfo="N/A";
        break;
    }
    return spanishInfo
  }
  animation(){
    this._cardService.setAnimation();
  }
}
