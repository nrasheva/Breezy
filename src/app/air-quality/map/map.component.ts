import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LocationCoordinatesService } from 'src/app/shared/services/location-coordinates.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  location = '';
  private map!: L.Map;
  private marker!: L.Marker;
  defaultLocation = { latitude: 40.7128, longitude: -74.006 };
  isLoading = true;

  constructor(private locationCoordinatesService: LocationCoordinatesService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getCurrentLocation().subscribe(location => {
      if (location) {
        this.location = location.location;
      }
    });
    this.initMap();
    this.subscribeToLocationChanges();
  }

  private initMap(): void {
    this.map = L.map('map').setView([this.defaultLocation.latitude, this.defaultLocation.longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(this.map);

    const customIcon = L.icon({
      iconUrl: './assets/images/airBalloon.png',
      iconSize: [50, 60], 
      iconAnchor: [25, 70], 
    });

    this.marker = L.marker([51.505, -0.09], { icon: customIcon }).addTo(
      this.map
    );
    this.marker.bindPopup('Hello! I am a marker.');
  }

  private subscribeToLocationChanges(): void {
    this.locationCoordinatesService.currentLocationData.subscribe(
      ({ latitude, longitude }) => {
        if (this.map && this.marker) {
          this.map.setView(
            new L.LatLng(latitude, longitude),
            this.map.getZoom()
          );
          this.marker.setLatLng([latitude, longitude]);
          this.marker
            .getPopup()
            ?.setContent(`Updated location: ${latitude}, ${longitude}`);
          if (this.isLoading) {
            this.isLoading = false;
          }
        }
      }
    );
  }
}
