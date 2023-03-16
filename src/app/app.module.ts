import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryModule } from 'ng-gallery';
import { HomeComponent } from './home/home.component';

//material
import { MatInputModule } from '@angular/material/input';
//import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
//import { CdkAccordionModule } from '@angular/cdk/accordion';
//import { MatExpansionModule } from '@angular/material/expansion';
//import { MatCardModule } from '@angular/material/card';
//import { RentingComponent } from './renting/renting.component';
//import { Pipe } from '@angular/core';
//import { LevelPipePipe,IconTypePipe } from './level-pipe.pipe';
//import { PipesCommonModule } from './pipes/pipes-common/pipes-common.module';
//import { CardComponent } from './card/card.component';
//import { PricePipe } from './pipes/price.pipe';
//import { MinimrentPipe } from './pipes/minimrent.pipe';
import { ActivityComponent } from './activity/activity.component';
import { ActivityHeaderComponent } from './activity/activity-header/activity-header.component';
import { ActivityContentComponent } from './activity/activity-content/activity-content.component';

import { CardrentModule } from './cardrent/cardrent.module';
import { MainmenuComponent } from './mainmenu/mainmenu.component';
import { ButtongroupComponent } from './home/buttongroup/buttongroup.component';
import { FloatheaderComponent } from './home/floatheader/floatheader.component';
import { RainhomeComponent } from './home/rainhome/rainhome.component';
import { ArroyofrioComponent } from './home/arroyofrio/arroyofrio.component';
import { PlacesComponent } from './places/places.component';

import { PlacesHeaderComponent } from './places/places-header/places-header.component';
import { PlacesContentComponent } from './places/places-content/places-content.component';
import { InfoArroyoFrioComponent } from './home/info-arroyo-frio/info-arroyo-frio.component';
//import { CardHeaderComponent } from './card-header/card-header.component';
//import { CardContentComponent } from './card-content/card-content.component';
//import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    //RentingComponent,
    //LevelPipePipe,
    //IconTypePipe,
    //CardComponent,
    //PricePipe,
    //MinimrentPipe,
    ActivityComponent,
    ActivityHeaderComponent,
    ActivityContentComponent,
    MainmenuComponent,
    ButtongroupComponent,
    FloatheaderComponent,
    RainhomeComponent,
    ArroyofrioComponent,
    PlacesComponent,
    PlacesHeaderComponent,
    PlacesContentComponent,
    InfoArroyoFrioComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GalleryModule,
    //MatInputModule,
    MatButtonModule,
    MatListModule,
    MatButtonToggleModule,
    MatIconModule,    
    //MatExpansionModule,
    //MatCardModule,    
    CommonModule,
    //PipesCommonModule,
    CardrentModule,
    //MatFormFieldModule,
    MatProgressSpinnerModule
    
  ],
  exports:[
    
  ],
  
  bootstrap: [AppComponent],

})
export class AppModule { }
