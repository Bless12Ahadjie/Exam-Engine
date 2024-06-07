import { Routes } from '@angular/router';
import { LoginPageComponent } from './shared/pages/auth/login-page/login-page.component';
import { SignupPageComponent } from './shared/pages/auth/signup-page/signup-page.component';
import { StudentLayoutComponent } from './shared/pages/student-layout/student-layout.component';

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
    // children: [
    //   {
    //     path: 'dashboard',

    //   }
    // ]


  }
];
