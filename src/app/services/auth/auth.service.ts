import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { LoginPayload, Payload } from '../../../Interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _http = inject(HttpClient);

  registerUser(formData: object): Observable<Payload> {
    return this._http.post<Payload>(
      `${environment.BACKEND_API_BASE_URL}/exam-engine/api/v1/auth/register-account`,
      formData
    );
  }

  loginUser(credentials: {
    email: string;
    password: string;
  }): Observable<LoginPayload> {
    return this._http.post<LoginPayload>(
      `${environment.BACKEND_API_BASE_URL}/exam-engine/api/v1/auth/login`,
      credentials
    );
  }
}
