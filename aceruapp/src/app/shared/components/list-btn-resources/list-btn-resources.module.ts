import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBtnResourcesComponent } from './list-btn-resources.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ListBtnResourcesComponent],
  exports:[ListBtnResourcesComponent]
})
export class ListBtnResourcesModule { }
