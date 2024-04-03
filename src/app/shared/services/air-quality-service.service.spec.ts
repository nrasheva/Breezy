import { TestBed } from '@angular/core/testing';

import { AirQualityServiceService } from './air-quality-service.service';

describe('AirQualityServiceService', () => {
  let service: AirQualityServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirQualityServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
