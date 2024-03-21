import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

  // constructor() {}

  updateLocationData(locationData: LocationData) {
    this.locationDataSource.next(locationData);
  }
}
