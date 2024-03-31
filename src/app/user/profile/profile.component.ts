import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { Location } from 'src/app/types/Location';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentLocation: Location | null = null;
  isEditing = false;
  editableLocation = '';
  private locationSubscription: Subscription | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.locationSubscription = this.userService
      .getCurrentLocation()
      .subscribe(location => {
        this.currentLocation = location;
      });
  }

  startEditing(): void {
    this.isEditing = true;
  }

  stopEditing(): void {
    this.isEditing = false;
  }

  updateLocation(): void {
    const currentLocation = this.currentLocation;

    if (currentLocation && this.editableLocation.trim()) {
      this.userService
        .editLocation(currentLocation._id, this.editableLocation)
        .subscribe(
          () => {
            console.log('Location updated successfully');
            if (currentLocation) {
              // Update the local state
              currentLocation.location = this.editableLocation;

              localStorage.setItem(
                'currentLocation',
                JSON.stringify(currentLocation)
              );

              this.userService.setCurrentLocation(currentLocation);
            }

            this.isEditing = false; // Exit editing mode
          },
          error => {
            console.error('Error updating location:', error);
          }
        );
    }
  }

  ngOnDestroy(): void {
    if (this.locationSubscription) {
      this.locationSubscription.unsubscribe();
    }
  }
}
