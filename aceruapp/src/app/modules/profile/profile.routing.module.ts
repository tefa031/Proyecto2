import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DataProfileComponent } from './data-profile/data-profile.component';
import { ProfileComponent } from './profile.component';


const routes: Routes = [
  {path:"",component:ProfileComponent, children:[
    {path:'', component:DataProfileComponent},
    {path:'change-password', component:ChangePasswordComponent}
  ]},

  // ,canActivate: [AuthGuardService]
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
