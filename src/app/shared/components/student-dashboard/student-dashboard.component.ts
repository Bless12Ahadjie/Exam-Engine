import {Component, inject, OnInit} from '@angular/core';
import {UpcomingExamTableComponent} from "../upcoming-exam-table/upcoming-exam-table.component";
import {RecentTestResultComponent} from "../recent-test-result/recent-test-result.component";
import {AuthService} from "../../../services/auth/auth.service";

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
export class StudentDashboardComponent implements OnInit{
  authService = inject(AuthService);

  ngOnInit() {
    this.authService.checkAuthStatus();
  }

}
