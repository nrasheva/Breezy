import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LocationCoordinatesService } from './location-coordinates.service';
import { AirQualityData } from 'src/app/types/AirQualityData';

@Injectable({
  providedIn: 'root',
})
export class AirQualityServiceService {
  constructor(
    private http: HttpClient,
    private LocationCoordinatesService: LocationCoordinatesService
  ) {}

  fetchAirQuality(lat: number, lon: number): Observable<AirQualityData> {
    const baseURL = '/api/getAirQuality'; // Adjust if your base URL is different
    const params = { params: { lat, lng: lon } };
    return this.http.get<{ airQuality: { current: AirQualityData } }>(baseURL, params).pipe(
      map(response => response.airQuality.current)
    );
  }

  fetchAirQualityForCurrentLocation(): Observable<AirQualityData> {
    return this.LocationCoordinatesService.currentLocationData.pipe(
      switchMap(({ latitude, longitude }) =>
        this.fetchAirQuality(latitude, longitude)
      )
    );
  }
}
