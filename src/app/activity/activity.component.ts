import { Component, OnInit,Input, ViewChild, ElementRef } from '@angular/core';
//import { GalleryPlaces } from '../models/gallery-places';
import { CardService } from '../services/card.service';
@Component({
  selector: 'pre-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  @Input()
  firstwidth:any;

  public selectedPanel:any;

  //suscripción para deslizar por los paneles horizontales
  public subscriptionPanel:any;

  @ViewChild('activity',{static:true}) private activity!:ElementRef;
  constructor(private _cardService:CardService){}

  ngOnInit(){
    //suscripción para dirigir al panel almacenado en el servicio (getPanel()) 
    this.subscriptionPanel = this._cardService.panel$.subscribe(()=> {
      let section=this._cardService.getSection();
      console.log("el section desde activity wow: ",section)
//si se cambia el section cambiar el número 3 por el correspondiente
      if(section==3){
        console.log("amos")
        let panel = this._cardService.getPanel();
        this.sendToPanel(this.firstwidth+'px','1s',panel)        
      }
      
    })

  }

  sendToPanel(size:string,duration:string,toPanel:number){ 

    //this.midivslider.nativeElement.style.transitionDuration=duration;    
    //this.section3.nativeElement.style.transform="translateX(-"+size+")";
  //solo 2 panels (panel-left,panel-right)
    this.activity.nativeElement.style.transitionDuration='1s';
    if(toPanel==0){
      this.selectedPanel=0;
      this.activity.nativeElement.style.transform="translateX(0px)";
    }else if(toPanel==1){
      this.selectedPanel=1;
      this.activity.nativeElement.style.transform="translateX(-"+size+")";  
    }
    console.log(this.selectedPanel)
    
  }
}
