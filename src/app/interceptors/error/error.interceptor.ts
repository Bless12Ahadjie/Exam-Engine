import {
	HttpErrorResponse,
	HttpHandlerFn,
	HttpInterceptorFn,
	HttpRequest,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (
	req: HttpRequest<unknown>,
	next: HttpHandlerFn
) => {
	return next(req).pipe(
		catchError((error: HttpErrorResponse) => {
			console.error(error);
			if (error.status === 0) {
				return throwError(
					() => new Error('The server is down. Try again later.')
				);
			}
			return throwError(
				() => new Error('An error occurred. Please try again.')
			);
		})
	);
};
