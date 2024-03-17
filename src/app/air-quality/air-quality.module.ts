import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicatorsComponent } from './indicators/indicators.component';
import { MainViewComponent } from './main-view/main-view.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MapComponent } from './map/map.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MainViewComponent, MapComponent, IndicatorsComponent],
  imports: [CommonModule, FontAwesomeModule, SharedModule],
  exports: [MainViewComponent],
})
export class AirQualityModule {}
