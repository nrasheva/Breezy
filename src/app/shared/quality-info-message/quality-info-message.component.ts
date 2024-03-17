import { Component } from '@angular/core';
import { faFaceSmileBeam } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-quality-info-message',
  templateUrl: './quality-info-message.component.html',
  styleUrls: ['./quality-info-message.component.css'],
})
export class QualityInfoMessageComponent {
  faFaceSmileBeam = faFaceSmileBeam;
}
