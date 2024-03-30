import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-custom-location',
  templateUrl: './custom-location.component.html',
  styleUrls: ['./custom-location.component.css'],
})
export class CustomLocationComponent {
  location = '';

  faArrowRight = faArrowRight;

  constructor() {}
}
