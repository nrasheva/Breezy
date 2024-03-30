import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../types/User';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  tap,
  catchError,
  throwError,
} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  private user$ = this.user$$.asObservable();
  private isLoggedIn$$ = new BehaviorSubject<boolean>(this.hasToken());
  private currentLocation$$ = new BehaviorSubject<Location | null>(null);

  user: User | undefined;

  userSubscription: Subscription;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.userSubscription = this.user$.subscribe(user => {
      this.user = user;
    });

    // Correctly placed call to initialize the user state within the constructor
    // this.initializeUserState();
  }

  // private initializeUserState(): void {
  //   if (this.hasToken()) {
  //     this.getLocation().subscribe({
  //       next: user => {
  //         this.user$$.next(user); // Update user state
  //       },
  //       error: error => {
  //         console.error('Error fetching user profile:', error);
  //         // Here you might want to handle the error, e.g., by clearing the token if it's invalid
  //       },
  //     });
  //   }
  // }
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
    this.user$$.next(undefined);
    this.router.navigate(['/home']);
  }

  // getLocation() {
  //   return this.http
  //     .get<User>('api/location')
  //     .pipe(tap(user => this.user$$.next(user)));
  // }

  createLocation(locationName: string) {
    return this.http.post<Location>('/api/location', { locationName }).pipe(
      tap((data: Location) => {
        console.log('Location created:', data);
        this.setCurrentLocation(data); // Set the current location
      }),
      catchError(error => {
        console.error('Error creating location:', error);
        return throwError(() => new Error('Failed to create location'));
      })
    );
  }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>('/api/location');
  }

  setCurrentLocation(location: Location): void {
    this.currentLocation$$.next(location);
  }

  getCurrentLocation(): Observable<Location | null> {
    return this.currentLocation$$.asObservable();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
