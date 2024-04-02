import { Component } from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../user.service';
import { LocationCoordinatesService } from 'src/app/shared/services/location-coordinates.service';

@Component({
  selector: 'app-custom-location',
  templateUrl: './custom-location.component.html',
  styleUrls: ['./custom-location.component.css'],
})
export class CustomLocationComponent {
  location = '';

  faArrowRight = faArrowRight;

  constructor(
    private userService: UserService,
    private locationCoordinatesService: LocationCoordinatesService
  ) {}

  onSubmit() {
    if (!this.location) {
      console.error('Location is empty');
      return;
    }

    this.userService.createLocation(this.location).subscribe({
      next: () => {
        console.log('Location created successfully');
        this.locationCoordinatesService.fetchLocationCoordinates(this.location);
        this.fetchLocation();
      },
      error: error => console.error('Error creating location:', error),
    });
  }

  fetchLocation(): void {
    this.userService.getLocation().subscribe({
      next: locations => {
        if (locations.length > 0) {
          const firstLocation = locations[0];
          this.userService.setCurrentLocation(firstLocation);
          this.location = firstLocation.location;
        } else {
          console.log('No locations found for this user.');
        }
      },
      error: error => console.error('Error fetching locations:', error),
    });
  }
}
