import { Component, OnInit } from '@angular/core';
import { AirQualityData } from 'src/app/types/AirQualityData';
import { AirQualityServiceService } from 'src/app/shared/services/air-quality-service.service';
import { faSun, faFaceSmileBeam } from '@fortawesome/free-regular-svg-icons';
import { faMaskFace, faIndustry } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { LocationCoordinatesService } from 'src/app/shared/services/location-coordinates.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.css'],
})
export class IndicatorsComponent implements OnInit {
  faSun = faSun;
  faMaskFace = faMaskFace;
  faIndustry = faIndustry;
  faFaceSmileBeam = faFaceSmileBeam;

  airQualityData?: AirQualityData;

  private locationSubscription?: Subscription;

  constructor(
    private airQualityService: AirQualityServiceService,
    private locationCoordinatesService: LocationCoordinatesService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.locationSubscription =
      this.locationCoordinatesService.currentLocationData.subscribe({
        next: locationData => {
          if (locationData) {
            this.fetchAirQualityData(
              locationData.latitude,
              locationData.longitude
            );
          }
        },
        error: error => console.error('Error getting location data:', error),
      });
  }

  fetchAirQualityData(lat: number, lon: number): void {
    this.airQualityService.fetchAirQuality(lat, lon).subscribe({
      next: data => {
        this.airQualityData = data;
        localStorage.setItem('airQualityData', JSON.stringify(data));
      },
      error: error => console.error('Error fetching air quality data:', error),
    });
  }
}
