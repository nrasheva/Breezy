import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationSearchComponent } from './location-search/location-search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QualityInfoMessageComponent } from './quality-info-message/quality-info-message.component';

@NgModule({
  declarations: [LocationSearchComponent, QualityInfoMessageComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [LocationSearchComponent, QualityInfoMessageComponent]
})
export class SharedModule {}
