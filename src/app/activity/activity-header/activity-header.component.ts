import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pre-activity-header',
  templateUrl: './activity-header.component.html',
  styleUrls: ['./activity-header.component.css']
})
export class ActivityHeaderComponent implements OnInit {
  
  
  @Input()
  titleProximity:any;
  constructor() { }

  ngOnInit(): void {
  }

}
