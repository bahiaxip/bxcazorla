import { Injectable } from '@angular/core';
//importamos el subject para suscripciones
/*
import { Subject,Observable } from 'rxjs';
*/
import { Subject } from 'rxjs';
//importamos el cardservice para obtener el panel
import { CardService } from '../../services/card.service';
@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  //modal oculto para activities
  private subjectModalAct = new Subject<void>();
  public modalAct$ = this.subjectModalAct.asObservable();
  //imagen del modal de pantalla completa (imagen idéntica pero con mayor resolución)
  public imageModalBack:any;
  //interruptor del modal de pantalla completa (que añade la clase active o la elimina)
  public switchModalVar:boolean = false;
  //suscripción para mostrar o ocultar el modal de pantalla completa
  private subjectSwitchModal = new Subject<void>();
  public switchModal$ = this.subjectSwitchModal.asObservable();

  //imagen establecida en activities (imageAct:panel 0, imageAct2:panel 1)
  public imageAct:any;
  public imageAct2:any;
  //imagen establecida en modal de activities (imageModalAct:panel 0, imageModalAct2:panel 1)
  public imageModalAct:any;
  public imageModalAct2:any;

  public panel:any;

  constructor(private _cardService:CardService) {
    this.panel = this._cardService.getPanel();
  }

  //establecer imagen en modal para activities
  setModalAct(image:any){
    console.log("el image desde setmodalact: ",image)
    //reemplazamos el string de la imagen standard por la de mayor resolución (terminada en "_back.jog")
    let imageBack = image.replace('.jpg','_back.jpg');
    this.imageModalBack = imageBack;
    this.subjectModalAct.next();
  }

  //obtener la imagen establecida en el modal para activities
  getModalAct(){
    return this.imageModalBack;
  }

  //interruptor que muestra u oculta el modal para activities
  switchModal(){
    this.switchModalVar = (this.switchModalVar) ? false:true;
    this.subjectSwitchModal.next();
  }

  //obtener el estado del interruptor que muestra u oculta el modal para activities
  getSwitchModal(){
    return this.switchModalVar;
  }

  //establecer la imagen inicial o seleccionada en activities
  setImageAct(image:string){
    if(this.panel == 1){
      this.imageAct2 = image;
      this.setModalAct(image);
      this.imageModalAct2 = this.getModalAct();
    }else{
      this.imageAct = image;
      this.setModalAct(image);
      console.log("image desde activityservice: ",image)
    }
  }

  getImageAct(){    
    //devuelve la 
    if(this.panel == 1){
      return this.imageAct2;
    }else{
      return this.imageAct;  
    }

    
  }
}


