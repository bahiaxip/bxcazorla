import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardHeaderComponent } from './card/card-header/card-header.component';
import { CardContentComponent } from './card/card-content/card-content.component';
import { CardrentComponent } from './cardrent.component';
//import { LevelPipePipe,IconTypePipe } from '../level-pipe.pipe';
import { MinimrentPipe } from './pipes/minimrent.pipe';
import { GlobalPipe, IconTypePipe, PricePipe } from './pipes/global.pipe';

import { NewcardComponent } from './newcard/newcard.component';
import { DivlevelComponent } from './card/card-header/divlevel/divlevel.component';
import { Divlevel2Component } from './card/card-header/divlevel2/divlevel2.component';
import { CardComponent } from './card/card.component';

import { CardmapsComponent } from './card/card-header/cardmaps/cardmaps.component';
import { CardImagesComponent } from './card/card-header/card-images/card-images.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NewcardServicesComponent } from './newcard/newcard-services/newcard-services.component';
import { NewcardImagesComponent } from './newcard/newcard-images/newcard-images.component';
import { NewcardInputsComponent } from './newcard/newcard-inputs/newcard-inputs.component';
import { NewcardPricesComponent } from './newcard/newcard-prices/newcard-prices.component';
import { HttpClientModule } from '@angular/common/http';
import { CardInfoservicesComponent } from './card/card-header/card-infoservices/card-infoservices.component';
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
    CardImagesComponent,
    NewcardServicesComponent,
    NewcardImagesComponent,
    NewcardInputsComponent,
    NewcardPricesComponent,
    CardInfoservicesComponent
  ],
  imports: [
    CommonModule,    
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  exports:[CardrentComponent ]
})
export class CardrentModule { }
