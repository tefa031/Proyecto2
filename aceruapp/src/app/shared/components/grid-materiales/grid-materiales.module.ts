import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridMaterialesComponent } from './grid-materiales.component';



@NgModule({

  imports: [
    CommonModule
  ],
  declarations: [GridMaterialesComponent],
  exports:[GridMaterialesComponent]
})
export class GridMaterialesModule { }
