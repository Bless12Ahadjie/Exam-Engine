import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {StudentDashboardComponent} from "../../components/student-dashboard/student-dashboard.component";
import { RouterModule } from '@angular/router';

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
