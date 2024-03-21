import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { LocationCoordinatesService } from 'src/app/shared/services/location-coordinates.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;
  private marker!: L.Marker;

  constructor(private locationCoordinatesService: LocationCoordinatesService) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.subscribeToLocationChanges();
  }

  private initMap(): void {
    this.map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(this.map);

    const customIcon = L.icon({
      iconUrl: './assets/images/airBalloon.png', // Replace with the path to your image
      iconSize: [50, 60], // Size of the icon in pixels
      iconAnchor: [22, 47], // Point of the icon which will correspond to marker's location
    });

    // Correctly initialize the class property 'this.marker'
    this.marker = L.marker([51.505, -0.09], { icon: customIcon }).addTo(
      this.map
    );
    this.marker.bindPopup('Hello! I am a marker.');
  }

  private subscribeToLocationChanges(): void {
    this.locationCoordinatesService.currentLocationData.subscribe(
      ({ latitude, longitude }) => {
        // Ensure this.marker is used to update its position
        if (this.map && this.marker) {
          this.map.setView(
            new L.LatLng(latitude, longitude),
            this.map.getZoom()
          );
          this.marker.setLatLng([latitude, longitude]);
          this.marker
            .getPopup()
            ?.setContent(`Updated location: ${latitude}, ${longitude}`);
        }
      }
    );
  }
}
