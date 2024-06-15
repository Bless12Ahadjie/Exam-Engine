import { Component } from '@angular/core';
import {UpcomingExamTableComponent} from "../upcoming-exam-table/upcoming-exam-table.component";
import {RecentTestResultComponent} from "../recent-test-result/recent-test-result.component";

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    UpcomingExamTableComponent,
    RecentTestResultComponent
  ],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss'
})
export class StudentDashboardComponent {

}
