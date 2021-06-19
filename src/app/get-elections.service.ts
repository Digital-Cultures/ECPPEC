import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
	providedIn: 'root'
})
export class GetElectionsService {

	constructor(private http: HttpClient) { }
	
	dataUrl='https://ecppec.ncl.ac.uk/php/getElections.php';
	//dataUrl='http://localhost:9999/ECCPEC_code/php/getElections.php';
	getData() {
		return this.http.get(this.dataUrl);
	}
}
