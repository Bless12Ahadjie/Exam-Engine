import { Component } from '@angular/core';
import {UpcomingExamTableComponent} from "../upcoming-exam-table/upcoming-exam-table.component";

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    UpcomingExamTableComponent
  ],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss'
})
export class StudentDashboardComponent {

}
