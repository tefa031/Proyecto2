import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProblemsRoutingModule } from './problems-routing.module';
import { ListProblemsComponent } from './list-problems/list-problems.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { NewProblemComponent } from './new-problem/new-problem.component';
import { ProblemCategoryComponent } from './problem-category/problem-category.component';
import { ProblemsComponent } from './problems.component';
import { GridModule } from 'src/app/shared/components/grid/grid.module';
import { TableModule } from 'src/app/shared/components/table/table.module';
import { DescriptionProblemComponent } from './description-problem/description-problem.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    ProblemsComponent,
    ListProblemsComponent,
    NewCategoryComponent,
    NewProblemComponent,
    ProblemCategoryComponent,
    DescriptionProblemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ProblemsRoutingModule,
    FontAwesomeModule,
    GridModule,
    TableModule,
    ReactiveFormsModule,
  ],
})
export class ProblemsModule {}
