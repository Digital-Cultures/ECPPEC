import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-api',
	templateUrl: './api.component.html',
	styleUrls: ['./api.component.scss'],
	host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class ApiComponent implements OnInit {

	constructor() { }
	myInnerHeight:number;
	ngOnInit() {
		this.myInnerHeight = window.innerHeight;
		console.log("innerHeight",this.myInnerHeight);
	}
	onResize(event) {
  // event.target.innerWidth;
  this.myInnerHeight = event.target.innerHeight;
  console.log(this.myInnerHeight);
}
}
