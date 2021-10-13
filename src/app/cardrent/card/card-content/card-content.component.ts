import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { CardRent } from '../../models/card-rent';

//import { LevelPipePipe, IconTypePipe } from '../../level-pipe.pipe';
//import { PricePipe } from '../../pipes/price.pipe';
//import { MinimrentPipe } from '../../pipes/minimrent.pipe';
import { CardrentService } from '../../services/cardrent.service';
import { Subscription,Observable } from 'rxjs';


@Component({
  selector: 'pre-card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.css']
})
export class CardContentComponent implements OnInit {  

  //@Output() modal=new EventEmitter<any>();
  
  private subscriptionCardRents:any;
  //public switchMenu1:any;
  //public switchMenu2:any;
  public listNights:any=[];
  //índice del array capacities seleccionado de los 2 menúes 
  //(indSelPson: de personas y indSeldNIght: de noches)
  public indSelPson:any=[];
  public indSelNights:any=[];
  //opción seleccionada de los 2 menús 
  //(selectedPersons: de personas y selectedNights: de noches)
  public selectedPersons:any=[];

  public selectedPrice:any=[];
  public selectedNights:any=[];
//@Input(cardrentdata)
  
  public feedrentdata:any;
  public cardrentdata:any;
  //public pricerentdata:any;
 
  //card seleccionada
  public selectedCard!:CardRent;

  public myHeight:string="0";
  //tipo de card seleccionada(feedback,location,phone,images, title,price)
  public selTypeCard:any;
  //tipo de card seleccionada en la selección anterior a la actual para poder mantener
  //el divFeedback cuando se pulsa imágenes
  //public oldTypeCard:any;
  //public fixedCloseGal:boolean=false;
  //switchImages sustituido por myHeight
  
  //array valoracion localización
  public levelLocation:number=5;
  //switch que indica si se ha pulsado un botón de la card o la card
  public pushedOptionCard:any;

  //pricerent
  //indice del card de alojamiento modificable mediante botón de menú 
  //de personas o noches
  //anulado, sustituido por menu1Active[] y menu2Active[]
  //public indexSelRent:any;
  //mostrar ocultar distintos menu de tarifas
  public menu1Active:any=[];
  public menu2Active:any=[];

  public pushedPrice:any;
  public intervalFeedText:any;
  //interruptor para no repetir interval() de rotación de mensajes de valoraciones
  public intervalFeedActive:boolean=false;

  //list cardrent
  //anulado
  //public cardrents:any;

  constructor(
    private _cardrentService:CardrentService,
  ) { }

  ngOnInit(): void {
    //el método getCardRents() establece un selectedCard por defecto
    this.getCardRents()
    this.getFeeds();

    this.subscriptionCardRents=this._cardrentService.cardRents$.subscribe(()=> {
      this.getCardRents();
    })    
  }

  //creamos un array de nights desde el mínimo de noches a 10 noches
    //a cada uno de los rentcards asociado mediante el índice
  createListNights(minNights:number,index:number){
    let lista = [...Array(11).keys()];
    lista.splice(0,minNights);    
    return lista;
  }
  //obtenemos todos los feedbacks de la db y filtramos por rentcard actual,
  //más adelante, habrá que realizarlo mediante paginación
  getFeeds(){
    this._cardrentService.getFeedbacks().subscribe(
      response => {
        //obtenemos todos los feeds
        this.feedrentdata=response.feedbacks;
        //los asignamos en el servicio 
        this._cardrentService.setTotalFeeds(response.feedbacks);
        //filtramos por rentcard seleccionada
        let feedsByRent=this._cardrentService.selectFeedbackByRent(this.selectedCard);
        //establecemos los feedbacks filtrados en el servicio para que, a continuación,
        //mediante la suscripción, el feedback component los actualice
        this._cardrentService.setSelectFeeds(feedsByRent);
      },
      error => {
        console.log("Error: ",error);
      }
    )
  }

  
  async getCardRents(){
    this._cardrentService.getCardRents().subscribe(
      response => {        
        this.cardrentdata=response.cardrents;
        //comprobamos si selectedCard no tiene aun ningún valor, por tanto,
        //es la primera vez que carga la página y establecemos uno por defecto
        if(!this.selectedCard){
          //console.log("no existe selectedCard")
        //establecemos el primero de la lista
          this.selectedCard=this.cardrentdata[0];
          this._cardrentService.setSelectedCard(this.selectedCard);          
        }
        
        this.cardrentdata.map((rent:any,index:number)=> {
          //console.log(rent)
          
          this.selectedPersons[index]=rent.capacities;
          //generamos un índice dinámico para poder omitir la opción
          //seleccionada en el menu seleccionable de personas, también
          //para identificar el elemento seleccionado de cada rentcard 
          this.indSelPson[index]=0;
          this.indSelNights[index]=0;

          //creamos la lista(array) de número de noches (desde el mínimo
          //establecido hasta 10) del primero de la lista de capacities ([0])
          this.listNights[index]=this.createListNights(rent.capacities[0].minNights,index);
          
          this.selectedPrice[index]=rent.capacities[0].priceBase;
          //Asignamos el número de noches(integer) como seleccionado estableciendo
          //el primero de la lista.
          //Es decir establecemos el primero(array de enteros) de la lista capacities (listNights)          
          //y el primer elemento(entero) de esa listNight
          this.selectedNights[index]=this.listNights[index][0];

          this.menu1Active[index]=false;
          this.menu2Active[index]=false;          
          //this.selectedNights[index]=rent.capacities[0].minNights;
        })
      },
      error => {
        console.log("Error: ",error);
      }
    )
  }

