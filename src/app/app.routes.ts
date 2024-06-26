import { Routes } from '@angular/router';
import { LoginPageComponent } from './shared/pages/auth/login-page/login-page.component';
import { SignupPageComponent } from './shared/pages/auth/signup-page/signup-page.component';
import { StudentLayoutComponent } from './shared/pages/student-layout/student-layout.component';
import { ConfirmationPage1Component } from './shared/components/confirmation-page-1/confirmation-page-1.component';
import { StudentDashboardComponent } from './shared/components/student-dashboard/student-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'singup',
    component: SignupPageComponent
  },

  {
    path: 'student',
    component: StudentLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: StudentDashboardComponent

      },
      {
        path: 'confirm-1',
        component: ConfirmationPage1Component

      }
    ]


  }
];
