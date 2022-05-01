import { Component, OnInit } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser'
// import { NgModule } from '@angular/core'
// import { GoogleMapsModule } from '@angular/google-maps'

//import { AppComponent } from './app.component'

@Component({
  selector: 'app-basic-map',
  templateUrl: './basic-map.component.html',
  styleUrls: ['./basic-map.component.scss']
})
export class BasicMapComponent implements OnInit {

  constructor() { }

  markers = [];
  zoom = 12
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 0,
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }
  click(event: google.maps.MouseEvent) {
    console.log(event)
    this.addMarker();
    console.log(this.markers);
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
    this.addMarker();
    console.log(this.markers);
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
    this.addMarker();
  }
  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      options: { animation: google.maps.Animation.BOUNCE },
    })
  }

}
