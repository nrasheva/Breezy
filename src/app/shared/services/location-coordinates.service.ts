import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GeoapifyResponse } from 'src/app/types/GeoapifyResponse';

export interface LocationData {
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root',
})
export class LocationCoordinatesService {
  private locationDataSource = new BehaviorSubject<LocationData>({
    latitude: 0,
    longitude: 0,
  });
  currentLocationData = this.locationDataSource.asObservable();

  constructor(private http: HttpClient) {}

  updateLocationData(locationData: LocationData) {
    this.locationDataSource.next(locationData);
  }

  fetchLocationCoordinates(location: string) {
    const params = { location: location };
    this.http
      .get<GeoapifyResponse>('/api/getLocationCoordinates', { params })
      .subscribe({
        next: response => {
          const coordinates =
            response.locationCoordinates.features[0].geometry.coordinates;
          const longitude = coordinates[0];
          const latitude = coordinates[1];
          this.updateLocationData({ latitude, longitude });
          console.log(latitude, longitude);
        },
        error: error =>
          console.error('Error fetching location coordinates:', error),
      });
  }
}