  selectFeedbackByRent(card:any){    
    let listFeedback:any=[];
    this.feedrentdata.map((feed:any)=>{
      if(feed.rentId==card._id){
        listFeedback.push(feed);        
      }
    })    
    return listFeedback;
  }
  
  //mostrar/ocultar div de feedback de location(rayitas)
  swDivFeed(value:boolean,card:any=null){
    //console.log("update swDivFeed")
    let data={type:'location',value:value,card:null};
    if(card)        
      data.card=card;    
    this._cardrentService.setSwitchFeed(data);
  }
  //mostrar/ocultar div de feedback de feedbacks(estrellitas) en home.component
  swDivFeed2(value:boolean,card:any=null){      
      let data={type:'feedback',value:value,card:null};
      if(card)
        data.card=card;      
      this._cardrentService.setSwitchFeed(data)      
  }

  //limpiar interval de rotación de mensajes de feedback (mostrado en 
  //card-header.component), tb oculta el div de estrellitas
  resetFeed2Interval(){
    if(this.intervalFeedActive){        
      this.swDivFeed2(false);
      this.intervalFeedActive=false;      
      clearInterval(this.intervalFeedText)        
    }
  }
  
  
  selectCard(card:CardRent){  
    //establecemos la condición: si el tipo de card es undefined, de esta forma sabemos
    //si es la primera vez que se selecciona, ya que, al seleccionar la primera vez
    // se establece en null o en alguno de los tipos específicos
    if(this.selTypeCard===undefined){
      console.log("es undefined")
    }else if(this.selTypeCard===null){
      console.log("es null");
    }
    if(card != this.selectedCard || this.selTypeCard === undefined){
      if(!this.pushedOptionCard){        
        this.selTypeCard=null;        
        this.swDivFeed(false);
        this.swDivFeed2(false,card);
        this.resetFeed2Interval();
        this._cardrentService.setBanner2("");        
      }
      //podríamos comprobar si el tipo es feedback, ya que en ese caso ya dispondría del
      //array de feedbacks de ese alojamiento y si no crearlo
      //console.log("tipo de card desde selectCard: ",this.selTypeCard)
      if(this.selTypeCard != "feedback"){
        let feed = this._cardrentService.selectFeedbackByRent(card);
        this._cardrentService.setSelectFeeds(feed);
      }
      this._cardrentService.setBanner1(card);      
    }
    //console.log("card: ",this.selectedCard);
    //actualizamos card
    this._cardrentService.setSelectedCard(card);
    this.selectedCard=card;  
    if(this.pushedOptionCard){      
      this.pushedOptionCard=false;
    }
    //this._cardrentService.setSelectedCard(card);
  }

