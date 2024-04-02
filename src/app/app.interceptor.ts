import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorService } from './core/error/error.service';
import { Router } from '@angular/router';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(
    private errorService: ErrorService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(request);

    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      if (this.isTokenExpired(authToken)) {
        localStorage.removeItem('authToken');
        this.router.navigate(['/login']);
        localStorage.removeItem('currentLocation');
        localStorage.removeItem('airQualityData');
        return throwError(() => new Error('Token has expired'));
      }

      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${authToken}`),
      });
      return next.handle(authReq);
    }

    // Handling errors globally
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        switch (err.status) {
          case 401:
            // Unauthorized
            this.router.navigate(['/auth/login']);
            break;
          case 403:
            // Forbidden
            console.log('Not authorized');
            this.router.navigate(['/auth/login']);
            break;
          default:
            // Global error handling
            this.errorService.setError(err);
            this.router.navigate(['/error']);
        }
        return throwError(() => err);
      })
    );
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Date.now() / 1000;
      return payload.exp < now;
    } catch (error) {
      console.error('Error checking token expiration', error);
      return true;
    }
  }
}
