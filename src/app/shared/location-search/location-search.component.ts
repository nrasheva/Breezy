import { Component } from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.css'],
})
export class LocationSearchComponent {
  location = '';

  faArrowRight = faArrowRight;

  constructor() {}

  onSubmit() {
    // Here, you can make the request to the server using the value from `this.location`
    console.log('Location submitted:', this.location);
    // Add your request logic here
  }
}
