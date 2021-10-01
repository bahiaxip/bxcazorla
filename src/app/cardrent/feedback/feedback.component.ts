import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CardService } from '../../services/card.service';
import { CardrentService } from '../services/cardrent.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pre-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  //@Input() selectedCard:any;
  public selectedCard:any;
  public subscriptionSelCard:any;
  public subscriptionSelFeeds:any;
  public subscriptionDivFeed:any;
  public selectFeeds:any;
  //propiedad height dinámica
  public heightPanel:string='0';
  //identificador de formulario activo
  public switchHeightForm:boolean=false;
  public formFeed = new FormGroup({
    nick:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
    text:new FormControl('',[Validators.required,Validators.minLength(3)]),
  })

  public scoreStars:number=0;
  public numLevelFeedback:number=0;

  constructor(
    private _cardService:CardService,
    private _cardrentService: CardrentService
  ){

  }

  ngOnInit(): void {
    this.subscriptionSelCard = this._cardrentService.selectedCard$.subscribe(()=> {
      this.selectedCard=this._cardrentService.getSelectedCard()
    })
    //lista de feedbacks asociados al cardrent seleccionado
    this.subscriptionSelFeeds = this._cardrentService.selFeeds$.subscribe(()=>{
      this.selectFeeds = this._cardrentService.getSelectFeeds();
      console.log("nueva lista de feedback: ", this.selectFeeds);
      console.log(this.selectedCard)
    })
    this.subscriptionDivFeed = this._cardrentService.switchDivFeed$.subscribe(() => {
      let param=this._cardrentService.getSwitchFeed();
      if(param && param.card){
        this.numLevelFeedback=param.card.numLevelFeedback;
      }else{
        this.numLevelFeedback=0;
      }
    })
    
  }

  onSubmit(){
    let cardrent=this._cardrentService.getSelectedCard();
    
    if(cardrent){
      let id=cardrent._id;
      console.log(id);
      let feed={
        nick:this.formFeed.controls.nick.value,
        email:this.formFeed.controls.email.value,
        text:this.formFeed.controls.text.value,
        feedback:this.scoreStars,
        rentId:id
      }
      
      //enviar petición con formFeed
      this._cardrentService.addFeedback(feed).subscribe(
        response => {
          console.log("response de feedback form: ",response)
          //reseteamos formulario y puntuación de las estrellas          
          this.formFeed.reset();
          this.scoreStars=0;
          //volver a cargar las valoraciones
          
        },
        error => {
          console.log("Error: ", error);
        }
      )
    }
  }
  switchForm(bol:any=false){
    if(bol){
      this.heightPanel='100vh';
      this.switchHeightForm=true
    }else if(!bol && this.heightPanel=='100vh'){
      this.heightPanel='0';
      this.switchHeightForm=false
    }
  }
  
  setPanel(side:number){
    this._cardService.setPanel(side);
  }
  //asignar puntuación en formulario de nuevo feedback
  setScore(score:number){
    this.scoreStars=score;
  }

  setDivFeed(){

  }
  

}
