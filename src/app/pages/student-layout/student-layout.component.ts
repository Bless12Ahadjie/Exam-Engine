import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../teacher/components/navbar/navbar.component';
import { StudentDashboardComponent } from '../../shared/components/student-dashboard/student-dashboard.component';

@Component({
  selector: 'app-student-layout',
  standalone: true,
  imports: [
    NavbarComponent,
    StudentDashboardComponent,
    RouterModule
  ],
  templateUrl: './student-layout.component.html',
  styleUrl: './student-layout.component.scss'
})
export class StudentLayoutComponent {

}
