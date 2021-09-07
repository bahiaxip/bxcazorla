import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardHeaderComponent } from './card-header/card-header.component';
import { CardContentComponent } from './card-content/card-content.component';
import { CardrentComponent } from './cardrent.component';
//import { LevelPipePipe,IconTypePipe } from '../level-pipe.pipe';
import { MinimrentPipe } from './pipes/minimrent.pipe';
import { GlobalPipe, IconTypePipe, PricePipe } from './pipes/global.pipe';

import { NewcardComponent } from './newcard/newcard.component';
import { DivlevelComponent } from './divlevel/divlevel.component';
import { Divlevel2Component } from './divlevel2/divlevel2.component';
import { CardComponent } from './card/card.component';

import { CardmapsComponent } from './cardmaps/cardmaps.component';
import { CardImagesComponent } from './card-images/card-images.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CardrentComponent,
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,  
    IconTypePipe,
    MinimrentPipe,
    GlobalPipe,
    PricePipe,
    NewcardComponent,
    DivlevelComponent,
    Divlevel2Component,
    CardComponent,
    CardmapsComponent,
    CardImagesComponent
  ],
  imports: [
    CommonModule,    
    SharedModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  exports:[CardrentComponent ]
})
export class CardrentModule { }
