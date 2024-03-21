import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { GeoapifyResponse } from 'src/app/types/GeoapifyResponse';
import { LocationCoordinatesService } from '../services/location-coordinates.service';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.css'],
})
export class LocationSearchComponent {
  location = '';

  faArrowRight = faArrowRight;

  constructor(
    private http: HttpClient,
    private LocationCoordinatesService: LocationCoordinatesService
  ) {}

  onSubmit() {
    console.log('Location submitted:', this.location);
    this.fetchLocationCoordinates();
  }

  fetchLocationCoordinates() {
    const params = { location: this.location };
    this.http
      .get<GeoapifyResponse>('/api/getLocationCoordinates', { params })
      .subscribe({
        next: response => {
          console.log(
            'Location Coordinates:',
            response.locationCoordinates.features[0].geometry.coordinates
          );
          const longitude =
            response.locationCoordinates.features[0].geometry.coordinates[0];
          const latitude =
            response.locationCoordinates.features[0].geometry.coordinates[1];
          console.log(latitude, longitude);
          // Handle the response here. E.g., display it on the UI.
          this.LocationCoordinatesService.updateLocationData({
            latitude: latitude,
            longitude: longitude,
          });
        },
        error: error => {
          console.error('Error fetching location coordinates:', error);
        },
      });
  }
}
