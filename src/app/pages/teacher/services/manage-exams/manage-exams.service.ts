import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { UserStore } from '../../../../store/user/user.store';
import { IResponseData, TableData } from '../../manage-exams/manage-exams.interface';

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
}
