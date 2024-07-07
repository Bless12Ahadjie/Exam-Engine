import { Component, inject, signal } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { ExamQuestion, ExamSettings, Question } from '../../interfaces/question.interface';
import { QuestionsService } from '../../services/questions/questions.service';
import { ToasterService } from '../../../../shared/components/toaster/services/toaster.service';
import { IResponse } from '../../../../interfaces/response.interface';
import { RouterLink } from '@angular/router';
import { QuestionsSettingsComponent } from '../questions-settings/questions-settings.component';

@Component({
  selector: 'app-set-questions',
  standalone: true,
  imports: [FormComponent, RouterLink, QuestionsSettingsComponent],
  templateUrl: './set-questions.component.html',
  styleUrl: './set-questions.component.scss'
})
export class SetQuestionsComponent {
  isLoading: boolean = false;
  toggledCreateQuestion = signal<boolean>(false);
  currentQuestions = signal<Question[]>([]);
  currentView: 'questions' | 'settings' = 'questions';

  settingsData!: ExamSettings;

  private _questionsService = inject(QuestionsService);
  private _toaster = inject(ToasterService);

  ngOnInit() {
    this.loadFromStorage();
  }

  emitQuestions() {
    this.saveToStorage();
  }

  saveToStorage() {
    if (this.settingsData) {
      sessionStorage.setItem(
        'exam_engine_settings',
        JSON.stringify(this.settingsData)
      );
    }
  }

  loadFromStorage() {
    const savedSettings = sessionStorage.getItem('exam_engine_settings');
    if (savedSettings) {
      this.settingsData = JSON.parse(savedSettings);
    }
  }

  handleSettingsChange(settings: ExamSettings) {
    this.settingsData = settings;
    this.saveToStorage();
  }

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

  showQuestions() {
    this.currentView = 'questions';
  }

  showSettings() {
    this.currentView = 'settings';
  }
}
