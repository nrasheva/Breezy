import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
import { Location } from '../types/Location';
import { DecodedToken } from '../types/DecodeToken';
import { environment } from 'src/environments/environment';

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
    this.initializeLocation();
  }

  private initializeLocation(): void {
    const savedLocation = localStorage.getItem('currentLocation');
    if (savedLocation) {
      this.currentLocation$$.next(JSON.parse(savedLocation));
    }
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedIn$$.asObservable();
  }

  login(email: string, password: string) {
    return this.http
      .post<{ token?: string }>(`${environment.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          if (response.token) {
            this.handleLoginSuccess(response.token);
            // this.isLoggedIn$$.next(true);
            this.fetchAndSetUserLocation();
          } else {
            console.error('No token received');
          }
        })
      );
  }

  register(email: string, password: string) {
    return this.http.post<User>(`${environment.apiUrl}/register`, { email, password }).pipe(
      tap(user => {
        this.user$$.next(user);
      })
    );
  }

  private handleLoginSuccess(token: string): void {
    localStorage.setItem('authToken', token);

    const decodedToken = this.decodeToken(token);
    if (decodedToken) {
      this.user$$.next({
        id: decodedToken.sub,
        email: decodedToken.email,
      });
    }

    this.isLoggedIn$$.next(true);
  }

  private decodeToken(token: string): DecodedToken | null {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Error decoding token', e);
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentLocation');
    localStorage.removeItem('airQualityData');
    this.isLoggedIn$$.next(false);
    this.user$$.next(undefined);
    this.router.navigate(['/login']);
  }

  public handleTokenExpiry(): void {
    this.logout();
  }

  createLocation(locationName: string) {
    return this.http.post<Location>(`${environment.apiUrl}/location`, { locationName }).pipe(
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

  getLocation(): Observable<Location[]> {
    return this.http.get<Location[]>(`${environment.apiUrl}/location`,).pipe(
      catchError(error => {
        console.error('Error fetching locations:', error);
        return throwError(() => new Error('Failed to fetch locations'));
      })
    );
  }

  setCurrentLocation(location: Location): void {
    this.currentLocation$$.next(location);
    localStorage.setItem('currentLocation', JSON.stringify(location));
  }

  getCurrentLocation(): Observable<Location | null> {
    return this.currentLocation$$.asObservable();
  }

  fetchAndSetUserLocation(): void {
    this.http
      .get<Location[]>(`${environment.apiUrl}/location`)
      .pipe(
        tap(location => {
          console.log('Current location fetched:', location);
          this.setCurrentLocation(location[0]);
        }),
        catchError(error => {
          console.error('Error fetching current location:', error);
          return throwError(
            () => new Error('Failed to fetch current location')
          );
        })
      )
      .subscribe();
  }

  editLocation(locationId: string, newLocation: string): Observable<Location> {
    const headers = new HttpHeaders({
      id: localStorage.getItem('userId') || '',
    });

    return this.http
      .put<Location>(
        `${environment.apiUrl}/location?id=${locationId}`,
        { content: newLocation },
        { headers }
      )
      .pipe(
        tap(updatedLocation => {
          console.log('Location updated:', updatedLocation);
          this.updateCurrentLocationIfNeeded(updatedLocation);
        }),
        catchError(error => {
          console.error('Error updating location:', error);
          return throwError(() => new Error('Failed to update location'));
        })
      );
  }

  private updateCurrentLocationIfNeeded(updatedLocation: Location) {
    const currentLocation = this.currentLocation$$.value;

    if (currentLocation && currentLocation._id === updatedLocation._id) {
      this.currentLocation$$.next(updatedLocation);

      localStorage.setItem('currentLocation', JSON.stringify(updatedLocation));

      console.log(
        'Current location updated in BehaviorSubject and localStorage'
      );
    }
  }

  deleteLocation(locationId: string): Observable<Location> {
    const headers = new HttpHeaders({
      id: localStorage.getItem('userId') || '',
    });

    return this.http
      .delete<Location>(`${environment.apiUrl}/location?id=${locationId}`, { headers })
      .pipe(
        tap(() => {
          console.log('Location deleted successfully');

          this.removeLocationFromState(locationId);
        }),
        catchError(error => {
          console.error('Error deleting location:', error);
          return throwError(() => new Error('Failed to delete location'));
        })
      );
  }

  private removeLocationFromState(locationId: string): void {
    const currentLocation = this.currentLocation$$.value;

    if (currentLocation && currentLocation._id === locationId) {
      this.currentLocation$$.next(null);
      localStorage.removeItem('currentLocation');
      console.log('Current location removed from state and localStorage.');
    }
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
