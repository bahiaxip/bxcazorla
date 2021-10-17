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
  
  ngOnInit(){

  }
}
