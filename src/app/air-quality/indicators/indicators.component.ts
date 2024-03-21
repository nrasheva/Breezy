import { Component, OnInit } from '@angular/core';
import { AirQualityData } from 'src/app/types/AirQualityData';
import { AirQualityServiceService } from 'src/app/shared/services/air-quality-service.service';
import { faSun, faFaceSmileBeam } from '@fortawesome/free-regular-svg-icons';
import { faMaskFace, faIndustry } from '@fortawesome/free-solid-svg-icons';

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

  constructor(private airQualityService: AirQualityServiceService) {}

  ngOnInit(): void {
    this.fetchAirQualityData();
  }

  fetchAirQualityData(): void {
    // Assuming fetchAirQualityForCurrentLocation subscribes to location changes
    this.airQualityService.fetchAirQualityForCurrentLocation().subscribe({
      next: data => {
        this.airQualityData = data;
        console.log('Air Quality Data:', this.airQualityData);
        // Now airQualityData is bound to your template and can be displayed
      },
      error: error => console.error('Error fetching air quality data:', error),
    });
  }
}
