import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/guard/auth-guard/authGuards.service';


const routes: Routes = [
  {
    path: 'auth',
    data: { login: true },
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'submissions',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/submissions/submissions.module').then(
        (m) => m.SubmissionsModule
      ),
  },
  {
    path: 'problems',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/problems/problems.module').then(
        (m) => m.ProblemsModule
      ),
  },
  {
    path: 'ranking',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/ranking/ranking.module').then((m) => m.RankingModule),
  },
  {
    path: 'materials',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/materials/materials.module').then(
        (m) => m.MaterialsModule
      ),
  },
  {
    path: 'skills',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/skills/skills.module').then((m) => m.SkillsModule),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
