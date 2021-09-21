import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'pre-divlevel',
  templateUrl: './divlevel.component.html',
  styleUrls: ['./divlevel.component.css']
})
export class DivlevelComponent implements OnInit {

  @Input() numLevelFeedback:any;
  constructor() { }

  ngOnInit(): void {
  }

}
