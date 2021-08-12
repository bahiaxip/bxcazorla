import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GalleryItem, ImageItem} from 'ng-gallery';

import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'pre-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  private selectedSection:any=null;
  public images2:any;
  panelOpenState=false;
  images: any;
  private selectActivity:any;
  @ViewChild('section1',{static:true}) private section1!:ElementRef;
  @ViewChild('section2',{static:true}) private section2!:ElementRef;
  @ViewChild('section3',{static:true}) private section3!:ElementRef;
  @ViewChild('section4',{static:true}) private section4!:ElementRef;
  constructor() {
    //window.addEventListener("")
    //this.selectedSection=this.section1.nativeElement;
  }

  ngOnInit(): void {
    this.selectedSection=this.section1.nativeElement;
    document.getElementsByTagName("html")[0].style.overflow="hidden";
    
    window.addEventListener("resize",(e)=>{
      this.selectedSection.scrollIntoView();
      console.log("se esta moviendo:",e);
      console.log("el scrolltop es: ",this.section2.nativeElement.scrollTop)
    })
    
    //window.removeEventListener("scroll",disableScroll);

    this.images=[
      new ImageItem({
        src:'./assets/river.jpg',thumb:'./assets/id_unity.jpeg'
      }),
      new ImageItem({
        src:'./assets/rio_borosa.jpg',thumb:'./assets/id_unity.jpg'
      }),
      new ImageItem({
        src:'./assets/rio_cazorla.jpg',thumb:'./assets/id_unity.jpg'
      }),
      new ImageItem({
        src:'./assets/salto_organos.jpg',thumb:'./assets/id_unity.jpg'
      }),

    ];
  }

  enviar(id:number){
    if(id==1){
      this.selectedSection=this.section1.nativeElement;
      console.log("al 1")
      this.selectedSection.scrollIntoView({behavior:"smooth"});       
    }else if(id==2){
      this.selectedSection=this.section2.nativeElement;
      console.log("al 2")

      this.selectedSection.scrollIntoView({behavior:"smooth",block:"center"});  
      //this.section1.nativeElement.style.display="none"
      //this.section1.nativeElement.style.height="auto";
      console.log(this.section2.nativeElement.getBoundingClientRect().top)
      console.log(this.section2.nativeElement.scrollTop);
    }else if(id==3){
      this.selectedSection=this.section3.nativeElement;
      console.log("al 3")
      this.selectedSection.scrollIntoView({behavior:"smooth",block:"center"});  
    }
    else if(id==4){
      this.selectedSection=this.section4.nativeElement;
      console.log("al 4")
      this.selectedSection.scrollIntoView({behavior:"smooth",block:"center"});  
    }
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
  showModal(){
    console.log("detaller")
  }

}
