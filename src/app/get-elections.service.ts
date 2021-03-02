import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
	providedIn: 'root'
})
export class GetElectionsService {

	constructor(private http: HttpClient) { }
	//
	//dataUrl='http://192.168.0.51:8888/ECCPEC_code/PHP/getElections.php';
	//dataUrl='http://localhost:9999/ECCPEC_code/PHP/getElections.php';
	//	dataUrl='/ECPPEC/php/getElections.php';
	//dataUrl='https://ecppec.ncl.ac.uk/php/getElections.php'
	dataUrl='https://ecppec.ncl.ac.uk/php/getElections.php';
	//dataUrl='/php/getElections.php';
	getData() {
		return this.http.get(this.dataUrl);
	}
}
