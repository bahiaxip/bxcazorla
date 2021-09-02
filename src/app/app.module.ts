import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryModule } from 'ng-gallery';
import { HomeComponent } from './home/home.component';

//material
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
//import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { RentingComponent } from './renting/renting.component';
import { Pipe } from '@angular/core';
import { LevelPipePipe,IconTypePipe } from './level-pipe.pipe';
import { PipesCommonModule } from './pipes/pipes-common/pipes-common.module';
import { CardComponent } from './card/card.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RentingComponent,
    LevelPipePipe,
    IconTypePipe,
    CardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GalleryModule,    
    MatButtonModule,
    MatListModule,
    MatButtonToggleModule,
    MatIconModule,    
    MatExpansionModule,
    MatCardModule,    
    CommonModule,
    PipesCommonModule,    
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
