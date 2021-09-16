import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { CardrentService } from '../../services/cardrent.service';
@Component({
  selector: 'pre-newcard-images',
  templateUrl: './newcard-images.component.html',
  styleUrls: ['./newcard-images.component.css']
})
export class NewcardImagesComponent implements OnInit {

  @Output()
  modal=new EventEmitter<any>();
  @Output()
  images=new EventEmitter<any>();

  public existsImg:boolean=false;
  //public miimage:any;
  public listImages:any=[];
  //public listFormData:any=[];
  public listFiles:any=[];
  constructor(private _cardrentService:CardrentService){

  }

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
    event.preventDefault();    
  
  //mayoría de navegadores (dataTransfer.items)
    if(event.dataTransfer.items){      
      // Usar la interfaz DataTransferItemList para acceder a el/los archivos)
      for(let i=0;i<event.dataTransfer.items.length;i++){        
        // Si los elementos arrastrados no son ficheros, rechazarlos
        //aunque el método showAndStoreFile ya incorpora una validación
        if(event.dataTransfer.items[i].kind === 'file'){ 
          let file = event.dataTransfer.items[i].getAsFile();
//necesario comprobar 2MB de archivo e incluir el else con el método dataTransfer()
          this.showAndStoreFile(file);
        }else{
          console.log("No es un archivo válido")
        }
      }
    }else{      
  // Usar la interfaz DataTransfer y su propiedad files para acceder a 
      //los archivos en I.E (ev.dataTransfer.files)
      if(event.dataTransfer.files){
        console.log("existen dataTransfer, files: ",event.dataTransfer.files)
      
        for(let i=0;i<event.dataTransfer.files.length;i++){
          let file=event.dataTransfer.files[i];
          //evitamos la validación, ya incorporada en showAndStoreFile()
          /*
          if(file.type==='image/jpeg' || file.type==="image/png"
            || file.type==="image/gif"){
          */
          
          this.showAndStoreFile(file);
          
          /*
          }else{
          
            console.log("No es un archivo válido")
          }
          */
        }
      }
    }
    //Pasar el evento a removeDragData para limpiar
    this.removeDragData(event);
  }
  //valida el archivo dataTransfer
  showAndStoreFile(file:any){
    var reader = new FileReader();
      if(file){
        //validación de extensión y medida
        //1048576 bytes = 1024 Kbytes = 1Mbytes
        //medida máxima 2MB
        let size=1048576 * 2;
        if(file.type =="image/png" && file.size <= size 
          || file.type == "image/jpeg" && file.size <= size
          || file.type == "image/gif" && file.size <= size){
          let formdata=new FormData();          
          formdata.append('file',file,file.name);
          reader.readAsDataURL(file);
        //pasando en onloadend el parámetro event y recogiendo con event.target.result
        //no funciona en este caso, pasamos sin parámetro el onloadend y
        //recogemos con el mismo reader, para evitar algunos errores, la lectura 
        //con el método readAsDataURL() se debe establecer antes de onloadend()
          reader.onloadend=() =>{
            let ima;
            if(this.existsImg){
              if(typeof reader.result === 'string'){
                ima=reader.result;                
              }else{
                console.log("no es string")
              }                    
              this.listImages.push(ima);
              //this.listFormData.push(formdata);
              this.listFiles.push(file);
            }else{
              if(typeof reader.result === 'string'){
                ima=reader.result;                
              }else{
                console.log("no es string")
              }
              console.log(file)              
              this.listImages.push(ima);
              //this.listFormData.push(formdata);
              this.listFiles.push(file);
              //switch que indica que existe al menos una imagen en la lista
              this.existsImg=true;
            }
            this._cardrentService.setImages(this.listFiles);
          };
          reader.onerror = function(){
            console.log(reader.error);
          }
        }else{
          //llamamos al modal y mostramos mensaje si no es de formato imagen
          console.log("El archivo no es una imagen válida");
          this.modal.emit(true);
        }
      }     
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
