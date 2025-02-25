import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationSearchComponent } from './location-search/location-search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QualityInfoMessageComponent } from './quality-info-message/quality-info-message.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { LocationCoordinatesService } from './services/location-coordinates.service';

@NgModule({
  declarations: [
    LocationSearchComponent,
    QualityInfoMessageComponent,
    LoaderComponent,
  ],
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  exports: [
    LocationSearchComponent,
    QualityInfoMessageComponent,
    LoaderComponent,
  ],
  providers: [LocationCoordinatesService],
})
export class SharedModule {}
