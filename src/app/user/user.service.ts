import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../types/User';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  user: User | undefined;

  userSubscription: Subscription;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe(user => {
      this.user = user;
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<{ token?: string }>('/api/login', { email, password })
      .pipe(
        tap(response => {
          if (response.token) {
            this.handleLoginSuccess(response.token);
          } else {
            console.error('No token received');
          }
        })
      );
  }

  register(email: string, password: string) {
    return this.http.post('/api/register', { email, password });
  }

  private handleLoginSuccess(token: string): void {
    localStorage.setItem('authToken', token);
  }
}
