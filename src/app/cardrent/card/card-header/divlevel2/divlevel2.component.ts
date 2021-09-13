import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pre-divlevel2',
  templateUrl: './divlevel2.component.html',
  styleUrls: ['./divlevel2.component.css']
})
export class Divlevel2Component implements OnInit {
  @Input()
  levelLocation:any;
  constructor() { }

  ngOnInit(): void {
  }

}
