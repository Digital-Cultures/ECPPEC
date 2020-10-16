import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CentroidsService {

  constructor(private http: HttpClient) { }
   dataUrl = 'assets/data/centroids.json';

	getData() {
	  return this.http.get(this.dataUrl);
	}
}

