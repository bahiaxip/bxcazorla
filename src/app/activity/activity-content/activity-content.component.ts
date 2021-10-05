import { Component, OnInit,Input } from '@angular/core';
import { GalleryPlaces } from '../../models/gallery-places';
//import { Places } from '../places';
@Component({
  selector: 'pre-activity-content',
  templateUrl: './activity-content.component.html',
  styleUrls: ['./activity-content.component.css']
})
export class ActivityContentComponent implements OnInit {
  @Input() places:any;
  @Input() places2:any;
  public switchModal:boolean=false;
  public switchModal2:boolean=false;
  public imageModal:string="";
  public textModal:string="";
  public titleModal:string="";
  //lista de lugares tipo GalleryPlaces (title,image, detail)
  //public places:Array<GalleryPlaces>;
  constructor() {
    //this.places=Places;
  }

  ngOnInit(): void {

  }

  showModal(place:GalleryPlaces){
    this.imageModal=place.image;
    this.textModal=place.detail;
    this.titleModal=place.title;
    console.log("detaller: ",place);
    if(this.switchModal2)
      this.switchModal2=false;
    this.switchModal=true;

  }
  showModal2(place:GalleryPlaces){
    this.imageModal=place.image;
    this.textModal=place.detail;
    this.titleModal=place.title;
    console.log("detaller: ",place);
    this.switchModal=false;
    this.switchModal2=true;    
  }
  hideFilter(i:number){
    /*
    if(this.selectActivity){
      console.log("l activity desde el condidiconal: ",this.selectActivity);
      this.selectActivity.getElementsByTagName("div")[0].style.opacity=1;
      this.selectActivity.getElementsByTagName("div")[0].style.backgroundColor="rgba(0,0,0,.4)";
      this.selectActivity.getElementsByTagName("img")[0].style.transform="scale(1)";  
    }
    console.log(i)
    let select=this.selectedSection.getElementsByTagName("span")[i];
    this.selectActivity=select;
    console.log("l activity: ",this.selectActivity);
    select.getElementsByTagName("div")[0].style.opacity=0;
    select.getElementsByTagName("div")[0].style.backgroundColor="rgba(0,0,0,0)";
    let image=select.getElementsByTagName("img")[0].style.transform="scale(0.9)";
    //console.log("primero :",image.src);
    */
  }
}
