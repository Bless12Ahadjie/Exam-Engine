import { Component, input } from '@angular/core';
import { TableData } from '../../../pages/teacher/manage-exams/manage-exams.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  title = input.required<string>()
  tableHeadings = input.required<string[]>();
  tableData = input.required<TableData[]>();
  showLoadingState = input.required<boolean>();
  placeholder = new Array<number>(3);
}
