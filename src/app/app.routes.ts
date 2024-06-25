import { Routes } from '@angular/router';
import { StudentLayoutComponent } from './shared/pages/student-layout/student-layout.component';
import { AuthComponent } from './shared/pages/auth/auth.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthComponent,
    loadChildren: () =>
      import('../app/shared/pages/auth/auth.routes').then(
        (auth) => auth.routes
      ),
  },

  {
    path: 'student',
    component: StudentLayoutComponent,
    // children: [
    //   {
    //     path: 'dashboard',

    //   }
    // ]
  },
];
