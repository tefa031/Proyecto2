import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  SubmissionsComponent } from './submissions.component';
import {  SubmissionsRoutingModule } from './submissions.routing.module';
import { TableModule } from 'src/app/shared/components/table/table.module';

@NgModule({
  imports: [
    CommonModule,
    SubmissionsRoutingModule,
    TableModule,


  ],
  declarations: [SubmissionsComponent]
})
export class SubmissionsModule { }
