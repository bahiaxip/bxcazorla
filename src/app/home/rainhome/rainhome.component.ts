import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Snow } from '../../models/snow';
//services 
import { CardService } from '../../services/card.service';

@Component({
  selector: 'pre-rainhome',
  templateUrl: './rainhome.component.html',
  styleUrls: ['./rainhome.component.css']
})
export class RainhomeComponent implements OnInit {
  @Input() firstwidth:any;
  @Output() emitFlash=new EventEmitter<any>();
  public snows:Snow[]=[];
  public snows2:Snow[]=[];
  //anulados
  //public switchOpacitySnow='1';
  //public switchOpacitySnow2='0';
  //switch para permitir volver a generar la animación lluvia
  public switchRain:any=false;
  //para ocultar las 2 animaciones de lluvia
  public switchAllOpacitySnow=false;
  //suscripción animación de lluvia
  public subscriptionRainAnimation:any;
  public rainInterval:any;

  constructor(private _cardService:CardService) { }

  ngOnInit(): void {
    this.switchAllOpacitySnow=true;
    this.subscriptionRainAnimation = this._cardService.rainAnimation$.subscribe(()=> {
      console.log("suscripción desde rainhome")
      this.setAnimations();
    })
  }
  //animación infinita (opcional cambiar, ya que no se va a realizar el mostrar y ocultar
  //de rainAuto() debido al consumo recursos)
  animation1(){
    for(let i=0;i<200;i++){
      this.snows[i]=new Snow(
      {
        //name:"./assets/images/snow/snow"+this.randomInteger(1,6)+".png",
        name:"../../../assets/images/snow/gota_agua3.png",
        animationName:this.setSpinAnimationName(),
        animationDuration:this.durationValue(this.randomFloat(4,8)),
      },
      -100,
      this.pixelValue(this.randomInteger(0,this.firstwidth)),
      "fade,drop",
      //this.durationValue(this.randomFloat(5,11)),
      this.durationValue(this.randomFloat(1,2)),
      this.setDelay(0,5)+ ', '+this.setDelay(0,5)
      );  
    }
  }
  //animación infinita (opcional cambiar, ya que no se va a realizar el mostrar y ocultar
  //de rainAuto() debido al consumo recursos)
  animation2(){
    for(let i=0;i<500;i++){
      this.snows2[i]=new Snow(
      {
        //name:"./assets/images/snow/snow"+this.randomInteger(1,6)+".png",
        name:"./assets/images/snow/gota_agua3.png",
        animationName:this.setSpinAnimationName(),
        animationDuration:this.durationValue(this.randomFloat(4,8)),
      },
      -100,
      this.pixelValue(this.randomInteger(0,this.firstwidth)),
      "fade,drop3",
      //this.durationValue(this.randomFloat(5,11)),
      this.durationValue(this.randomFloat(1,2)),
      this.setDelay(0,5)+ ', '+this.setDelay(0,5)
      );  
    }
  }
  //el rainAuto permite ocultar durante X segundos una de las animaciones y durante otros X
  // segundos las 2 animaciones, para después volver a comenzar el proces y mostrando una 
  //y luego otra y volver a ocultarlas y continuar con el bucle hasta llamar el clearInterval()
  //que finaliza el proceso.
  //Nota: Si no se llama a rainAuto() el proceso solo se realiza una vez y las animaciones
  //permanecen ocultas
  //anulado
  /*
  rainAuto(){
    //interval
      //interruptor bloqueo inicial
      let blockActive=false;
      //contador de cada interval
      let counterInterval=0;
      
      //let rainInterval = setInterval(()=>{
      this.rainInterval = setInterval(()=>{
        //si el interruptor no está bloqueado
        if(!blockActive){          
          if(this.switchOpacitySnow=='0'){
            this.switchOpacitySnow='1';
          
            setTimeout(()=>{
              this.switchOpacitySnow2='0';
              //si ya ha pasado el segundo interval ocultamos y bloqueamos
              if(counterInterval>1){
                setTimeout(()=>{
                  this.switchOpacitySnow='0';
                  blockActive=true;
                },3000)
              }
            },3000);
          
          }else{

            this.switchOpacitySnow2='1';
            setTimeout(()=>{
              this.switchOpacitySnow='0';
            },3000);

          }  
        }
        counterInterval++;
  //console.log("counter: ",counterInterval);
        //al llegar al interval 12 reinicia el contador a 0 y desbloquea
        if(counterInterval==12){
          counterInterval=0;
          blockActive=false;
        }
      },10000)
  }
  */
  setSpinAnimationName(){
    return (Math.random() < 0.5) ? 'clockwiseSpin':'counterclockwiseSpinAndFlip';
  }
  setDelay(d:number,d2:number){
    return this.durationValue(this.randomFloat(d,d2));
  }

  pixelValue(value:number){
    return value+'px';
  }

  durationValue(value:number){
    return value+'s';
  }
  randomInteger(low:number,high:number){
    return low + Math.floor(Math.random()*(high-low));   
  }

  randomFloat(low:number,high:number){
    return low + Math.random()*(high-low);
  }

  setAnimations(){
    if(!this.switchRain){
      this.switchRain=true;      
    this.animation1();
      //no iniciamos rainAuto() para que el proceso de animación se realice solo una vez
      //ha sido necesario cambiar la duración de la animación de infinite a unidades
      //this.rainAuto();
    setTimeout(()=> {
      this.emitFlash.emit();
    },6000)
    setTimeout(()=> {
      this.animation2()  
    },9000)
    //
    setTimeout(()=> {
      this.switchRain=false;
    },25000)
    }
    
  }

  endAnimations(){
    console.log("finaliza el interval")
    clearInterval(this.rainInterval)
  }

  evAnimation1(ev:any){
    console.log("event: ",ev)
  }

}
