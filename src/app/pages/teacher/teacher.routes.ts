import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { SetQuestionsComponent } from './components/set-questions/set-questions.component';
import { QuestionsPreviewComponent } from './components/questions-preview/questions-preview.component';
import { ManageExamsComponent } from './manage-exams/manage-exams.component';

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
      }
    ],
  },
  {
    path: 'manage-exams',
    component: ManageExamsComponent,
  },
  {
    path: 'analytics',
    children: [
      {
        path: ':id',
        component: AnalyticsComponent
      }
    ]
  },
  {
    path: 'preview-questions',
    component: QuestionsPreviewComponent,
  },
  { path: '**', redirectTo: 'home' },
];
