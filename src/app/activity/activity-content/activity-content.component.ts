import { Component, OnInit,Input } from '@angular/core';
//import { GalleryPlaces } from '../../models/gallery-places';
//import { Places } from '../places';
@Component({
  selector: 'pre-activity-content',
  templateUrl: './activity-content.component.html',
  styleUrls: ['./activity-content.component.css']
})
export class ActivityContentComponent implements OnInit {
  
  
  constructor() {
    //this.places=Places;
  }

  ngOnInit(): void {


  }
  //efecto de seguimiento del cursor que va descubriendo y moviendo la imagen,
  //necesario evento mousemove y mouseout
  //con esta fórmula es necesario tener la imagen el doble de grande que la mostrada
  /*
  follow(event:any){
    let x = event.clientX;
    let y = event.clientY;
    event.path[0].style.backgroundPositionX=-x+'px';
    event.path[0].style.backgroundPositionY=-y+'px';
    event.path[0].style.backgroundImage="url('../../../assets/images/cazorla/galeria6.jpg')";
    console.log("hola")
    console.log(event)
  } 
  */
  //efecto con la misma imagen, es necesario aumentar el background-size
  //en CSS
  //anulado, no conveniente en este componente debido a incompatibilidad con scroll
  /*
  follow(event:any){
    let x = event.offsetX*0.2;
    console.log(event.movementX);
    console.log(event.clientX);
    let y = event.offsetY*0.2;    
    event.srcElement.style.backgroundPositionX=-x+'px';
    event.srcElement.style.backgroundPositionY=-y+'px';
  }
  follow2(event:any){
    event.srcElement.style.backgroundPosition='center';
    console.log("adios")
  } 
  */
}
