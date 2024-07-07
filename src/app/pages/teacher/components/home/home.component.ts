import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private _router = inject(Router);

  isCreateQuestionsPage() {
    return this._router.url === '/teacher/home/create-questions';
  }

  createQuestions() {
    this._router.navigate(['teacher', 'home', 'create-questions']);
  }
}
