import { Component, ViewChild, signal } from '@angular/core';
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
  @ViewChild(FormComponent) formComponent!: FormComponent;
  toggledCreateQuestion = signal<boolean>(true);
  questions = signal<Question[]>([]);

  toggleCreateQuestion() {
    this.toggledCreateQuestion.update((prev) => !prev);
  }

  handleQuestionsData(questions: Question[]) {
    this.questions.set(questions);
    console.log('Received questions data:', this.questions());
  }

  sendQuestions() {
    if (this.formComponent) {
      this.questions.set(this.formComponent.questions);
      console.log('Sending questions data:', this.questions());
    }
  }
}
