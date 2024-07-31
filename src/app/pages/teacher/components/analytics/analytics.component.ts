import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { IShortcutCard } from './interfaces/shortcut-card.interface';
import { ShortcutCardComponent } from './components/shortcut-card/shortcut-card.component';
import { ActivatedRoute } from '@angular/router';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { AnalyticsTableComponent } from './components/analytics-table/analytics-table.component';
import { StudentsTableData } from './components/analytics-table/analytics.interface';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [ShortcutCardComponent, AnalyticsTableComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
})
export class AnalyticsComponent implements OnInit {
  questionId = signal<string>('');
  shortcutCards: WritableSignal<IShortcutCard[]> = signal([
    {
      label: 'Total Students',
      value: '0',
      iconSrc: './assets/icons/total-students.svg',
      link: 'total-students',
    },
    {
      label: 'Completed Students',
      value: '0',
      iconSrc: './assets/icons/completed-students.svg',
      link: 'completed-students',
    },
    {
      label: 'Pass Students',
      value: '0',
      iconSrc: './assets/icons/pass-students.svg',
      link: 'pass-students',
    },
    {
      label: 'Fail Students ',
      value: '0',
      iconSrc: './assets/icons/fail-students.svg',
      link: 'fail-students',
    },
  ]);

  columns: string[] = [
    'Student Name',
    'Stident ID',
    'Gender',
    'Email',
    'Date Submitted',
  ];
  studentRecords = signal<StudentsTableData[]>([]);
  isLoading: boolean = false;

  _activatedRoute = inject(ActivatedRoute);
  _analyticsService = inject(AnalyticsService);

  ngOnInit(): void {
    this.getIdFromQueryParams();
    this.getTotal();
    this.getDone();
    this.getPass();
    this.getFail();
  }

  setView(
    view:
      | 'total-students'
      | 'completed-students'
      | 'pass-students'
      | 'fail-students'
      | ''
  ) {
    switch (view) {
      case 'total-students':
        this.getTotal();
        break;
      case 'completed-students':
        this.getDone();
        break;
      case 'pass-students':
        this.getPass();
        break;
      case 'fail-students':
        this.getFail();
        break;
      default:
        this.getTotal();
        break;
    }
  }

  getIdFromQueryParams(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.questionId.set(id);
      }
    });
  }

  getTotal() {
    this._analyticsService
      .getTotalNumberOfStudents(this.questionId())
      .subscribe({
        next: (response) => {
          console.log('Total: ', response);
          this.studentRecords.set(response.students);

          this.shortcutCards.set(
            this.shortcutCards().map((card) => {
              if (card.link === 'total-students') {
                card.value = response.totalCounts.toString();
              }
              return card;
            })
          );
        },
        error: (error) => {
          console.error('Error fetching total students', error);
        },
      });
  }

  getDone() {
    this._analyticsService
      .getTotalNumberOfStudentsDone(this.questionId())
      .subscribe({
        next: (response) => {
          console.log('Done: ', response);
          this.studentRecords.set(response.students);

          this.shortcutCards.set(
            this.shortcutCards().map((card) => {
              if (card.link === 'completed-students') {
                card.value = response.totalCounts.toString();
              }
              return card;
            })
          );
        },
        error: (error) => {
          console.error('Error fetching total students', error);
        },
      });
  }

  getPass() {
    this._analyticsService
      .getTotalNumberOfStudentsPass(this.questionId())
      .subscribe({
        next: (response) => {
          console.log('Pass: ', response);
          this.studentRecords.set(response.students);

          this.shortcutCards.set(
            this.shortcutCards().map((card) => {
              if (card.link === 'pass-students') {
                card.value = response.totalCounts.toString();
              }
              return card;
            })
          );
        },
        error: (error) => {
          console.error('Error fetching total students', error);
        },
      });
  }

  getFail() {
    this._analyticsService
      .getTotalNumberOfStudentsFailed(this.questionId())
      .subscribe({
        next: (response) => {
          console.log('Fail: ', response);
          this.studentRecords.set(response.students);

          this.shortcutCards.set(
            this.shortcutCards().map((card) => {
              if (card.link === 'fail-students') {
                card.value = response.totalCounts.toString();
              }
              return card;
            })
          );
        },
        error: (error) => {
          console.error('Error fetching total students', error);
        },
      });
  }
}
