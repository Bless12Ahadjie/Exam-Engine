import { inject, Injectable } from '@angular/core';
import { UserStore } from '../../../../store/user/user.store';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private readonly userStore = inject(UserStore);

  private _http = inject(HttpClient);

  constructor() {}

  public getTotalNumberOfStudents(questionId: string): Observable<any> {
    return this._http.get<any>(
      `${
        environment.BACKEND_API_BASE_URL
      }/exam-engine/api/v1/teacher/questions/${this.userStore.userId()}/receivers/total/${questionId}`
    );
  }

  public getTotalNumberOfStudentsDone(questionId: string): Observable<any> {
    return this._http.get<any>(
      `${
        environment.BACKEND_API_BASE_URL
      }/exam-engine/api/v1/teacher/questions/${this.userStore.userId()}/receivers/done/${questionId}`
    );
  }

  public getTotalNumberOfStudentsFailed(questionId: string): Observable<any> {
    return this._http.get<any>(
      `${
        environment.BACKEND_API_BASE_URL
      }/exam-engine/api/v1/teacher/questions/${this.userStore.userId()}/receivers/fail/${questionId}`
    );
  }

  public getTotalNumberOfStudentsPass(questionId: string): Observable<any> {
    return this._http.get<any>(
      `${
        environment.BACKEND_API_BASE_URL
      }/exam-engine/api/v1/teacher/questions/${this.userStore.userId()}/receivers/pass/${questionId}`
    );
  }
}
