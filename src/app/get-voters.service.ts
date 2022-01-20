import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetVotersService {

  constructor(private http: HttpClient) { }
  dataUrl='http://localhost:9999/ECCPEC_code/php/getElections.php';
	getData(params) {
    var url = this.dataUrl+params;
    //
    console.log("fetching from",url);
		return this.http.get(url);
	}
}

