import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetLatLonService {

  constructor(private http: HttpClient) { }
  dataUrl = 'assets/data/locations_lat_lng.json';

	getData() {
	  return this.http.get(this.dataUrl);
	}
}