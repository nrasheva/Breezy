import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { IndicatorsComponent } from './indicators/indicators.component';
import { MainViewComponent } from './main-view/main-view.component';

@NgModule({
  declarations: [MainViewComponent, MapComponent, IndicatorsComponent],
  imports: [CommonModule],
  exports: [MainViewComponent]
})
export class AirQualityModule {}
