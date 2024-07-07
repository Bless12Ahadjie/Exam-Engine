import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { FormComponent } from './components/form/form.component';
import { SetQuestionsComponent } from './components/set-questions/set-questions.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'create-questions',
        component: SetQuestionsComponent,
      },
    ]
  },
  {
    path: 'analytics',
    component: AnalyticsComponent,
  }
];
