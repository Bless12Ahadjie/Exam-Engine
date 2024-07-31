import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { UserStore } from '../../../../store/user/user.store';
import {
  IResponseData,
  ISnapshots,
} from '../../manage-exams/manage-exams.interface';

@Injectable({
  providedIn: 'root',
})
export class ManageExamsService {
  private readonly userStore = inject(UserStore);

  private _http = inject(HttpClient);

  constructor() {}

  public getManageExamsQuestions(): Observable<IResponseData> {
    return this._http.get<IResponseData>(
      `${
        environment.BACKEND_API_BASE_URL
      }/exam-engine/api/v1/teacher/questions/${this.userStore.userId()}/limited-details`
    );
  }

  public getStudentSnapshots(
    studentId: string,
    questionId: string
  ): Observable<ISnapshots> {
    return this._http.get<ISnapshots>(
      `${environment.BACKEND_API_BASE_URL}/exam-engine/api/v1/teacher/questions/${studentId}/snapshots/${questionId}`
    );
  }
}
