import { Component, OnInit } from '@angular/core';
import { AirQualityData } from 'src/app/types/AirQualityData';
import { AirQualityServiceService } from 'src/app/shared/services/air-quality-service.service';
import { faSun, faFaceSmileBeam } from '@fortawesome/free-regular-svg-icons';
import { faMaskFace, faIndustry } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { LocationCoordinatesService } from 'src/app/shared/services/location-coordinates.service';

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
    private locationCoordinatesService: LocationCoordinatesService
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

  get aqiCategory(): string {
    const aqi = this.airQualityData?.european_aqi ?? 0;
    if (aqi <= 20) return 'aqi-lessThan20';
    if (aqi > 20 && aqi <= 40) return 'aqi-lessThan40';
    if (aqi > 40 && aqi <= 60) return 'aqi-lessThan60';
    if (aqi > 60 && aqi <= 80) return 'aqi-lessThan80';
    if (aqi > 80 && aqi <= 100) return 'aqi-lessThan100';
    return 'aqi-moreThan100';
  }
}
