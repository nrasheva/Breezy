import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../types/User';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  private user$ = this.user$$.asObservable();
  private isLoggedIn$$ = new BehaviorSubject<boolean>(this.hasToken());

  user: User | undefined;

  userSubscription: Subscription;

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe(user => {
      this.user = user;
    });
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedIn$$.asObservable();
  }

  login(email: string, password: string) {
    return this.http
      .post<{ token?: string }>('/api/login', { email, password })
      .pipe(
        tap(response => {
          if (response.token) {
            this.handleLoginSuccess(response.token);
            this.isLoggedIn$$.next(true);
          } else {
            console.error('No token received');
          }
        })
      );
  }

  register(email: string, password: string) {
    return this.http.post<User>('/api/register', { email, password }).pipe(
      tap(user => {
        this.user$$.next(user);
      })
    );
  }

  private handleLoginSuccess(token: string): void {
    localStorage.setItem('authToken', token);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.isLoggedIn$$.next(false);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
