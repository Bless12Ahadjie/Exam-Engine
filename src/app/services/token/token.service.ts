import { Injectable } from '@angular/core';
import {
  ACCESS_TOKEN_KEY,
  persistedGet,
  persistedRemove,
  persistedSave,
} from '../../shared/helpers/constants.utile';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  public saveToken(token: string): void {
    persistedSave(ACCESS_TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return persistedGet(ACCESS_TOKEN_KEY);
  }

  public removeToken(): void {
    persistedRemove(ACCESS_TOKEN_KEY);
  }
}
