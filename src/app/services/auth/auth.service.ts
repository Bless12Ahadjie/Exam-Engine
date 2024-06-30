import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Payload} from "../../../Interfaces/interfaces";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _http = inject(HttpClient)

  registerUser(formData: object){
    console.log("formData",formData)
   return this._http.post<Payload>(
  `${environment.BACKEND_API_BASE_URL}/exam-engine/api/v1/auth/register-account`,
     formData
   ).pipe(

   )
  }

  loginUser(formData: Object): Observable<object> {
    return this._http.post<object>(
      `${environment.BACKEND_API_BASE_URL}/exam-engine/api/v1/auth/login`,
      formData
    );
  }



}
