import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'pre-newcard-images',
  templateUrl: './newcard-images.component.html',
  styleUrls: ['./newcard-images.component.css']
})
export class NewcardImagesComponent implements OnInit {

  @Output()
  modal=new EventEmitter<any>();

  public existsImg:boolean=false;
  public miimage:any;
  public listImages:any=[];

  constructor() { }

  ngOnInit(): void {
  }

  //eliminar imagen transferida mediante drag&drop
  deleteTransfer(index:any){
    console.log("arraiba:. ",this.listImages)    
    this.listImages.splice(index,1);
    if(this.listImages.length==0){
      this.existsImg=false;
    }
  }

  dropHandler(event:any){
    console.log("algo")
    event.preventDefault();
    if(event.dataTransfer.items){
      console.log("existen dataTransfer")
      // Usar la interfaz DataTransferItemList para acceder a el/los archivos)
      for(let i=0;i<event.dataTransfer.items.length;i++){        
        // Si los elementos arrastrados no son ficheros, rechazarlos
        if(event.dataTransfer.items[i].kind === 'file'){          
          var file = event.dataTransfer.items[i].getAsFile();
          


            var reader = new FileReader();
            if(file){
              if(file.type =="image/png" || file.type == "image/jpeg" 
              || file.type == "image/gif"){

                console.log("existe file: ",file)
                reader.readAsDataURL(file);
                reader.onload=() =>{
                  //console.log(reader.result)
                  if(this.existsImg){
                    this.listImages.push(reader.result);
                    //creamos otro div

                  }else{
                    
                    this.miimage=reader.result;  
                    this.listImages.push(this.miimage);
                    this.existsImg=true;
                  }
                  

                };
                reader.onerror = function(){
                  console.log(reader.error);
                }
              }else{
                //llamamos al modal y mostramos mensaje
                console.log("El archivo no es una imagen válida");
                this.modal.emit(true);
              }

            }            
            console.log("...file[" +i+"].name= "+file.name)  
            

        }        
      }
    }else{
      // Usar la interfaz DataTransfer para acceder a el/los archivos
      for(let i=0;i<event.dataTransfer.files.length;i++){
        console.log("...file["+i+"].name= "+event.dataTransfer.files[i].name);
      }
    }
    //Pasar el evento a removeDragData para limpiar
    this.removeDragData(event);
  }

  removeDragData(ev:any){
    console.log("eliminando drag data")
    if(ev.dataTransfer.items){
      //Usamos la la interface DataTransferItemList para eliminar el drag data
      ev.dataTransfer.items.clear();
      console.log("dataTransfer.items")
    }else{
      //Usar la interface DataTransfer para eliminar el drag data
      ev.dataTransfer.clearData();
      console.log("dataTransfer")
    }    
  }

  dragOverHandler(event:any){
    console.log("dragOverHandler");
    event.preventDefault();
  }

}
