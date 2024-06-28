import { Component, WritableSignal, signal } from '@angular/core';
import { IShortcutCard } from './interfaces/shortcut-card.interface';
import { ShortcutCardComponent } from './components/shortcut-card/shortcut-card.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [ShortcutCardComponent, RouterOutlet],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
})
export class AnalyticsComponent {
  shortcutCards: WritableSignal<IShortcutCard[]> = signal([
    {
      label: 'Total Students',
      value: '40',
      iconSrc: './assets/icons/total-students.svg',
      link: 'total-students',
    },
    {
      label: 'Completed Students',
      value: '34',
      iconSrc: './assets/icons/completed-students.svg',
      link: 'completed-students',
    },
    {
      label: 'Pass Students',
      value: '34',
      iconSrc: './assets/icons/pass-students.svg',
      link: 'pass-students',
    },
    {
      label: 'Fail Students ',
      value: '12',
      iconSrc: './assets/icons/fail-students.svg',
      link: 'projects-created',
    },
    {
      label: 'Absent Students',
      value: '5',
      iconSrc: './assets/icons/absent-students.svg',
      link: 'fail-students',
    },
  ]);
}
