import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { Location } from 'src/app/types/Location';
import { AirQualityServiceService } from 'src/app/shared/services/air-quality-service.service';
import { AirQualityData } from 'src/app/types/AirQualityData';
import {
  faTree,
  faLeaf,
  faClover,
  faSeedling,
  faCannabis,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { faPagelines } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentLocation: Location | null = null;
  isEditing = false;
  editableLocation = '';

  faTree = faTree;
  faLeaf = faLeaf;
  faClover = faClover;
  faPagelines = faPagelines;
  faSeedling = faSeedling;
  faCannabis = faCannabis;
  faXmark = faXmark;

  private locationSubscription: Subscription | undefined;

  airQualityData?: AirQualityData | null;
  private subscription: Subscription = new Subscription();

  constructor(
    private userService: UserService,
    private airQualityService: AirQualityServiceService
  ) {}

  ngOnInit(): void {
    const storedAirQualityData = localStorage.getItem('airQualityData');
    if (storedAirQualityData) {
      this.airQualityData = JSON.parse(storedAirQualityData);
    }

    this.locationSubscription = this.userService
      .getCurrentLocation()
      .subscribe(location => {
        this.currentLocation = location;
      });

    this.subscription.add(
      this.airQualityService.airQualityData$.subscribe(data => {
        this.airQualityData = data;
        localStorage.setItem('airQualityData', JSON.stringify(data));
      })
    );

    const storedLocation = localStorage.getItem('currentLocation');
    if (storedLocation) {
      this.currentLocation = JSON.parse(storedLocation);
    }
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

  deleteLocation(locationId: string): void {
    this.userService.deleteLocation(locationId).subscribe({
      next: () => {
        // Handle successful deletion
        console.log('Location deleted successfully.');
      },
      error: error => {
        // Handle error
        console.error('Error deleting location:', error);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.locationSubscription) {
      this.locationSubscription.unsubscribe();
    }
  }
}
