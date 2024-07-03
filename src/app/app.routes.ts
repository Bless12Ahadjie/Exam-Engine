import { Routes } from '@angular/router';
import { ConfirmationPage1Component } from './shared/components/confirmation-page-1/confirmation-page-1.component';
import { StudentDashboardComponent } from './shared/components/student-dashboard/student-dashboard.component';
import { ConfirmationPage2Component } from './shared/components/confirmation-page-2/confirmation-page-2.component';
import { ExamPageComponent } from './shared/components/exam-page/exam-page.component';
import { AuthComponent } from './pages/auth/auth.component';
import { StudentLayoutComponent } from './pages/student-layout/student-layout.component';
import { TeacherComponent } from './pages/teacher/teacher.component';

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
      import('../app/pages/auth/auth.routes').then((auth) => auth.routes),
  },

  {
    path: 'student',
    component: StudentLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: StudentDashboardComponent,
      },
      {
        path: 'confirm-1',
        component: ConfirmationPage1Component,
      },
      {
        path: 'confirm-2',
        component: ConfirmationPage2Component,
      },
      {
        path: 'exam',
        component: ExamPageComponent,
      },
    ],
  },
  {
    path: 'teacher',
    component: TeacherComponent,
    loadChildren: () =>
      import('../app/pages/teacher/teacher.routes').then(
        (teacher) => teacher.routes
      ),
  },
];
