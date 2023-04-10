import { Injectable } from '@angular/core';
//importamos el subject para suscripciones
/*
import { Subject,Observable } from 'rxjs';
*/
import { Subject } from 'rxjs';
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

  //establecer imagen en modal (activity.component) 
  setModalAct(activity:any){    
    this.imageModalBack = activity.imageModal;
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
}