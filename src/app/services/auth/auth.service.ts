import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { LoginPayload, Payload } from '../../../Interfaces/interfaces';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http = inject(HttpClient);
  private _tokenService = inject(TokenService);
  private _router = inject(Router);

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

  isLoggedIn() {
    return this._tokenService.getToken();
  }

  logout() {
    this._tokenService.removeToken();
    this._router.navigate(['/login']);
  }
}
