import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GeojsonServiceService {

  constructor(private http: HttpClient) { }
  dataUrl = 'assets/data/england.json';

	getData() {
	  return this.http.get(this.dataUrl);
	}
}