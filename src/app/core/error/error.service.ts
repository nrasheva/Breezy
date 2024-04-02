import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private apiError$$ = new BehaviorSubject<HttpErrorResponse | null>(null);
  public apiError$ = this.apiError$$.asObservable();

  setError(error: HttpErrorResponse): void {
    this.apiError$$.next(error);
  }
}
