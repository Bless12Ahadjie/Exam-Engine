import {
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import { AuthService } from '../../services/auth/auth.service';
import { decodeJwt } from '../../shared/helpers/constants.utile';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);
  const accessToken: string | null = tokenService.getToken();

  if (accessToken && !req.url.includes('/login')) {
    
    const payloadData = decodeJwt(accessToken);

    if (payloadData) {
      const isExpired = payloadData.exp
        ? payloadData.exp < Date.now() / 1000
        : false;

      if (isExpired) {
        authService.logout();
      }
    }

    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + accessToken),
    });

    return next(authReq);
  }

  return next(req);
};
