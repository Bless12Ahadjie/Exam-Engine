import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-manage-exams',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './manage-exams.component.html',
  styleUrl: './manage-exams.component.scss',
})
export class ManageExamsComponent {}
