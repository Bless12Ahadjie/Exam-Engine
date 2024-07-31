import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { SetQuestionsComponent } from './components/set-questions/set-questions.component';
import { QuestionsPreviewComponent } from './components/questions-preview/questions-preview.component';
import { ManageExamsComponent } from './manage-exams/manage-exams.component';
import { ManageExamsTableComponent } from './components/analytics/components/manage-exams-table/manage-exams-table.component';
import { SnapshotsComponent } from './components/snapshots/snapshots.component';

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
    ],
  },
  {
    path: 'manage-exams',
    component: ManageExamsComponent,
    children: [
      {
        path: '',
        component: ManageExamsTableComponent,
      },
      {
        path: 'analytics/:id',
        component: AnalyticsComponent,
      },
      {
        path: 'snapshots/:id/:questionId',
        component: SnapshotsComponent
      }
    ],
  },
  {
    path: 'preview-questions',
    component: QuestionsPreviewComponent,
  },
  { path: '**', redirectTo: 'home' },
];
