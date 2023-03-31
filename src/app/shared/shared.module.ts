import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
//además de añadirlo al app.module es necesario añadirlo aquí para el componente card y 
//declararlo en la sección exports
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatExpansionModule,
    MatCheckboxModule,
    //MatTooltipModule
  ],
  exports:[
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatTooltipModule
  ]
})
export class SharedModule { }
