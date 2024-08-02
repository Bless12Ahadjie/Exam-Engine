import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentDashboardComponent } from '../../shared/components/student-dashboard/student-dashboard.component';
import {NavbarComponent} from "../../shared/components/navbar/navbar.component";

@Component({
  selector: 'app-student-layout',
  standalone: true,
  imports: [
    StudentDashboardComponent,
    RouterModule,
    NavbarComponent
  ],
  templateUrl: './student-layout.component.html',
  styleUrl: './student-layout.component.scss'
})
export class StudentLayoutComponent {

}
