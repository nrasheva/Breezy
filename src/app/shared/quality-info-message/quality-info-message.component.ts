import { Component, OnInit, OnDestroy } from '@angular/core';
import { faFaceSmileBeam } from '@fortawesome/free-regular-svg-icons';
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

  get isAqiLessThan20(): boolean {
    return (this.airQualityData?.european_aqi ?? 0) < 20;
  }

  get isAqiLessThan40(): boolean {
    return (this.airQualityData?.european_aqi ?? 0) > 20 && (this.airQualityData?.european_aqi ?? 0) <= 40;
  }

  get isAqiLessThan60(): boolean {
    return (this.airQualityData?.european_aqi ?? 0) > 40 && (this.airQualityData?.european_aqi ?? 0) <= 60;
  }

  get isAqiLessThan80(): boolean {
    return (this.airQualityData?.european_aqi ?? 0) > 60 && (this.airQualityData?.european_aqi ?? 0) <= 80;
  }

  get isAqiLessThan100(): boolean {
    return (this.airQualityData?.european_aqi ?? 0) > 80 && (this.airQualityData?.european_aqi ?? 0) <= 100;
  }
}
