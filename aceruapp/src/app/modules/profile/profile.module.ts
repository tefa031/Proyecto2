import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile.routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DataProfileComponent } from './data-profile/data-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';


@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    MaterialModule

  ],
  declarations: [ProfileComponent,ChangePasswordComponent,DataProfileComponent],

})
export class ProfileModule { }
