import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSkillsComponent } from './list-skills/list-skills.component';

import { SkillsComponent } from './skills.component';
import { DescriptionSkillComponent } from './description-skill/description-skill.component';
import { NewSkillComponent } from './new-skill/new-skill.component';
import { RoleGuardService } from 'src/app/shared/services/guard/role-guard/roleGuard.service';

const routes: Routes = [
  {
    path: '',
    component: SkillsComponent,
    children: [
      { path: '', component: ListSkillsComponent },
      { path: 'new-skill', component: NewSkillComponent },
      { path: 'new-skill/edit/:id', component: NewSkillComponent },
      {
        path: 'new-skill/description/:id',
        component: DescriptionSkillComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkillsRoutingModule {}
