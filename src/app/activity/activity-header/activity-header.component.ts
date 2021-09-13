import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pre-activity-header',
  templateUrl: './activity-header.component.html',
  styleUrls: ['./activity-header.component.css']
})
export class ActivityHeaderComponent implements OnInit {
  
  
  @Input()
  titleProximity:any;
  @Input()
  panel:any;
  @Output()
  sendToPanel= new EventEmitter<any>();
  //switch para que la primera vez no se muestre el efecto transition de opacidad
  // del icono de cambio de panel
  public switchTransitionFirst:any;
  constructor() { }

  ngOnInit(): void {    

  }

  sendPanel(panel:string){
    this.switchTransitionFirst=true;
    this.sendToPanel.emit(panel);
  }

}
