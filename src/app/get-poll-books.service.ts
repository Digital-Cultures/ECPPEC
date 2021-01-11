import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetPollBooksService {

  constructor(private http: HttpClient) { }
//Beds_1705a/1 192.168.0.51
  ///dataUrl='http://192.168.0.51:8888/ECCPEC_code/php/getPollBooks.php/?BookCode=';
 // dataUrl='http://localhost:8888/ECCPEC_code/php/getPollBooks.php/?BookCode=';
  dataUrl='https://ecppec.ncl.ac.uk/php/getPollBooks.php/?BookCode=';
  //dataUrl = 'https://tomschofieldart.com/ECPPEC/php/getPollBooks.php/?BookCode=';
	getData(pollBookCode) {
		console.log("this.dataUrl+pollBookCode",this.dataUrl+pollBookCode);
	  return this.http.get(this.dataUrl+pollBookCode);
	}
}
