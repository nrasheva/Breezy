import { Component } from '@angular/core';
import { faSun, faFaceSmileBeam } from '@fortawesome/free-regular-svg-icons';
import {
  faMaskFace,
  faIndustry,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.css'],
})
export class IndicatorsComponent {
  faSun = faSun;
  faMaskFace = faMaskFace;
  faIndustry = faIndustry;
  faFaceSmileBeam = faFaceSmileBeam;
  faArrowRight = faArrowRight;
}
