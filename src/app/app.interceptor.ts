import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
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
        return throwError(() => new Error('Token has expired'));
      }

      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${authToken}`),
      });
      return next.handle(authReq);
    } else {
      // this.router.navigate(['/home']);
    }

    // Handling errors globally
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 403) {
          console.log('Not authenticated');
          this.router.navigate(['/login']);
        } else {
          this.errorService.setError(err);
          this.router.navigate(['/error']);
        }
        return throwError(() => err);
      })
    );
  }

  private isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Date.now() / 1000;
    return payload.exp < now;
  }
}
