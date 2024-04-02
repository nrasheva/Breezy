import { Component, OnInit } from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { LocationCoordinatesService } from '../services/location-coordinates.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.css'],
})
export class LocationSearchComponent implements OnInit {
  location = '';
  defaultLocation = { latitude: 42.698334, longitude: 23.319941 };
  faArrowRight = faArrowRight;

  constructor(
    private LocationCoordinatesService: LocationCoordinatesService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentLocation().subscribe(location => {
      if (location && location.location) {
        this.location = location.location;
      } else {
        this.location = `Sofia`;
      }
      this.LocationCoordinatesService.fetchLocationCoordinates(this.location);
    });
  }

  onSubmit() {
    console.log('Location submitted:', this.location);
    this.LocationCoordinatesService.fetchLocationCoordinates(this.location);
  }
}