  //el text puede ser un string o puede ser otra cosa:en feedback es un título,
  //aunque debería ser un id.  
  selectOptionCard(type:string,card:any){
  //mostramos modal de advertencia
  if(type=="delete"){
    this._cardrentService.setSelectedCard(card);
    this._cardrentService.setModal({card,text:"Está seguro que desea eliminar el alojamiento"});    
    return;
  }    
    let totalText="No existen valoraciones";    
    //asignamos botón pulsado
    this.pushedOptionCard=true;
    if(card == this.selectedCard && this.selTypeCard != type
      || card != this.selectedCard || this.selTypeCard == "images" || this.selTypeCard == "info"){
      console.log("entra en selectOptionCard")
      //actualizamos el tipo de botón pulsado
      this._cardrentService.setTypeCard(type);
      this.selTypeCard=type;
      
      //si el botón pulsado no es ni images ni feedback ni info y el interval
      //se encuentra activo, limpiamos el interval y el div de valoraciones(estrellitas),
      //limpiamos tb el banner2
  
      if(type != "feedback" && type != "images" && type != "info" 
        || card !=this.selectedCard && this.selectedCard != null){
        
        this.resetFeed2Interval();
        this._cardrentService.setBanner2("");
      }

      //si el botón pulsado no es location ni images ni info limpiamos el div de nivel de ubicación(rayitas)
      if(type != "location" && type != "images" && type!="info"
        || type == "images" && card != this.selectedCard){

        this.swDivFeed(false)
      }
      
      if(type == "feedback" || type == "images" || type =="info"){
        let selectedElement;
        selectedElement=type;        
        if(type == "feedback"){
          /*
          //si el feedback de valoraciones ya está activo no hacemos nada
          //este condicional sirve si se pulsa images
          if(this.intervalFeedActive){
            //no hacer nada
            console.log("no hacer nada");
            return;
          }else{
            //mostramos el div de feedback de valoraciones (estrellitas) 
            //que se encuentra en el componente padre (home.component)
            this.swDivFeed2(true);
          }
          */

          this.swDivFeed2(true,card);
          //almacenamos una lista de objetos para obtener los mensajes con selectFeedbackByRent
          //para después manejarlos
          console.log(card)
//tenemos que cargar los feedbacks correspondientes al id del alojamiento seleccionado
//tanto si pulsamos valoraciones como si pulsamos en el card(selectCard()), para luego 
//poder disponer de ellos desde el componente feedback
          let feed=this.selectFeedbackByRent(card);
          //comprobamos si existe algún feedback creado asignamos el primero
          if(card.title && feed && feed.length>0){            
            //asignamos el primer mensaje antes de iniciar el interval
            totalText='<span style="">'+feed[0].text+'</span>';
          }        
          //iniciamos el interval con la lista de mensajes, comenzando por el segundo
          //(let num=1) la primera vez, ya que anteriormente hemos asignado el primer mensaje.
          //además comprobamos si no existe interval y si existe más de un feedback creado(mínimo 2)
          let num=1;
          if(!this.intervalFeedActive && feed.length>1){
            this.intervalFeedActive=true;
            this.intervalFeedText=setInterval(()=>{
              console.log("creado nuevo interval")
              totalText='<span style="">'+feed[num].text+'</span>';               
              this._cardrentService.setBanner2({'selectedElement':'feedback',totalText,'card':this.selectedCard});                       
              //al llegar al final comenzamos de 0
              if(num==feed.length-1)
                num=0;
              else
                num++;
            },10000);  
          }
          
          this._cardrentService.setBanner2({selectedElement,totalText,card});          
        }else if(type == "images"){  
          selectedElement=type;
          //enviamos un objeto en lugar de un string y detenemos          
          this._cardrentService.setBanner2({selectedElement,totalText,card})          
        }
        else if(type=="info"){
          //console.log("el info desde selectOptioncard: ",totalText)
          selectedElement=type;
          //console.log("selectedElement: ",totalText)
          this._cardrentService.setBanner2({selectedElement,totalText,card})
          
        }
      }else{
        if(type=="capacity"){
          totalText='<span style="color:orange">Capacidad: </span><span style="font-size:16px;margin-left:10px">'+card.capacity+' personas</span>';
        }else if(type == "phone"){
          totalText='<span style="color:orange">Teléfono de contacto: </span><span style="font-size:16px;margin-left:10px">'+card.phone+'</span>';
        }else if(type == "location"){
          this.levelLocation = card.numLevelLocation;
          this.swDivFeed(true,card);
          totalText='<span style="color:orange;font-size:10px;user-select:none">Mostrar mapa </span>'+' <span class="material-icons" style="vertical-align:middle">share_location</span>';
        }        
        this._cardrentService.setBanner2(totalText)        
      }      
    }
  }
  //obtenemos el precio mediante el objeto capacities seleccionado 
  //y las noches actuales asignadas
  getPriceByList(listCapacities:any,indexCardRent:any){
    //asignamos precio base del capacities seleccionado
    let selectedPriceBase =listCapacities.priceBase;
    //asignamos el mínimo de noches
    let selectedMinNights = listCapacities.minNights;
    let price
    //comprobamos si las noches seleccionadas coinciden con el mínimo de noches
    if(selectedMinNights == this.selectedNights[indexCardRent]){
      price=selectedPriceBase;
    }else{
      let extraNights = this.selectedNights[indexCardRent] - selectedMinNights;      
      price = selectedPriceBase + (listCapacities.priceNight * extraNights);
    }
    return price;
  }

