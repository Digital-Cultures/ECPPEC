import { ElementRef, ApplicationRef, Component, Directive, OnInit, OnDestroy, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { GoogleMapsModule,GoogleMap } from '@angular/google-maps'

import { ResizeEvent } from 'angular-resizable-element';
import { GeojsonServiceService } from '../geojson-service.service';

import { GetElectionsService } from '../get-elections.service';

import { BoroughService } from '../borough.service';
import { CentroidsService } from '../centroids.service';
import { GetPollBooksService } from '../get-poll-books.service';
import { HOPService } from '../hop.service';

import { DownloadService } from '../download.service';
import { DownloadPollBooksService } from '../download-poll-books.service';


import { GetLatLonService } from '../get-lat-lon.service';
//import { Options, ChangeContext, PointerType } from 'ng5-slider';

import { HttpParams, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Location } from '../location';

import { MatFormFieldControl } from '@angular/material/form-field';

import { FormControl } from '@angular/forms';
import * as cloneDeep from 'lodash/cloneDeep';
import { DoCheck, KeyValueDiffers, KeyValueChangeRecord } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { PollbookDialogueComponent } from '../pollbook-dialogue/pollbook-dialogue.component';
import { DialogueComponent } from '../dialogue/dialogue.component';
import { WarningDialogueComponent } from '../warning-dialogue/warning-dialogue.component';

import { WalkthroughModule } from 'ngx-walkthrough';
import { TooltipPosition } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { Injectable } from '@angular/core';
import { ThisReceiver, ThrowStmt } from '@angular/compiler';


export interface Election {
	election_year: string;
	election_month: string;
	constituency: string;
	countyboroughuniv: string;
	by_election_general: string;
	contested: string;
	election_id: string;
	franchise_type:string;
	pollbook_id: string;
	by_election_cause: string;
	notes: string;
	latitude: string;
	longitude: string;
	lat:number;
	lng:number;
}
export interface PollBook {

	BookCode: string;
	PrintMS: string;
	Citation: string;
	Holdings: string;
	Source: string;
	ElectionCode: string;
	Notes: string;
}

export interface PollBookResponse {

	num_results: number;
	poll_books: PollBook[];
}

export interface Elections {
	num_results: number;
	earliest_year: number;
	latest_year: number;
	elections: any[];
}
export interface FilterObj {
	lowValue: number;
	highValue: number;
}
export interface APIResponse {
	books: PollBook[];
}
export interface HOPData {
	innerText: string;
	yearRange: string;
	url: string;
	constituency: string;
	fetch: boolean;
}

export interface GEOJSON {
	type: string;
	features: any[];
}

export interface googleMapsMarkerWrapper {
	position: google.maps.LatLngLiteral;
	options: google.maps.MarkerOptions;
	title: string;
	type:string;
}


export interface constituency {
	lat: number;
	lng: number;
	formatted_address?: string;
	pollbooks: PollBook[];
	
}



@Component({
	templateUrl: './viz.component.html',
	styleUrls: ['./viz.component.scss']
})
export class VizComponent implements OnInit, OnDestroy, OnChanges {
	

	private _differ: any;

	constructor(public dialog: MatDialog, private _differs: KeyValueDiffers, private appRef: ApplicationRef, private centroidsService: CentroidsService, private boroughService: BoroughService, private http: HttpClient, private hOPService: HOPService, private downloadPollBooksService: DownloadPollBooksService, private downloadService: DownloadService, private getElectionsService: GetElectionsService, private geojsonServiceService: GeojsonServiceService, private getPollBooksService: GetPollBooksService, private getLatLonService: GetLatLonService) {
		this._differ = _differs.find({}).create();
	}

	constituencies: any[];

	filterargs: FilterObj;

	//@dan hop is history of parliament. I have a service which goes and scrapes their etnry for an election
	hopData: HOPData;


	 elections: Election[];
	 uniqueElections: Election []=[];

	public style: object = {};

	gotPollBooks: boolean = false;

	locationLookup: any;
	//debouncer for the datalayer click
	clicked:boolean = false; 

	zoom: number = 7;
	mapIsReady:boolean = false;
	// options:google.maps.MapOptions= {
	// 	mapTypeId: 'hybrid',

	// 	maxZoom: 10,
	// 	minZoom: 2,
	// 	styles:[
	// 		{
	// 		  "elementType": "geometry",
	// 		  "stylers": [
	// 			{
	// 			  "color": "#f5f5f5"
	// 			}
	// 		  ]
	// 		},
	// 		{
	// 		  "elementType": "labels",
	// 		  "stylers": [
	// 			{
	// 			  "visibility": "off"
	// 			}
	// 		  ]
	// 		},
	// 		{
	// 		  "elementType": "labels.icon",
	// 		  "stylers": [
	// 			{
	// 			  "visibility": "off"
	// 			}
	// 		  ]
	// 		},
	// 		{
	// 		  "elementType": "labels.text.fill",
	// 		  "stylers": [
	// 			{
	// 			  "color": "#616161"
	// 			}
	// 		  ]
	// 		},
	// 		{
	// 		  "elementType": "labels.text.stroke",
	// 		  "stylers": [
	// 			{
	// 			  "color": "#f5f5f5"
	// 			}
	// 		  ]
	// 		},
	// 		{
	// 		  "featureType": "administrative.land_parcel",
	// 		  "elementType": "labels.text.fill",
	// 		  "stylers": [
	// 			{
	// 			  "color": "#bdbdbd"
	// 			}
	// 		  ]
	// 		},
	// 		{
	// 		  "featureType": "administrative.neighborhood",
	// 		  "stylers": [
	// 			{
	// 			  "visibility": "off"
	// 			}
	// 		  ]
	// 		},
	// 		{
	// 		  "featureType": "poi",
	// 		  "elementType": "geometry",
	// 		  "stylers": [
	// 			{
	// 			  "color": "#eeeeee"
	// 			}
	// 		  ]
	// 		},
	// 		{
	// 		  "featureType": "poi",
	// 		  "elementType": "labels.text",
	// 		  "stylers": [
	// 			{
	// 			  "visibility": "off"
	// 			}
	// 		  ]
	// 		},
	// 		{
	// 		  "featureType": "poi",
	// 		  "elementType": "labels.text.fill",
	// 		  "stylers": [
	// 			{
	// 			  "color": "#757575"
	// 			}
	// 		  ]
	// 		},
	// 		{
	// 		  "featureType": "poi.business",
	// 		  "stylers": [
	// 			{
	// 			  "visibility": "off"
	// 			}
	// 		  ]
	// 		},
	// 		{
	// 		  "featureType": "poi.park",
	// 		  "elementType": "geometry",
	// 		  "stylers": [
	// 			{
	// 			  "color": "#e5e5e5"
	// 			}
	// 		  ]
	// 		},
	// 		{
	// 		  "featureType": "poi.park",
	// 		  "elementType": "labels.text.fill",
	// 		  "stylers": [
	// 			{
	// 			  "color": "#9e9e9e"
	// 			}
	// 		  ]
	// 		},
	// 		{
	// 		  "featureType": "road",
	// 		  "stylers": [
	// 			{
	// 			  "visibility": "off"
	// 			}
	// 		  ]
	// 		},
	// 		{
	// 		  "featureType": "road",
	// 		  "elementType": "geometry",
	// 		  "stylers": [
	// 			{
	// 			  "color": "#ffffff"
	// 			}
	// 		  ]
	// 		},
	// 		{
	// 		  "featureType": "road",
	// 		  "elementType": "labels.icon",
	// 		  "stylers": [
	// 			{
	// 			  "visibility": "off"
	// 			}
	// 		  ]
	// 		},
	// 		{
	// 		  "featureType": "road.arterial",
	// 		  "elementType": "labels.text.fill",
	// 		  "stylers": [
	// 			{
	// 			  "color": "#757575"
	// 			}
	// 		  ]
	// 		},
	// 		{
	// 		  "featureType": "road.highway",
	// 		  "elementType": "geometry",
	// 		  "stylers": [
	// 			{
	// 			  "color": "#dadada"
	// 			}
	// 		  ]
	// 		},
	// 		{
	// 		  "featureType": "road.highway",
	// 		  "elementType": "labels.text.fill",
	// 		  "stylers": [
	// 			{
	// 			  "color": "#616161"
	// 			}
	// 		  ]
	// 		},
	// 		{
	// 		  "featureType": "road.local",
	// 		  "elementType": "labels.text.fill",
	// 		  "stylers": [
	// 			{
	// 			  "color": "#9e9e9e"
	// 			}
	// 		  ]
	// 		},
	// 		{
	// 		  "featureType": "transit",
	// 		  "stylers": [
	// 			{
	// 			  "visibility": "off"
	// 			}
	// 		  ]
	// 		},
	// 		{
	// 		  "featureType": "transit.line",
	// 		  "elementType": "geometry",
	// 		  "stylers": [
	// 			{
	// 			  "color": "#e5e5e5"
	// 			}
	// 		  ]
	// 		},
	// 		{
	// 		  "featureType": "transit.station",
	// 		  "elementType": "geometry",
	// 		  "stylers": [
	// 			{
	// 			  "color": "#eeeeee"
	// 			}
	// 		  ]
	// 		},
	// 		{
	// 		  "featureType": "water",
	// 		  "elementType": "geometry",
	// 		  "stylers": [
	// 			{
	// 			  "color": "#c9c9c9"
	// 			}
	// 		  ]
	// 		},
	// 		{
	// 		  "featureType": "water",
	// 		  "elementType": "labels.text.fill",
	// 		  "stylers": [
	// 			{
	// 			  "color": "#9e9e9e"
	// 			}
	// 		  ]
	// 		}
	// 	  ]
	// }
	
	mystyles: any[] =[
		{
			"elementType": "geometry",
			"stylers": [
			{
				"color": "#999999"
			}
			]
		},
		{
			"elementType": "labels",
			"stylers": [
			{
				"visibility": "off"
			}
			]
		},
		{
			"elementType": "labels.text.fill",
			"stylers": [
			{
				"color": "#757575"
			}
			]
		},
		{
			"elementType": "labels.text.stroke",
			"stylers": [
			{
				"color": "#212121"
			}
			]
		},
		{
			"featureType": "administrative",
			"elementType": "geometry",
			"stylers": [
			{
				"color": "#757575"
			},
			{
				"visibility": "off"
			}
			]
		},
		{
			"featureType": "administrative.country",
			"elementType": "labels.text.fill",
			"stylers": [
			{
				"color": "#9e9e9e"
			}
			]
		},
		{
			"featureType": "administrative.land_parcel",
			"stylers": [
			{
				"visibility": "off"
			}
			]
		},
		{
			"featureType": "administrative.locality",
			"elementType": "labels.text.fill",
			"stylers": [
			{
				"color": "#bdbdbd"
			}
			]
		},
		{
			"featureType": "administrative.neighborhood",
			"stylers": [
			{
				"visibility": "off"
			}
			]
		},
		{
			"featureType": "poi",
			"stylers": [
			{
				"visibility": "off"
			}
			]
		},
		{
			"featureType": "poi",
			"elementType": "labels.text",
			"stylers": [
			{
				"visibility": "off"
			}
			]
		},
		{
			"featureType": "poi",
			"elementType": "labels.text.fill",
			"stylers": [
			{
				"color": "#757575"
			}
			]
		},
		{
			"featureType": "poi.park",
			"elementType": "geometry",
			"stylers": [
			{
				"color": "#181818"
			}
			]
		},
		{
			"featureType": "poi.park",
			"elementType": "labels.text.fill",
			"stylers": [
			{
				"color": "#616161"
			}
			]
		},
		{
			"featureType": "poi.park",
			"elementType": "labels.text.stroke",
			"stylers": [
			{
				"color": "#1b1b1b"
			}
			]
		},
		{
			"featureType": "road",
			"stylers": [
			{
				"visibility": "off"
			}
			]
		},
		{
			"featureType": "road",
			"elementType": "geometry.fill",
			"stylers": [
			{
				"color": "#2c2c2c"
			}
			]
		},
		{
			"featureType": "road",
			"elementType": "labels",
			"stylers": [
			{
				"visibility": "off"
			}
			]
		},
		{
			"featureType": "road",
			"elementType": "labels.icon",
			"stylers": [
			{
				"visibility": "off"
			}
			]
		},
		{
			"featureType": "road",
			"elementType": "labels.text.fill",
			"stylers": [
			{
				"color": "#8a8a8a"
			}
			]
		},
		{
			"featureType": "road.arterial",
			"elementType": "geometry",
			"stylers": [
			{
				"color": "#373737"
			}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry",
			"stylers": [
			{
				"color": "#3c3c3c"
			}
			]
		},
		{
			"featureType": "road.highway.controlled_access",
			"elementType": "geometry",
			"stylers": [
			{
				"color": "#4e4e4e"
			}
			]
		},
		{
			"featureType": "road.local",
			"elementType": "labels.text.fill",
			"stylers": [
			{
				"color": "#616161"
			}
			]
		},
		{
			"featureType": "transit",
			"stylers": [
			{
				"visibility": "off"
			}
			]
		},
		{
			"featureType": "transit",
			"elementType": "labels.text.fill",
			"stylers": [
			{
				"color": "#757575"
			}
			]
		},
		{
			"featureType": "water",
			"elementType": "geometry",
			"stylers": [
			{
				"color": "#000000"
			}
			]
		},
		{
			"featureType": "water",
			"elementType": "labels.text",
			"stylers": [
			{
				"visibility": "off"
			}
			]
		},
		{
			"featureType": "water",
			"elementType": "labels.text.fill",
			"stylers": [
			{
				"color": "#3d3d3d"
			}
			]
		}
		]

	center: google.maps.LatLngLiteral= {
		lat: 52.4862,
		lng: 1.8904
	}


	pollBooks: PollBookResponse;



	electionsMeta: Elections;

	HOPtext: string = "";

	animating: boolean = false;
	animatingId: number;



	constituencyNames: string [] = [];

	
	dynamicMarker: google.maps.Marker;
	dynamicMarkers: google.maps.Marker []=[];



	forceLink: boolean = false;

	//the main filters for the table/database
	filteredValues = {
		election_month: '', constituency: '', election_year: '', countyboroughuniv: '', contested: '', by_election_general: '', by_election_cause: '' ,franchise_type: '',pollbook_id: ''

	};
	

	//for the graph
	electionsPerYear: any[] = [];

	constituencyFilter = new FormControl();
	monthFilter = new FormControl();
	yearFilter = new FormControl();
	countyFilter = new FormControl();
	contestedFilter = new FormControl();
	byElectionGeneralFilter = new FormControl();
	byElectionCauseFilter = new FormControl();
	franchiseFilter = new FormControl();
	pollBookCodeFilter = new FormControl();
	globalFilter = '';


	displayedColumns: string[] = ['constituency', 'election_year', 'election_month', 'countyboroughuniv', 'by_election_general', 'by_election_cause','franchise_type', 'contested', 'pollbook_id'];
	dataSource = new MatTableDataSource<Election>();

	//for the timelines
	minYear: number = 1695;
	maxYear: number = 1832;

	// sliderOptions: Options = {
	// 	floor: 1695,
	// 	ceil: 1832
	// };


	// 
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(GoogleMap, { static: false }) map: GoogleMap;

	//this is a big inefficient watcher on the dataSource
	ngDoCheck() {


		// var datObj = {};
		// if (this.dataSource.filter.length > 0) {

		// 	datObj = JSON.parse(this.dataSource.filter);
		// }
		// const change = this._differ.diff(datObj);
		
		// if (change) {
		// 	this.electionsPerYear = this.getElectionsPerYear();
		// 	this.updateIsActive(this.getFilteredConstituencies());
		// 	this.setMapStyle();

		// 	this.dynamicMarkers.forEach(delement => {
		// 		var inData =false;
		// 		var cbu = "";
		// 	this.dataSource.filteredData.forEach(felement => {
				
		// 		if(delement.getTitle().trim()==felement.constituency.trim()){
		// 			inData = true;
		// 			cbu = felement.countyboroughuniv;
		// 		}

		// 	});
		// 	if(inData){
		// 		var image = {
		// 			url: './assets/images/smarker.svg',
		// 			size: new google.maps.Size(71, 71),
		// 			origin: new google.maps.Point(0, 0),
		// 			anchor: new google.maps.Point(17, 34),
		// 			scaledSize: new google.maps.Size(25, 25)
		// 		  };
		// 		  var options = {
		// 			icon:image,
		// 			title:	delement.getTitle(),
		// 			visible:cbu=="C" ? false : true,
		// 			label:  {text: delement.getTitle() , color: "white"}
		// 		}
	
	
		// 	 delement.setOptions(options);

		// 	}else{
		// 		var image = {
		// 			url: './assets/images/dot.svg',
		// 			size: new google.maps.Size(20, 20),
		// 			origin: new google.maps.Point(0, 0),
		// 			anchor: new google.maps.Point(10, 10),
		// 			scaledSize: new google.maps.Size(20, 20)
		// 		  };
		// 		  var options = {
		// 			icon:image,
		// 			title:delement.getTitle(),
		// 			visible:cbu=="C" ? false : true,
		// 			label:  {text: delement.getTitle() , color: "white"}
		// 		}
	
	
		// 	 delement.setOptions(options);

		// 	}
		// });


		// }
	}

	ngOnDestroy() {

	}
	ngOnInit() {
		this.dynamicMarker = new google.maps.Marker();
		this.dynamicMarker.setPosition({lat:51,lng:0});
			var image = {
				url: './assets/images/bmarker.svg',
				size: new google.maps.Size(71, 71),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(25, 25)
			  };
			  var options = {
				icon:image,
				title:	"test",
				visible:true,
				label:  {text: "test" , color: "white"}
			}


		 this.dynamicMarker.setOptions(options);

		for(var i=this.minYear;i<=this.maxYear;i++){
			var obj = {
				year:i,
				numElections:0,
				numContested:0
			}
			this.electionsPerYear.push(obj);
		}
		
		//main function containing callbacks from the API
		this.getData();

		//tedious material stuff to add pagination to the table
		this.dataSource.paginator = this.paginator;
		// when we land, open the initial modal with the search options in it
		

	
		this.hopData = {
			innerText: "",
			yearRange: "",
			url: "",
			constituency: "",
			fetch: true

		}


	}


	///////////////////////////////////**** START DATA SUBSCRIPTIONS****///////////////////////////////////

	getBook($event, element) {

		var splitCodes = element.pollbook_id.split(";");
		var trimmedCodes = "";
		for (var i = 0; i < splitCodes.length; i++) {
			trimmedCodes += splitCodes[i].trim() + ";";
		}
		trimmedCodes = trimmedCodes.substring(0, trimmedCodes.length - 1);

		this.getPollBooksService.getData(trimmedCodes)
		.subscribe(
			(data: PollBookResponse) => this.pollBooks = {
				num_results: data['num_results'],
				poll_books: data['poll_books'],
			}, err => console.error(err), () => this.openPollBookDialog());
	}

	





	//main data grabbign  function called in ngonint 
	getData() {

		

		this.getElectionsService.getData()
		.subscribe(
			(data: Elections) => this.electionsMeta = {
				num_results: data['num_results'],
				earliest_year: data['earliest_year'],
				latest_year: data['latest_year'],
				elections: data['elections']
			}, err => console.error(err), () => this.setUpFilters());



	};
	///////////////////////////////////**** END DATA SUBSCRIPTIONS****///////////////////////////////////



	

	


	

	







	///////////////////////////////////****START RESIZE FUNCTIONS****///////////////////////////////////

	//the database table is draggable
	onResizeEnd(event: ResizeEvent): void {
		
		this.style = {
			position: 'fixed',
			right: "3%",
			width: `${event.rectangle.width}px`,
		};
	}

	onResizeStart(event: ResizeEvent): void {
	

	}
	///////////////////////////////////****END RESIZE FUNCTIONS****///////////////////////////////////



















	///////////////////////////////////****START GRAPH FUNCTIONS****///////////////////////////////////
	getNumberOfContested() {
		var count = 0;
		for (var i = 0; i < this.dataSource.filteredData.length; i++) {
			
			if (this.dataSource.filteredData[i].contested.trim().toLowerCase().indexOf("y") > -1) count++;

		}
		return count;
	}
	//this is used to calibrate the bar heigh on the graph
	getMaxMinElectionsPerYear() {
		var max = 0;
		var min = 10000000;
		for (var i = 0; i < this.electionsPerYear.length; i++) {
			if (this.electionsPerYear[i]['numElections'] > max) max = this.electionsPerYear[i]['numElections'];
			if (this.electionsPerYear[i]['numElections'] < min) min = this.electionsPerYear[i]['numElections'];

		}
		return { max: max, min: min };
	}
	getHeight(bar) {
		return bar.numElections;
	}
	//is called as a [ngStyle]= in the html for the graph
	getBarStyle(bar, divWidth, divHeight, contested) {

		var maxMin = this.getMaxMinElectionsPerYear();
		var yearRange = this.maxYear - this.minYear + 1;
		//var barWidth = divWidth / yearRange;
		var barWidth = divWidth / 137;
		var left = bar.year - 1695;
		left *= barWidth;
		var leftStr = left.toString();
		leftStr += "px";
		var barHeight = 0;
		var col;
		if (contested) {
			barHeight = this.mapRange(bar.numContested, maxMin.min, maxMin.max, 0, divHeight);

		}
		else {
			barHeight = this.mapRange(bar.numElections, maxMin.min, maxMin.max, 0, divHeight);
		}

		return {

			width: barWidth + "px",
			// bottom:"0px",
			height: barHeight + "px",
			left: leftStr

		};

	}
	getElectionsPerYear() {
		this.electionsPerYear.forEach(element => {
			element.numElections = 0;
			element.numContested = 0;
		});

	
		for (var i = 0; i < this.dataSource.filteredData.length; i++) {
			var index = parseInt(this.dataSource.filteredData[i]['election_year']) - 1695;
			if (index >= 0 && index < this.electionsPerYear.length) {


				this.electionsPerYear[index]['numElections']++;
				if (this.dataSource.filteredData[i]['contested'] == 'Y') {
					this.electionsPerYear[index]['numContested']++;
				}
			}

		}
		return this.electionsPerYear;
	}
	

	//just for neatness in the text of the graph
	getPlural(number) {
		if (number == 1) {
			return " was contested.";
		}
		return " were contested.";
	}

	///////////////////////////////////****END GRAPH FUNCTIONS****///////////////////////////////////















	///////////////////////////////////****START LISTENER FUNCTIONS****///////////////////////////////////

	ngOnChanges(changes) {
	
	}
	// onValueChange(changeContext: ChangeContext): void {
	

	// }
	// sliderChange(changeContext: ChangeContext): void {

	// 	this.minYear = changeContext.value;
	// 	this.maxYear = changeContext.highValue;

	// 	this.yearFilter.setValue(changeContext.value.toString() + "-" + changeContext.highValue.toString());
	// 	this.dataSource.filter = JSON.stringify(this.filteredValues);


	// }

	///////////////////////////////////****END LISTENER FUNCTIONS****///////////////////////////////////



	
	/////////////////////////////////////////*********START MAP UPDATE FUNCTIONS***********/////////////////////////////////////////
	setUpMapData(){
		
		this.map.data.loadGeoJson("https://ecppec.ncl.ac.uk/assets/data/england.json");
		
		this.map.data.setStyle(function(feature) {
			
			
				var color = "white";
			
			return {
						fillColor: "pink",
						strokeColor: "white",
						strokeWeight: 1,
						zIndex:0,
			};
		});
		//TODO where's DURHAM?
		this.map.data.addListener('mouseover', (event) => {
		
			this.setMatchingCountyMarkerVisibility(true, event.feature.getProperty("name"));
		});
		this.map.data.addListener('mouseout', (event) => {
				this.setMatchingCountyMarkerVisibility(false, event.feature.getProperty("name"));
			});
		
			this.map.data.addListener('click', (event) => {
				if(!this.clicked){
					this.clicked =true;
			if(event.feature.getProperty('isActive')){
			
				event.feature.setProperty('isActive',false);
				var updatedConstituencyFilterValue = this.filteredValues['constituency'].replace(','+event.feature.getProperty("name"),'');
				this.constituencyFilter.setValue(updatedConstituencyFilterValue);
				this.filteredValues['constituency']=updatedConstituencyFilterValue;
				this.dataSource.filter = JSON.stringify(this.filteredValues);
			
			}
			else{
			
				 event.feature.setProperty('isActive',true);
				 this.filteredValues['constituency'] =this.filteredValues['constituency']+","+event.feature.getProperty("name");
				 this.constituencyFilter.setValue(this.filteredValues['constituency']);
				this.dataSource.filter = JSON.stringify(this.filteredValues);
			
			}
			
			this.appRef.tick() ;
			setTimeout(() => {
				this.clicked = false;
			}, 500);
			
		}
		});
		

		this.setMapStyle();
	}
	mapReady(){
		if(!this.mapIsReady){
			this.setUpMapData();
		
		}
		
	

	}
	setMapStyle(){
		this.map.data.setStyle(function(feature) {
		    var name = feature.getProperty('isActive');
		    var color = "white";
		    var index = 1;
		    if( name ){
		    	color = "#0db9f0";
		    	 index = 2;
				 
				 
		    }
		    else{
				color ="white";
				 index = 1;
		    };
		    return {
		      strokeColor: color,
		      strokeWeight: index,
			  zIndex:index,
			  fillColor: "grey"
		    };
		});

	}
	setallInActive(){
		this.map.data.forEach(function(feature) {
			feature.setProperty("isActive",false)
		});
	}
	updateIsActive(constituencies: String []){
		this.map.data.forEach(function(feature) {
			var name = feature.getProperty('name');
			if( constituencies.indexOf(name)>-1){
				
				feature.setProperty("isActive",true)
				
			}
			else{
				feature.setProperty("isActive",false)
			}
		});
	}
	updateMapStyles(constituencies: String []){

		this.map.data.setStyle(function(feature) {
		    var name = feature.getProperty('name');
		    var color = "white";
		    var index = 1;
		    if( constituencies.indexOf(name)>-1){
		    	color = "#0db9f0";
		    	 index = 3;
		    }
		    else{
				color ="white";
				 index = 1;
		    };
		    return {
		      strokeColor: color,
		      strokeWeight: index,
			  zIndex:index
		   
		    };
		});

	}
	mapZoomChanged() {
	

	

		
	}
	//TODO What is the actual call back for the data
	mapIdle(){
		
		var featureCount = 0;
		this.map.data.forEach(function(feature) {
			featureCount++;
		});
		if(featureCount > 1 && this.mapIsReady==false) {
			this.setallInActive();
			
			this.mapIsReady = true;
			
		}
		
	}

	//return the markers included from the current list of filtered table data



	//this is the really problematic bit that causes the biggest data delay. 
	updateDataLayerStyles() {
		//a simple list of current constituenciy names
		var filteredConstituencies = this.getFilteredConstituencies();


	}
	clearMap() {

		// this.displayedMarkers = this.markers.filter(marker => this.getFilteredConstituencies().includes("gobbldeygook"));


	}

	/////////////////////////////////////////*********END MAP UPDATE FUNCTIONS***********/////////////////////////////////////////
















	/////////////////////////////////////////*********START UTILITY FUNCTIONS***********/////////////////////////////////////////

	setMatchingCountyMarkerVisibility(visible, constituency){
		// var image = {
		// 	url: './assets/images/dot.svg',
		// 	size: new google.maps.Size(20, 20),
		// 	origin: new google.maps.Point(0, 0),
		// 	anchor: new google.maps.Point(10, 10),
		// 	scaledSize: new google.maps.Size(20, 20)
		//   };
		//   var options = {
		// 	icon:image,
		// 	title:constituency,
		// 	visible:visible,
		// 	label:  {text: constituency , color: "white"}
		// }


	
		this.dynamicMarkers.forEach(element => {
			if(element.getTitle()==constituency){
			//	element.setOptions(options);
				element.setVisible(visible);
			}
		});
		this.appRef.tick();


	}

	getUniqueElections(){
	// 	var constituencies = [];
	// 	if(this.uniqueElections!=undefined){
	// 	this.dataSource.data.forEach(element => {
	// 		if(constituencies.indexOf(element.constituency)==-1){
	// 		//	console.log("adding ",element)
	// 		constituencies.push(element.constituency);
	// 		this.uniqueElections.push(element);
	// 		}
	// 	});
	// }
	this.uniqueElections = this.dataSource.data.filter((value, index, self) => self.map(x => x.constituency).indexOf(value.constituency) == index);
	//console.log("this.uniqueElections",this.uniqueElections);
	//this.uniqueElections = this.dataSource.filteredData.map(item => item.constituency).filter((value, index, self) => self.indexOf(value) === index);

	}
	
	getPosition(marker){
		return {lat:51.0,lng:1.8};
	}
	arrayRemove(arr, value) { return arr.filter(function (ele) { return ele != value; }); }
		//generic mapping funciton

		mapRange = (num, in_min, in_max, out_min, out_max) => {
		return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
	}
	
	getHasPollBooks(pollbook_id) {
		if (pollbook_id.length > 0) return 'Y (' + pollbook_id.split(";").length + ')';

		return 'N';
	}
	//what it sounds like - jsut called at the beginning to get some nice looking data
	generateRandomSearch() {
		var spread = Math.floor(Math.random() * 8) + 2;
		var fullRange = 1832 - (1695 + spread);
		var start = Math.floor(Math.random() * fullRange) + 1696;
		this.minYear = start;
		this.maxYear = spread + start;
		// var y = 1777;
		//TODO add some other filters here like by election cause
		this.yearFilter.setValue(this.minYear.toString() + "-" + this.maxYear.toString());

		this.constituencyFilter.setValue(this.getRandomConstituenciesString(20));
		this.dataSource.filter = JSON.stringify(this.filteredValues);
	}
	getRandomConstituenciesString(numRandomConsituencies) {
		var filteredConstituencies = [];


		for (var i = 0; i < this.dataSource.filteredData.length; i++) {
			if (!filteredConstituencies.includes(this.dataSource.filteredData[i].constituency)) {
				filteredConstituencies.push(this.dataSource.filteredData[i].constituency);
			}
		}
		var indices = [];
		var randomConsituencies = "";

		var isFirst = true;
		for (var i = 0; i < numRandomConsituencies; i++) {
			var randomIndex = Math.floor(Math.random() * filteredConstituencies.length - 1);
			// if(!in_array())

			if (!indices.includes(randomIndex)) {
				indices.push(randomIndex);
				if (isFirst) {
					randomConsituencies = filteredConstituencies[randomIndex];
					isFirst = false;
				}
				else {
					randomConsituencies += "," + filteredConstituencies[randomIndex];
				}

			}
		}



		return randomConsituencies;

	}

	/////////////////////////////////////////*********END UTILITY FUNCTIONS***********/////////////////////////////////////////



















	/////////////////////////////////////////*********START BUTTONS AND SLIDERS FUNCTIONS***********/////////////////////////////////////////


	animateTimeLine(){
	
		if(this.animating){
			if (this.animatingId) {
				clearInterval(this.animatingId);
			  }
		}
		else{
			this.animatingId  =setInterval(() => {
				this.minYear++; 
				this.maxYear++; 
				this.yearFilter.setValue(this.minYear.toString() + "-" + this.maxYear.toString());
				this.dataSource.filter = JSON.stringify(this.filteredValues);
				}, 300);

		}
		this.animating = !this.animating;
	}
	//downlaod the elections data
	download() {
		this.downloadService.downloadFile(this.dataSource.filteredData, 'elections');
	}
	//downlaod pollbook data
	downloadPollBooks() {

		this.downloadPollBooksService.downloadFile(this.pollBooks.poll_books, 'pollBooks');
	}


	//called when the filter updates I think
	setDateSlider() {
		console.log(this.yearFilter.value);
		var years = this.yearFilter.value;
		if (years.split("-").length == 2 && years.trim().length==9) {
			console.log("year range");
			this.minYear = years.split("-")[0].trim();
			this.maxYear = years.split("-")[1].trim();
		}
		else if (years.split(",").length > 1) {
			console.log("year list");
			// this.minYear = years.split(",")[0];
			// this.maxYear = 1832;

		}
		else if (years.length == 4) {
			console.log("single year");
			this.minYear = parseInt(years.trim());
			this.maxYear = parseInt(years.trim());
		}
		else {
			console.log("no match for year format");
			// this.minYear = 1695;
			// this.maxYear = 1832;
		}
	}




	/////////////////////////////////////////*********END BUTTONS AND SLIDERS FUNCTIONS***********/////////////////////////////////////////



















	/////////////////////////////////////////*********START FILTER FUNCTIONS***********/////////////////////////////////////////
//https://timdeschryver.dev/blog/google-maps-as-an-angular-component

	//called at the start I think and sets up all the filter subscriptions
	setUpFilters() {
	
		this.dataSource = new MatTableDataSource<Election>(this.electionsMeta.elections);
		this.dataSource.paginator = this.paginator;
		this.getUniqueElections();
	
		this.uniqueElections.forEach(element => {
			var thisDynamicMarker = new google.maps.Marker();
			
			thisDynamicMarker.setPosition({lat:+element.lat,lng:+element.lng});
				var image = {
					url: './assets/images/dot.svg',
					size: new google.maps.Size(20, 20),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(10, 10),
					scaledSize: new google.maps.Size(20, 20)
				  };
				  
				  var options = {
					icon:image,
					title:	element.constituency,
					visible:element.countyboroughuniv=="C" ? false : true,
					label:  {text: element.constituency , color: "white"}
				}
	
	
			 thisDynamicMarker.setOptions(options);
			 this.dynamicMarkers.push(thisDynamicMarker);
			
		});


		const dialogRef = this.dialog.open(DialogueComponent,{
			data: this.uniqueElections,
		});

		dialogRef.afterClosed().subscribe(
			data => this.setSearchFromDialogue(data)
			);

		this.constituencyFilter.valueChanges.subscribe((constituencyFilterValue) => {
		//	console.log("change in consituencyfilter");
			this.filteredValues['constituency'] = constituencyFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);

			this.onDataSubscriptionChange();
			

		});

		this.monthFilter.valueChanges.subscribe((monthFilterValue) => {
			this.filteredValues['election_month'] = monthFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
			this.onDataSubscriptionChange();

		});

		this.yearFilter.valueChanges.subscribe((yearFilterValue) => {

			var yearRange = yearFilterValue.split(",");
			this.setDateSlider();

			this.filteredValues['election_year'] = yearFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
			this.onDataSubscriptionChange();
		
		});


		this.countyFilter.valueChanges.subscribe((countyFilterValue) => {
			this.filteredValues['countyboroughuniv'] = countyFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
			this.onDataSubscriptionChange();
		});

		this.contestedFilter.valueChanges.subscribe((contestedFilterValue) => {
			this.filteredValues['contested'] = contestedFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
			this.onDataSubscriptionChange();
		});

		this.byElectionGeneralFilter.valueChanges.subscribe((byElectionGeneralFilterValue) => {
			this.filteredValues['by_election_general'] = byElectionGeneralFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
			this.onDataSubscriptionChange();

		});
		
		this.byElectionCauseFilter.valueChanges.subscribe((byElectionCauseFilterValue) => {
			this.filteredValues['by_election_cause'] = byElectionCauseFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
			this.onDataSubscriptionChange();

		});
		this.franchiseFilter.valueChanges.subscribe((franchiseFilterValue) => {
			this.filteredValues['franchise_type'] = franchiseFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
			this.onDataSubscriptionChange();

		});
		this.pollBookCodeFilter.valueChanges.subscribe((pollBookCodeFilterValue) => {
			this.filteredValues['pollbook_id'] = pollBookCodeFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
			this.onDataSubscriptionChange();

		});

		this.dataSource.filterPredicate = this.customFilterPredicate();

	}
	onDataSubscriptionChange(){
	
		this.electionsPerYear = this.getElectionsPerYear();
		this.updateIsActive(this.getFilteredConstituencies());
		this.setMapStyle();

		this.dynamicMarkers.forEach(delement => {
			var inData =false;
			var cbu = "";
		this.dataSource.filteredData.forEach(felement => {
			
			if(delement.getTitle().trim()==felement.constituency.trim()){
				inData = true;
				cbu = felement.countyboroughuniv;
			}

		});
		if(inData){
			var image = {
				url: './assets/images/smarker.svg',
				size: new google.maps.Size(71, 71),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(25, 25)
			  };
			  var options = {
				icon:image,
				title:	delement.getTitle(),
				visible:cbu=="C" ? false : true,
				label:  {text: delement.getTitle() , color: "white"}
			}


		 delement.setOptions(options);

		}else{
			var image = {
				url: './assets/images/dot.svg',
				size: new google.maps.Size(20, 20),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(10, 10),
				scaledSize: new google.maps.Size(20, 20)
			  };
			  var options = {
				icon:image,
				title:delement.getTitle(),
				visible:cbu=="C" ? false : true,
				label:  {text: delement.getTitle() , color: "white"}
			}


		 delement.setOptions(options);

		}
	});


	}
	//what it sound slike, set all the searches to blank and include all daata
	clearSearch() {

		this.constituencyFilter.setValue("");

		this.monthFilter.setValue("");

		this.countyFilter.setValue("");

		this.contestedFilter.setValue("");

		this.byElectionGeneralFilter.setValue("");
		this.byElectionCauseFilter.setValue("");
		this.franchiseFilter.setValue("");
		this.pollBookCodeFilter.setValue("");
		this.constituencyFilter.setValue("");

		this.dataSource.filter = JSON.stringify(this.filteredValues);
		
	}
	//returns a list of unique consituency names
	getFilteredConstituencies() {

		var filteredConstituencies = this.dataSource.filteredData.map(item => item.constituency).filter((value, index, self) => self.indexOf(value) === index);
		return filteredConstituencies;
	}

	customFilterPredicate() {
		this.pollBooks = null;
		const myFilterPredicate = (data: Election, filter: string): boolean => {
			var globalMatch = !this.globalFilter;
			if (this.globalFilter) {
				
				globalMatch = data.election_month.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1
				|| data.constituency.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1
				|| data.countyboroughuniv.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1
				|| data.franchise_type.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1
				|| data.by_election_general.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;

			}

			if (!globalMatch) {
				return;
			}

			let searchString = JSON.parse(filter);
			return this.hasConstituencies(data, searchString)
			&& this.hasMonths(data, searchString)
			&& this.hasYears(data, searchString)
		
			&& data.countyboroughuniv.toString().trim().toLowerCase().indexOf(searchString.countyboroughuniv.toLowerCase()) !== -1
			&& data.contested.toString().trim().toLowerCase().indexOf(searchString.contested.toLowerCase()) !== -1
			&& data.by_election_general.toString().trim().toLowerCase().indexOf(searchString.by_election_general.toLowerCase()) !== -1
			&& data.by_election_cause.toString().trim().toLowerCase().indexOf(searchString.by_election_cause.toLowerCase()) !== -1
			&& data.contested.toString().trim().toLowerCase().indexOf(searchString.contested.toLowerCase()) !== -1
			&& data.franchise_type.toString().trim().toLowerCase().indexOf(searchString.franchise_type.toLowerCase()) !== -1
			&& this.getHasPollBooksFilter(data.pollbook_id.toString().trim().toLowerCase(), searchString.pollbook_id.toLowerCase()) !== -1

			;

		}

		return myFilterPredicate;
	}

	
	hasConstituencies(data, searchString) {
		if (searchString.constituency.includes(",")) {

			var constituencyList = searchString.constituency.split(",");
			for (var i = 0; i < constituencyList.length; i++) {
				if (constituencyList[i].trim().toLowerCase() === data.constituency.toString().trim().toLowerCase()) {
					return 1;
				}
			}
			return 0;


		}
		else {
			return data.constituency.toString().trim().toLowerCase().indexOf(searchString.constituency.toLowerCase()) !== -1;
		}
		return 0;
	}
	hasMonths(data, searchString) {
		if (searchString.election_month.includes(",")) {

			var monthList = searchString.election_month.split(",");
			for (var i = 0; i < monthList.length; i++) {
				if (monthList[i].trim() === data.election_month.toString().trim()) {
					return 1;
				}
			}
			return 0;


		}
		else {
			return data.election_month.toString().trim().indexOf(searchString.election_month) !== -1;
		}
		return 0;
	}
	hasYears(data, searchString) {
		if (searchString.election_year.includes(",")) {

			var yearList = searchString.election_year.split(",");
			for (var i = 0; i < yearList.length; i++) {
				if (yearList[i].trim() === data.election_year.toString().trim()) {
					return 1;
				}
			}
			return 0;


		}
		else if (searchString.election_year.includes("-")&&searchString.election_year.length==9) {
			var yearRange = searchString.election_year.split("-");
			if (yearRange.length == 2) {
				var lowRange = parseInt(yearRange[0].trim());
				var highRange = parseInt(yearRange[1].trim());
				var thisYear = parseInt(data.election_year.toString().trim());

				if (thisYear >= lowRange && thisYear <= highRange) return 1;
			}


		}
		else if (searchString.election_year.length==4) {
			return data.election_year.toString().trim().indexOf(searchString.election_year) !== -1;
		}
		return 0;
	}

	yearInRange(data, searchString, year) {
		//for some reson the search term isn't coming throuhg
		if (this.yearFilter.value.length == 0) return 0;

		//if this is a year range separated by a hyphen
		if (this.yearFilter.value.indexOf("-") != -1) {
			var yearRange = this.yearFilter.value.split("-");
			if (yearRange.length == 2) {
				if (yearRange[0].trim().length == 4 && yearRange[1].trim().length == 4) {
					if (year >= parseInt(yearRange[0].trim()) && year <= parseInt(yearRange[1].trim())) return 0;
				} else if (yearRange[0].trim().length == 4 && yearRange[1].trim().length != 4) {
					if (year == parseInt(yearRange[0].trim())) return 0;
				}


			}
		}
		//otherwise assume it's a lst
		else {

			if (this.yearFilter.value.includes(",")) {

				var yearList = this.yearFilter.value.split(",");
				for (var i = 0; i < yearList.length; i++) {
					if (yearList[i].trim() === year.trim()) {
						return 1;
					}
				}
				return 0;


			}
			else {
				return this.yearFilter.value.toString().trim().indexOf(year) !== -1;
			}
		}

		return -1;

	}
	getHasPollBooksFilter(pollbook_id, searchTerm) {
		if (searchTerm == 'y') {
			if (pollbook_id.length > 1) {
				return 0;
			} else {
				return -1;
			}


		}
		else if (searchTerm == 'n') {
			if (pollbook_id.length == 0) {
				return 0;
			} else {
				return -1;
			}
		}
		return 0;

	}

	///////////////////////////////////****END FILTER FUNCTIONS****///////////////////////////////////




















	///////////////////////////////////****START DIALOGUE FUNCTIONS****///////////////////////////////////

	openPollBookDialog() {

		let dialogRef = this.dialog.open(PollbookDialogueComponent, {
			data: this.pollBooks,
		});
	}
	//open the main search dialogue (this is called from the gui button to)
	openFormDialogue() {
		this.clearSearch();
		const dialogRef = this.dialog.open(DialogueComponent, {
			data: this.uniqueElections,
		});

		dialogRef.afterClosed().subscribe(
			data => this.setSearchFromDialogue(data)
			);

	}
	//calledf rom within the dialogu
	setSearchFromDialogue(data) {
	//	console.log("Dialog output for search:", data);

		if (data != undefined) {
			//theres a make a random search button in the modal search dialogu
			if (data.triggerRandomSearch) {
				this.generateRandomSearch()
			}
			//otherwise lets actuallyupdate all the filters
			if (data.updateSearch) {
				if (data.constituency != null) {
					this.constituencyFilter.setValue(data.constituency);
				}
				else {
					this.constituencyFilter.setValue("");
				}

				if (data.year != null) {
					this.yearFilter.setValue(data.year);
				}
				else {
					this.yearFilter.setValue("");
				}

				if (data.month != null) {
					this.monthFilter.setValue(data.month);
				}
				else {
					this.monthFilter.setValue("");
				}


				if (data.county != null) {
					this.countyFilter.setValue(data.county);
				}
				else {
					this.countyFilter.setValue("");
				}


				if (data.contested != null) {
					this.contestedFilter.setValue(data.contested);
				}
				else {
					this.contestedFilter.setValue("");
				}

				if (data.byElectionGeneral != null) {
					this.byElectionGeneralFilter.setValue(data.byElectionGeneral);
				}
				else {
					this.byElectionGeneralFilter.setValue("");
				}

				if (data.pollBookCode != null) {
					this.pollBookCodeFilter.setValue(data.pollBookCode);
				}
				else {
					this.pollBookCodeFilter.setValue("");
				}




				this.dataSource.filter = JSON.stringify(this.filteredValues);
			}
		}
	}







	///////////////////////////////////****END DIALOGUE FUNCTIONS****///////////////////////////////////
















	///////////////////////////////////****START MAP STYLES****///////////////////////////////////
	getStyles(){
		var styles = [
		{
			"elementType": "geometry",
			"stylers": [
			{
				"color": "#999999"
			}
			]
		},
		{
			"elementType": "labels",
			"stylers": [
			{
				"visibility": "off"
			}
			]
		},
		{
			"elementType": "labels.text.fill",
			"stylers": [
			{
				"color": "#757575"
			}
			]
		},
		{
			"elementType": "labels.text.stroke",
			"stylers": [
			{
				"color": "#212121"
			}
			]
		},
		{
			"featureType": "administrative",
			"elementType": "geometry",
			"stylers": [
			{
				"color": "#757575"
			},
			{
				"visibility": "off"
			}
			]
		},
		{
			"featureType": "administrative.country",
			"elementType": "labels.text.fill",
			"stylers": [
			{
				"color": "#9e9e9e"
			}
			]
		},
		{
			"featureType": "administrative.land_parcel",
			"stylers": [
			{
				"visibility": "off"
			}
			]
		},
		{
			"featureType": "administrative.locality",
			"elementType": "labels.text.fill",
			"stylers": [
			{
				"color": "#bdbdbd"
			}
			]
		},
		{
			"featureType": "administrative.neighborhood",
			"stylers": [
			{
				"visibility": "off"
			}
			]
		},
		{
			"featureType": "poi",
			"stylers": [
			{
				"visibility": "off"
			}
			]
		},
		{
			"featureType": "poi",
			"elementType": "labels.text",
			"stylers": [
			{
				"visibility": "off"
			}
			]
		},
		{
			"featureType": "poi",
			"elementType": "labels.text.fill",
			"stylers": [
			{
				"color": "#757575"
			}
			]
		},
		{
			"featureType": "poi.park",
			"elementType": "geometry",
			"stylers": [
			{
				"color": "#181818"
			}
			]
		},
		{
			"featureType": "poi.park",
			"elementType": "labels.text.fill",
			"stylers": [
			{
				"color": "#616161"
			}
			]
		},
		{
			"featureType": "poi.park",
			"elementType": "labels.text.stroke",
			"stylers": [
			{
				"color": "#1b1b1b"
			}
			]
		},
		{
			"featureType": "road",
			"stylers": [
			{
				"visibility": "off"
			}
			]
		},
		{
			"featureType": "road",
			"elementType": "geometry.fill",
			"stylers": [
			{
				"color": "#2c2c2c"
			}
			]
		},
		{
			"featureType": "road",
			"elementType": "labels",
			"stylers": [
			{
				"visibility": "off"
			}
			]
		},
		{
			"featureType": "road",
			"elementType": "labels.icon",
			"stylers": [
			{
				"visibility": "off"
			}
			]
		},
		{
			"featureType": "road",
			"elementType": "labels.text.fill",
			"stylers": [
			{
				"color": "#8a8a8a"
			}
			]
		},
		{
			"featureType": "road.arterial",
			"elementType": "geometry",
			"stylers": [
			{
				"color": "#373737"
			}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry",
			"stylers": [
			{
				"color": "#3c3c3c"
			}
			]
		},
		{
			"featureType": "road.highway.controlled_access",
			"elementType": "geometry",
			"stylers": [
			{
				"color": "#4e4e4e"
			}
			]
		},
		{
			"featureType": "road.local",
			"elementType": "labels.text.fill",
			"stylers": [
			{
				"color": "#616161"
			}
			]
		},
		{
			"featureType": "transit",
			"stylers": [
			{
				"visibility": "off"
			}
			]
		},
		{
			"featureType": "transit",
			"elementType": "labels.text.fill",
			"stylers": [
			{
				"color": "#757575"
			}
			]
		},
		{
			"featureType": "water",
			"elementType": "geometry",
			"stylers": [
			{
				"color": "#000000"
			}
			]
		},
		{
			"featureType": "water",
			"elementType": "labels.text",
			"stylers": [
			{
				"visibility": "off"
			}
			]
		},
		{
			"featureType": "water",
			"elementType": "labels.text.fill",
			"stylers": [
			{
				"color": "#3d3d3d"
			}
			]
		}
		]
		return styles;
	}
}
