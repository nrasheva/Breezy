import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { LocationCoordinatesService } from './location-coordinates.service';
import { AirQualityData } from 'src/app/types/AirQualityData';

@Injectable({
  providedIn: 'root',
})
export class AirQualityServiceService {
  private airQualityDataSource = new BehaviorSubject<AirQualityData | null>(
    null
  );
  airQualityData$ = this.airQualityDataSource.asObservable();

  constructor(
    private http: HttpClient,
    private LocationCoordinatesService: LocationCoordinatesService
  ) {}

  fetchAirQuality(lat: number, lon: number): Observable<AirQualityData> {
    const baseURL = '/api/getAirQuality'; 
    const params = { params: { lat, lng: lon } };
    return this.http
      .get<{ airQuality: { current: AirQualityData } }>(baseURL, params)
      .pipe(map(response => response.airQuality.current));
  }

  fetchAirQualityForCurrentLocation(): Observable<AirQualityData> {
    return this.LocationCoordinatesService.currentLocationData.pipe(
      switchMap(({ latitude, longitude }) =>
        this.fetchAirQuality(latitude, longitude)
      ),
      tap((airQualityData: AirQualityData) => this.airQualityDataSource.next(airQualityData))
    );
  }
}
