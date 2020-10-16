import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
	host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class AboutComponent implements OnInit {

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
