import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProblemsComponent } from './list-problems/list-problems.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { ProblemCategoryComponent } from './problem-category/problem-category.component';
import { ProblemsComponent } from './problems.component';
import { NewProblemComponent } from './new-problem/new-problem.component';
import { DescriptionProblemComponent } from './description-problem/description-problem.component';
import { RoleGuardService } from 'src/app/shared/services/guard/role-guard/roleGuard.service';

const routes: Routes = [
  {
    path: '',
    component: ProblemsComponent,
    children: [
      { path: '', component: ProblemCategoryComponent },
      {
        path: 'new-category',
        component: NewCategoryComponent,
        canActivate: [RoleGuardService],
        data: { expectedRole: 'ROLE_ADMIN' },
      },
      { path: 'category/:id/:nombre', component: ListProblemsComponent },
      {
        path: 'category/:id/:nombre/new-problem',
        component: NewProblemComponent,
        canActivate: [RoleGuardService],
        data: { expectedRole: 'ROLE_ADMIN' }
      },
      {
        path: 'category/description-problem/:idCategory/:idProblem',
        component: DescriptionProblemComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProblemsRoutingModule {}
