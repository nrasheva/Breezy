import { Component } from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-custom-location',
  templateUrl: './custom-location.component.html',
  styleUrls: ['./custom-location.component.css'],
})
export class CustomLocationComponent {
  location = '';

  faArrowRight = faArrowRight;

  constructor(private userService: UserService) {}

  onSubmit() {
    if (!this.location) {
      console.error('Location is empty');
      return;
    }

    this.userService.createLocation(this.location).subscribe({
      next: () => {
        console.log('Location created successfully');
        this.fetchLocations();
      },
      error: error => console.error('Error creating location:', error),
    });
  }

  fetchLocations(): void {
    this.userService.getLocations().subscribe({
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
