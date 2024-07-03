import { Component, signal } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { Question } from '../../interfaces/question.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  toggledCreateQuestion = signal<boolean>(false);
  currentQuestions = signal<Question[]>([]);

  toggleCreateQuestion() {
    this.toggledCreateQuestion.update((prev) => !prev);
  }

  handleQuestions(questions: Question[]) {
    this.currentQuestions.set(questions);
  }

  sendQuestions() {
    console.log('Sending questions:', this.currentQuestions());
  }
}
