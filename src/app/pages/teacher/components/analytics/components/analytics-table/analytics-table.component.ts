import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { TableData } from '../../../../manage-exams/manage-exams.interface';
import { StudentsTableData } from './analytics.interface';

@Component({
  selector: 'app-analytics-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics-table.component.html',
  styleUrl: './analytics-table.component.scss'
})
export class AnalyticsTableComponent {
  title = input.required<string>()
  tableHeadings = input.required<string[]>();
  tableData = input.required<StudentsTableData[]>();
  showLoadingState = input.required<boolean>();
  placeholder = new Array<number>(3);
}
