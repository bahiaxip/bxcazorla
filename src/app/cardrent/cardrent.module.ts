import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardHeaderComponent } from './card-header/card-header.component';
import { CardContentComponent } from './card-content/card-content.component';
import { CardrentComponent } from './cardrent.component';
//import { LevelPipePipe,IconTypePipe } from '../level-pipe.pipe';
import { MinimrentPipe } from './pipes/minimrent.pipe';
import { GlobalPipe, IconTypePipe, PricePipe } from './pipes/global.pipe';
//material
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [
    CardrentComponent,
    CardHeaderComponent,
    CardContentComponent,  
    IconTypePipe,
    MinimrentPipe,
    GlobalPipe,
    PricePipe
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    MatButtonToggleModule,
    MatIconModule,
    MatCardModule
  ],
  exports:[ CardrentComponent]
})
export class CardrentModule { }