  editPrice(num:number,num2:number,selectedOption:any=null){
    //num -> 1:menu persons, 2: menu nights
    //num2 -> index of rentcard
    //selectedOption -> index loop for of capacities(persons)
    
    //si existe el parámetro selectedOption el botón pulsado pertenece a alguno
    //de los botones del menu1 o menu2 si no, es alguno de los 2 botones 
    //que activan el menú
    if(selectedOption!==null){      
      if(num==1){
      //actualizamos el índice para disponer siempre de la opción seleccionada 
      //de cada rentcard y para no repetir la opción seleccionada dentro del menú
        this.indSelPson[num2]=selectedOption;

      //obtenemos el objeto de capacities seleccionado para obtener sus propiedades
      let selectedCapacities=this.cardrentdata[num2].capacities[selectedOption];
      
      let price=this.getPriceByList(selectedCapacities,num2);
      /*
      let selectedPriceBase =selectedCapacities.priceBase;
      let selectedMinNights = selectedCapacities.minNights;
      let price;
      if(selectedMinNights == this.selectedNights[num2]){
        console.log("son las noches por defecto")
        price=selectedPriceBase;
      }else{
        let extraNights=this.selectedNights[num2] - selectedMinNights;
        price=selectedPriceBase+(selectedCapacities.priceNight * extraNights);        
      }
      */
      this.selectedPrice[num2]=price;
      console.log("price: ",price)

  //si la opción seleccionada de noches no es la mínima(minNights) se añade
  //el precio de minNights + las noches restantes de minNights a la seleccionada,
  //si minNights es 3 y la seleccionada 5 calcular (precio minNights + precio noche * (minNights - seleccionada))
      //let price = selectedOption * 3;
      }else if(num==2){
        //Establecemos la noche
        this.selectedNights[num2]=selectedOption;

        //Asignamos el objeto actual de capacities
        let selectedCapacities = this.cardrentdata[num2].capacities[this.indSelPson[num2]];
        let price = this.getPriceByList(selectedCapacities,num2);        
        this.selectedPrice[num2]=price;
      }
    }else{
      //con esto identificamos que se ha pulsado el botón de pulsar menú 
      //para que no se cierre desde selectCard()
      
      if(num==1){
        //this.menu1Active[num2]=true;
      }
        //this.switchMenu1=true;
      //if(num==2)
        //this.switchMenu2=true;
    } 
      //this.indexSelRent=num2;
      this.toggleMenus(num,num2);
  }
  //se oculta el menú del elemento correspondiente del array menu1Active
  hideMenu(index:number){
    this.menu1Active[index]=false;
    this.menu2Active[index]=false;
  }
  //efecto toggle menú1 y menú2
  toggleMenus(menu:number,index:number){
    //num==1 es el menú 1(personas), num==2 es el menú 2(noches) 
      if(menu==1)
        this.menu1Active[index] = (this.menu1Active[index]) ? false:true;
      else if(menu==2)
        this.menu2Active[index]= (this.menu2Active[index]) ? false:true;
  }

  divPrice(){
    if(!this.pushedPrice){
      this.menu1Active=false;
      this.menu2Active=false;
    }else
      this.pushedPrice=false;
  }

  updatePrice(){    
    this.pushedPrice=true;
  }
  /*
  getLevelLocationString(card:any){
    //obtenemos una media de la localización... 
    //si es menor a 1 km : Excelente, si es entre 1 y 2 : muy bueno, si es entre 2 y 3: bueno
    if(card.numLevelLocation){}
  }
*/


//por id a la db, no utilizado
/*
getFeedsByRentId(id:string){
  this._cardrentService.getFeedbacksByRentId(id).subscribe(
    response => {
      this.feedrentdata=response.feedbacks;
      console.log("response desde getFeeds(): ",response)
    },
    error => {

    }
  )
}
*/
/*
  showImagesCard(card:CardRent){
    this.fixedCloseGal=true;
    this.selectedCard=card;
    console.log(card.listImages);
    //this.switchImages=true;
  }
  */

  


}
