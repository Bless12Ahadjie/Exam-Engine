import { Routes } from '@angular/router';
import { StudentLayoutComponent } from './shared/pages/student-layout/student-layout.component';
import { ConfirmationPage1Component } from './shared/components/confirmation-page-1/confirmation-page-1.component';
import { StudentDashboardComponent } from './shared/components/student-dashboard/student-dashboard.component';
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
