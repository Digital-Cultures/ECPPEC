import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetWhoCouldVoteService {

  constructor(private http: HttpClient) { }
  dataUrl = 'assets/data/whocouldvote.json';

	getData() {
	  return this.http.get(this.dataUrl);
	}
}

