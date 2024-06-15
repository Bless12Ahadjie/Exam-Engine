import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {StudentDashboardComponent} from "../../components/student-dashboard/student-dashboard.component";

@Component({
  selector: 'app-student-layout',
  standalone: true,
  imports: [
    NavbarComponent,
    StudentDashboardComponent,
  ],
  templateUrl: './student-layout.component.html',
  styleUrl: './student-layout.component.scss'
})
export class StudentLayoutComponent {

}
