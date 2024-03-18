import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { GeoapifyResponse } from 'src/app/types/GeoapifyResponse';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.css'],
})
export class LocationSearchComponent {
  location = '';

  faArrowRight = faArrowRight;

  constructor(private http: HttpClient) {}

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
          const lon =
            response.locationCoordinates.features[0].geometry.coordinates[0];
          const lat =
            response.locationCoordinates.features[0].geometry.coordinates[1];
          console.log(lat, lon);
          // Handle the response here. E.g., display it on the UI.
        },
        error: error => {
          console.error('Error fetching location coordinates:', error);
        },
      });
  }
}
