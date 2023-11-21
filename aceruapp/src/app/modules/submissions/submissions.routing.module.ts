import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuardService } from 'src/app/shared/services/guard/role-guard/roleGuard.service';
import {  SubmissionsComponent } from './submissions.component';



const routes: Routes = [
  {path:"",canActivate:[RoleGuardService],data:{rol:"Participante"},component:SubmissionsComponent},

  // ,canActivate: [AuthGuardService]
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubmissionsRoutingModule { }
