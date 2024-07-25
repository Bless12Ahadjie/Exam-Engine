import { PayLoadData } from '../../interfaces/token.interface';

export const ACCESS_TOKEN_KEY: string = 'EXAM_ENGINE_TOKEN';
export const USER_ID: string = 'EXAM_ENGINE_USER_ID';

export const persistedSave = (key: string, value: string) => {
  sessionStorage.setItem(key, value);
};

export const persistedGet = (key: string) => {
  return sessionStorage.getItem(key);
};

export const persistedRemove = (key: string) => {
  sessionStorage.removeItem(key);
};

export function decodeJwt(token: String): PayLoadData | null {
  if (!token) {
    return null;
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return null;
  }

  const payload = JSON.parse(atob(parts[1]));

  return payload;
}
