import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class HOPService {

	constructor(private http: HttpClient) { }

	dataUrl='http://localhost:8888/ECCPEC_code/php/getHOP.php/?constituency=';
//	dataUrl='/ECPPEC/php/getHOP.php/?constituency=';
	getData(constituency, year) {
		//console.log("this.dataUrl+constituency",this.dataUrl+constituency+"&year="+year);
		return this.http.get(this.dataUrl+constituency+"&year="+year);
	}
}


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
	//   providedIn: 'root'
	// })
	// export class GetPollBooksService {

		//   constructor(private http: HttpClient) { }
		// //Beds_1705a/1
		//   dataUrl='http://localhost:8888/ECCPEC_code/php/getPollBooks.php/?BookCode=';
		//   //dataUrl='/ECPPEC/php/getPollBooks.php/?BookCode=';
		// 	getData(pollBookCode) {
			// 		console.log("this.dataUrl+pollBookCode",this.dataUrl+pollBookCode);
			// 	  return this.http.get(this.dataUrl+pollBookCode);
			// 	}
			// }
