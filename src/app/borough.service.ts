import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoroughService {

  constructor(private http: HttpClient) { }
   dataUrl='assets/data/borough_locations.json';
	// dataUrl='/ECPPEC/php/getElections.php';
	getData() {
	  return this.http.get(this.dataUrl);
	}
}
