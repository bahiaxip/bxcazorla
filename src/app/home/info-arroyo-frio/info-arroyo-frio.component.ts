//import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { CardService } from '../../services/card.service';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
@Component({
  selector: 'pre-info-arroyo-frio',
  templateUrl: './info-arroyo-frio.component.html',
  styleUrls: ['./info-arroyo-frio.component.css'],
  //encapsulation:ViewEncapsulation.ShadowDom
})
export class InfoArroyoFrioComponent implements OnInit {

  public headerTitle:any='Más sobre ArroyoFrío';
  public dataHeader:any;
  public headerPanels:any;

  @ViewChild('back_articles',{static:true}) private back_articles!:ElementRef;
  @ViewChild('arroyofrio',{static:true}) private arroyofrio!:ElementRef;
  @ViewChild('aventura',{static:true}) private aventura!:ElementRef;
  @ViewChild('freeRoute',{static:true}) private freeRoute!:ElementRef;
  @ViewChild('gastronomy',{static:true}) private gastronomy!:ElementRef;
  @ViewChild('nature',{static:true}) private nature!:ElementRef;
  
  constructor(private _cardService:CardService) { }

  ngOnInit(): void {
    this.headerPanels = {
      left:'1',
      tooltip_left:'ArroyoFrío'
    }
    this.dataHeader={      
      section:1,
      left : 1
    }
    this.animationGsap();

  }

  sendPanel(panel:number){ 
    console.log("pasa x info-arroyofrio.component")   
    this._cardService.setPanel(panel);
    this._cardService.setSection(1)
  }

  animationGsap(){
    gsap.registerPlugin(ScrollTrigger);
    const back_articles = this.back_articles.nativeElement;
    const arroyofrio = this.arroyofrio.nativeElement;
    const adventure = this.aventura.nativeElement;
    const freeRoute = this.freeRoute.nativeElement;
    const gastronomy = this.gastronomy.nativeElement;
    const nature = this.nature.nativeElement;
    gsap.to(arroyofrio,{opacity:1})
    gsap.to(adventure,{
      opacity:1,
      duration:2,
      scrollTrigger:{
        scroller: back_articles,
        trigger:arroyofrio,
        markers:false,
        scrub:4,

        start: '100 top',
        end:'+=900 bottom'
      }
    });
    gsap.to(freeRoute,{
      opacity:1,
      duration:2,
      //x:0,
      scrollTrigger:{
        scroller: back_articles,
        trigger:adventure,
        markers:false,
        scrub:1,
        start: 'top top',
        end:'+=1500 bottom'
      }
    });
    gsap.to(gastronomy,{
      opacity:1,
      scrollTrigger:{
        scroller:back_articles,
        trigger:freeRoute,
        markers:false,
        scrub:1,
        start:'200 top',
        end:'+=900 bottom'
      }
    })
    gsap.to(nature,{
      opacity:1,
      scrollTrigger:{
        scroller:back_articles,
        trigger:gastronomy,
        markers:false,
        scrub:1,
        start:'top top',
        end:'+=900 bottom'
      }
    })
  }

}
