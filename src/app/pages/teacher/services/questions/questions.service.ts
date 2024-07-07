import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';
import { UserStore } from '../../../../store/user/user.store';
import { IResponse } from '../../../../interfaces/response.interface';
import { ExamQuestion } from '../../interfaces/question.interface';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private readonly userStore = inject(UserStore);

  private _httpClient = inject(HttpClient);

  constructor() {}

  public createQuestion(questions: ExamQuestion) {
    return this._httpClient.post<IResponse>(
      `${
        environment.BACKEND_API_BASE_URL
      }/exam-engine/api/v1/teacher/create/new-questions/${this.userStore.userId()}`,
      questions
    );
  }
}
