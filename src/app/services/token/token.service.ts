import { inject, Injectable } from '@angular/core';
import {
  ACCESS_TOKEN_KEY,
  decodeJwt,
  persistedGet,
  persistedRemove,
  persistedSave,
  USER_ID,
} from '../../shared/helpers/constants.helper';
import { PayLoadData } from '../../interfaces/token.interface';
import { UserStore } from '../../store/user/user.store';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  readonly userStore = inject(UserStore);

  constructor() {}

  public saveToken(token: string): void {
    persistedSave(ACCESS_TOKEN_KEY, token);
  }

  public getToken(): string | null {
    const token = persistedGet(ACCESS_TOKEN_KEY);
    if (token) {
      const decodedToken: PayLoadData | null = decodeJwt(token);
      if (decodedToken) {
        persistedSave(USER_ID, decodedToken.jti);
        this.userStore.setUserId(decodedToken.jti);
      }
    }
    return token;
  }

  public removeToken(): void {
    persistedRemove(ACCESS_TOKEN_KEY);
  }
}
