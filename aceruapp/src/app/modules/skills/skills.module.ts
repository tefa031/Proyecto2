import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsComponent } from './skills.component';
import { SkillsRoutingModule } from './skills-routing.module';
import { ListSkillsComponent } from './list-skills/list-skills.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableModule } from 'src/app/shared/components/table/table.module';
import { DescriptionSkillComponent } from './description-skill/description-skill.component';
import { NewSkillComponent } from './new-skill/new-skill.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    SkillsRoutingModule,
    FontAwesomeModule,
    TableModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
  ],
  declarations: [SkillsComponent,ListSkillsComponent,DescriptionSkillComponent,NewSkillComponent]
})
export class SkillsModule { }
