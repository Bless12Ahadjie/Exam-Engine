import { Component, inject, signal } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { ExamQuestion, Question } from '../../interfaces/question.interface';
import { QuestionsService } from '../../services/questions/questions.service';
import { ToasterService } from '../../../../shared/components/toaster/services/toaster.service';
import { IResponse } from '../../../../interfaces/response.interface';

@Component({
  selector: 'app-set-questions',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './set-questions.component.html',
  styleUrl: './set-questions.component.scss'
})
export class SetQuestionsComponent {
  isLoading: boolean = false;
  toggledCreateQuestion = signal<boolean>(false);
  currentQuestions = signal<Question[]>([]);

  private _questionsService = inject(QuestionsService);
  private _toaster = inject(ToasterService);

  handleQuestions(questions: Question[]) {
    this.currentQuestions.set(questions);
  }

  sendQuestions() {
    const data: ExamQuestion = {
      questionTitle: 'Software Testing',
      questionInstruction: 'Mid-semester question',
      questionStartTime: '2024-06-25T10:56:54.730Z',
      questionEndTime: '2024-06-26T10:56:54.730Z',
      question: this.currentQuestions(),
      questionReceivers: [
        'nusetorsetsofia102@gmail.com',
        'sandro@gmail.com',
        'kwame@gmail.com',
      ],
    };

    this._questionsService.createQuestion(data).subscribe({
      next: (response) => {
        this.responseHandler(response);
      },
      error: (error) => {
        this.errorHandler(error);
      },
    });
  }

  responseHandler(response: IResponse) {
    this.isLoading = false;

    if (response.status === 200) {
      this.showToast(response.message, 'success');
    } else {
      this.showToast(response.message, 'error');
    }
  }

  errorHandler(error: Error) {
    this.isLoading = false;
    this.showToast(error.message, 'error');
  }

  private showToast(message: string, type: 'error' | 'success') {
    this._toaster.showToast({
      message,
      type,
      duration: 3000,
    });
  }
}
