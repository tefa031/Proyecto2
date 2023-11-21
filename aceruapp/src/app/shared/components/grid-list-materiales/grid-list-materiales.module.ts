import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridListMaterialesComponent } from './grid-list-materiales.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GridListMaterialesComponent],
  exports:[GridListMaterialesComponent]
})
export class GridListMaterialesModule { }
