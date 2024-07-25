import { inject, Injectable } from '@angular/core';
import { UserStore } from '../../store/user/user.store';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { persistedGet, USER_ID } from '../../shared/helpers/constants.helper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userStore = inject(UserStore);
  private _http = inject(HttpClient);

  constructor() {
    const userId = persistedGet(USER_ID);
    if (userId) {
      this.userStore.setUserId(userId);
    }
  }

  public getUserDetails(): Observable<any> {
    return this._http
      .get<any>(
        `${
          environment.BACKEND_API_BASE_URL
        }/exam-engine/api/v1/user/account/${this.userStore.userId()}`
      )
      .pipe(
        tap((user) => {
          this.userStore.setUserEmail(user.email);
          this.userStore.setUserRole(user.role);
        })
      );
  }
}
