import { Routes } from '@angular/router';
import { LoginPageComponent } from './shared/pages/auth/login-page/login-page.component';
import { SignupPageComponent } from './shared/pages/auth/signup-page/signup-page.component';

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
  }
];
