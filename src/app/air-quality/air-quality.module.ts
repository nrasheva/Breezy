import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicatorsComponent } from './indicators/indicators.component';
import { MainViewComponent } from './main-view/main-view.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [MainViewComponent, MapComponent, IndicatorsComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [MainViewComponent],
})
export class AirQualityModule {}
