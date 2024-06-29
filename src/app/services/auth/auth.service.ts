import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _http = inject(HttpClient)

  registerUser(formData: object){
   return this._http.post<object>(
  `${environment.BACKEND_API_BASE_URL}//exam-engine/api/v1/auth/register-account`,
     formData
   )
  }

  loginUser(formData: Object): Observable<object> {
    return this._http.post<object>(
      `${environment.BACKEND_API_BASE_URL}/exam-engine/api/v1/auth/login`,
      formData
    );
  }



}
