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
  locations: Location[] = [];

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
        this.locations = locations; 
        if (locations.length > 0) {
          this.userService.setCurrentLocation(locations[0]);
        }
      },
      error: error => console.error('Error fetching locations:', error),
    });
  }
}
