import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingComponent } from './ranking.component';
import { RankingRoutingModule } from './ranking.routing.module';
import { TableModule } from '../../shared/components/table/table.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    RankingRoutingModule,
    TableModule,
    MaterialModule
  ],
  declarations: [RankingComponent]
})
export class RankingModule { }
