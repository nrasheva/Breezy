import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  faFaceSmileBeam,
  faFaceDizzy,
  faFaceFrown,
  faFaceMeh,
  faFaceSmile
} from '@fortawesome/free-regular-svg-icons';
import { faMaskFace } from '@fortawesome/free-solid-svg-icons';
import { AirQualityData } from 'src/app/types/AirQualityData';
import { AirQualityServiceService } from '../services/air-quality-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quality-info-message',
  templateUrl: './quality-info-message.component.html',
  styleUrls: ['./quality-info-message.component.css'],
})
export class QualityInfoMessageComponent implements OnInit, OnDestroy {
  faFaceSmileBeam = faFaceSmileBeam;
  faMaskFace = faMaskFace;
  faFaceDizzy = faFaceDizzy;
  faFaceFrown = faFaceFrown;
  faFaceMeh = faFaceMeh;
  faFaceSmile = faFaceSmile;

  airQualityData?: AirQualityData | null;
  private subscription: Subscription = new Subscription();

  constructor(private airQualityService: AirQualityServiceService) {}

  ngOnInit() {
    // Subscribe to the air quality data updates
    this.subscription.add(
      this.airQualityService.airQualityData$.subscribe(data => {
        this.airQualityData = data;
      })
    );
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    this.subscription.unsubscribe();
  }
  get aqiCategory(): string {
    const aqi = this.airQualityData?.european_aqi ?? 0;
    if (aqi <= 20) return 'lessThan20';
    if (aqi > 20 && aqi <= 40) return 'lessThan40';
    if (aqi > 40 && aqi <= 60) return 'lessThan60';
    if (aqi > 60 && aqi <= 80) return 'lessThan80';
    if (aqi > 80 && aqi <= 100) return 'lessThan100';
    return 'moreThan100';
  }
}
