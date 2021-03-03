import { ElementRef, ApplicationRef, Component, Directive, OnInit, OnDestroy, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';
// import { Subscription } from 'rxjs/Subscription';
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
import { Options, ChangeContext, PointerType } from 'ng5-slider';

import { HttpParams, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

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

// export interface Election {
// 	Year: string;
// 	Month: string;
// 	Constituency: string;
// 	CountyBoroughUniv: string;
// 	ByElectionGeneral: string;
// 	Contested: string;
// 	ElectionCode: string;
// 	Franchise:string;
// 	PollBookCode: string;
// 	Notes: string;
// 	Latitude: string;
// 	Longitude: string;
// 	lat:number;
// 	lng:number;
// }
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
export interface Borough {
	formatted_address: string;
	lat: number;
	lng: number;
	// books:PollBook[];
}
export interface Boroughs {
	[key: string]: Borough;
	// books:PollBook[];
}
export interface GEOJSON {
	type: string;
	features: any[];
}
export interface County {
	name: string;
	lat: number;
	lng: number;
	isOpen: boolean;
	// books:PollBook[];
}
export interface Centroid {
	name: string;
	lat: number;
	lng: number;
}

export interface googleMapsMarkerWrapper {
	position: google.maps.LatLngLiteral;
	options: google.maps.MarkerOptions;
	title: string;
	type:string;
}

export interface Marker {
	position:{
		lat:number;
		lng: number;
		}
		title:string;
		options:any;
		icon:string;
		visible:boolean;
		// label:string;
	// formatted_address?: string;
	// selected: boolean;
	// draggable: boolean;
}
export interface constituency {
	lat: number;
	lng: number;
	formatted_address?: string;
	pollbooks: PollBook[];
	// draggable: boolean;
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

	boroughs: Boroughs;

	//I had to make my own data for cetnroids of the boroughs by hand
	centroids: Centroid[] = [];
	counties: County[] = [];
	 elections: Election[];
	 uniqueElections: Election []=[];
	//electionsNew: ElectionNew [];
	a: string = "wiating";

	public style: object = {};

	gotPollBooks: boolean = false;

	locationLookup: any;
	clicked:boolean = false; //debouncer for the datalayer click

	zoom: number = 7;
	mapIsReady:boolean = false;
	options: google.maps.MapOptions = {
		mapTypeId: 'hybrid',
		// zoomControl: false,
		// scrollwheel: false,
		// disableDoubleClickZoom: true,
		maxZoom: 10,
		minZoom: 2,
		styles:[
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

	}
	center: google.maps.LatLngLiteral= {
		lat: 52.4862,
		lng: 1.8904
	}





	pollBooks: PollBookResponse;

	mapLinked: boolean = true;

	electionsMeta: Elections;

	HOPtext: string = "";

	animating: boolean = false;
	animatingId: number;



	constituencyNames: string [] = [];

	markers: Marker[] = [];
	mmarkers: googleMapsMarkerWrapper[] = [];
	dynamicMarker: google.maps.Marker;
	dynamicMarkers: google.maps.Marker []=[];

	boroughMarkers:Marker[] = [];//google.maps.Marker [] = [		
		image: google.maps.Icon  = {
			url: './assets/images/dot.svg',
			size: new google.maps.Size(10, 10),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(5, 5),
			scaledSize: new google.maps.Size(10, 10)
		  };
		  countyMarkerOption: google.maps.MarkerOptions = {
			icon:this.image,
			//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         title:	element.constituency,
			visible:true
			// label:  {text: element.constituency , color: "white"}
		}

		imageFore: google.maps.Icon  = {
			url: './assets/images/smarker.svg',
			size: new google.maps.Size(20, 20),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(10, 10),
			scaledSize: new google.maps.Size(20, 20)
		  };
		  countyForegroundMarkerOption: google.maps.MarkerOptions = {
			icon:this.imageFore,
			// animation: google.maps.Animation.DROP,
			//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         title:	element.constituency,
			visible:true
			// label:  {text: element.constituency , color: "white"}
		}

	boroughCentreMarkers:google.maps.Marker [] = [];
	countyMarkers: google.maps.Marker [] = [];
//	countyMarkerOption: google.maps.MarkerOptions = {draggable: false};


	countyMarkerOptions: google.maps.MarkerOptions []= [];
	countyMarkerPositions: google.maps.LatLngLiteral[] = [];

	boroughMarkerOptions: google.maps.MarkerOptions []= [];
	boroughMarkerPositions: google.maps.LatLngLiteral[] = [];


	myCenter: google.maps.LatLngLiteral = {lat: 24, lng: 12};
	///the filtered markers currently on display
	displayedMarkers: Marker[] = [];


	forceLink: boolean = false;

	//the main filters for the table/database
	filteredValues = {
		election_month: '', constituency: '', election_year: '', countyboroughuniv: '', contested: '', by_election_general: '', franchise_type: '',pollbook_id: ''

	};
	

	//for the graph
	electionsPerYear: any[] = [];

	constituencyFilter = new FormControl();
	monthFilter = new FormControl();
	yearFilter = new FormControl();
	countyFilter = new FormControl();
	contestedFilter = new FormControl();
	byElectionGeneralFilter = new FormControl();
	franchiseFilter = new FormControl();
	pollBookCodeFilter = new FormControl();
	globalFilter = '';

	highlightedConsituencies: string[] = [];

	displayedColumns: string[] = ['constituency', 'election_year', 'election_month', 'countyboroughuniv', 'by_election_general', 'franchise_type', 'contested', 'pollbook_id'];
	dataSource = new MatTableDataSource<Election>();

	updatingMapStyles: boolean = false;
	//for the timelines
	minYear: number = 1695;
	maxYear: number = 1832;

	prevDataSourceSize: number = 0;

	// currentMinValue: number = this.minYear;
	// currentMaxValue: number = this.maxYear;

	sliderOptions: Options = {
		floor: 1695,
		ceil: 1832
	};


	// 
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(GoogleMap, { static: false }) map: GoogleMap;

	//this is a big inefficient watcher on the dataSource
	ngDoCheck() {


		var datObj = {};
		if (this.dataSource.filter.length > 0) {

			datObj = JSON.parse(this.dataSource.filter);
		}
		const change = this._differ.diff(datObj);
		
		if (change) {
			this.electionsPerYear = this.getElectionsPerYear();
			this.updateIsActive(this.getFilteredConstituencies());
			this.setMapStyle();
			this.makeAllMarkers();
			this.getUniqueMarkers();
			//console.log("update ",this.dynamicMarkers);
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
		// 	path: google.maps.SymbolPath.CIRCLE,
		// 	scale: 8.5,
		// 	fillColor: "#F00",
		// 	fillOpacity: 0.4,
		// 	strokeWeight: 0.4
		// });
		//this.dynamicMarker.setMap(this.map);
		// this.dynamicMarker = {
		// 	position: {lat: 51,lng:0},
		// 	sName: "Marker Name",
		// 	map: this.map,
			// icon: {
			// 	path: google.maps.SymbolPath.CIRCLE,
			// 	scale: 8.5,
			// 	fillColor: "#F00",
			// 	fillOpacity: 0.4,
			// 	strokeWeight: 0.4
			// },
		// };
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
		

		this.mapLinked = true;
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

		// this.boroughService.getData().subscribe(
		// 	(data: Boroughs) => this.boroughs = data
		// 	, err => console.error(err), () => this.makeBoroughMarkers());



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
		console.log('Element was resized', event);
		this.style = {
			position: 'fixed',
			// left: `${event.rectangle.left}px`,
			right: "3%",
			// top: `${event.rectangle.top}px`,
			width: `${event.rectangle.width}px`,
			// height: `${event.rectangle.height}px`
		};
	}

	onResizeStart(event: ResizeEvent): void {
		console.log('Element was resized start', event);

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
		var barWidth = divWidth / 137;//this.electionsPerYear.length;
		var left = bar.year - 1695;//this.d;
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
		// var filteredConstituencies = this.getFilteredConstituencies();
		this.electionsPerYear.forEach(element => {
			element.numElections = 0;
			element.numContested = 0;
		});

		// for(var i=this.minYear;i<=this.maxYear;i++){
		// 	var obj = {
		// 		year:i,
		// 		numElections:0,
		// 		numContested:0
		// 	}
		// 	this.electionsPerYear.push(obj);
		// }
		
		// for (var i = this.minYear; i <= this.maxYear; i++) {
		// 	var obj = {
		// 		year: i,
		// 		numElections: 0,
		// 		numContested: 0
		// 	};
		// 	this.electionsPerYear.push(obj);

		// }
		// console.log("this.electionsPerYear",this.electionsPerYear);
		for (var i = 0; i < this.dataSource.filteredData.length; i++) {
			var index = parseInt(this.dataSource.filteredData[i]['election_year']) - 1695;// this.minYear;
			if (index >= 0 && index < this.electionsPerYear.length) {


				this.electionsPerYear[index]['numElections']++;
				if (this.dataSource.filteredData[i]['contested'] == 'Y') {
					this.electionsPerYear[index]['numContested']++;
				}
			}

		}
		//console.log(this.electionsPerYear);
		return this.electionsPerYear;
	}
	
	getElectionsPerYearOld() {
		// var filteredConstituencies = this.getFilteredConstituencies();
		this.electionsPerYear = [];
		for (var i = this.minYear; i <= this.maxYear; i++) {
			var obj = {
				year: i,
				numElections: 0,
				numContested: 0
			};
			this.electionsPerYear.push(obj);

		}
		// console.log("this.electionsPerYear",this.electionsPerYear);
		for (var i = 0; i < this.dataSource.filteredData.length; i++) {
			var index = parseInt(this.dataSource.filteredData[i]['election_year']) - this.minYear;
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
		console.log(changes);
	}
	onValueChange(changeContext: ChangeContext): void {
		console.log(changeContext);

	}
	sliderChange(changeContext: ChangeContext): void {
		// this.yearFilter.setValue("");

		this.minYear = changeContext.value;
		this.maxYear = changeContext.highValue;

		this.yearFilter.setValue(changeContext.value.toString() + "-" + changeContext.highValue.toString());
		this.dataSource.filter = JSON.stringify(this.filteredValues);


	}

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
		//	console.log("mouseover ",event.feature.getProperty("name"));
			this.setMatchingCountyMarkerVisibility(true, event.feature.getProperty("name"));
		});
		this.map.data.addListener('mouseout', (event) => {
			//	console.log("mouseover ",event.feature.getProperty("name"));
				this.setMatchingCountyMarkerVisibility(false, event.feature.getProperty("name"));
			});
		
			this.map.data.addListener('click', (event) => {
				console.log("click");
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
			console.log("map ready");
			this.setUpMapData();
			this.makeAllMarkers();
		
		}
		
		//this.setStyles();
		// this.center.lat = 35;
		
		//this.getUniqueMarkers();

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
		      // z-index:index,
		    };
		});

	}
	setallInActive(){
		this.map.data.forEach(function(feature) {
	//		console.log("setting ",feature.getProperty("name")," in active")
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
		//console.log(constituencies);
		// this.map.data.revertStyle();
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
		      // z-index:index,
		    };
		});

	}
	mapZoomChanged() {
		console.log("zoom");

		// console.log(this.map);
		// console.log(JSON.stringify(this.map.getCenter()));
		
		//this.updateMapStyles(this.getFilteredConstituencies());

		
	}
	//TODO What is the actual call back for the data
	mapIdle(){
		// console.log("idle");
		//  setTimeout(()=> {this.updateMapStyles(this.getFilteredConstituencies());}, 3000);

		//this is my hacky solution for cheacking the data is actually returned. I can't find a listener function for this
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

		this.displayedMarkers = this.markers.filter(marker => this.getFilteredConstituencies().includes("gobbldeygook"));


	}

	/////////////////////////////////////////*********END MAP UPDATE FUNCTIONS***********/////////////////////////////////////////
















	/////////////////////////////////////////*********START UTILITY FUNCTIONS***********/////////////////////////////////////////
	getOptions(marker){
		if(marker.type=='B' ){
			//	console.log("returning background");
				 return this.countyMarkerOption 
			}
			else{
			//	console.log("returning foregeground");
	
				return this.countyForegroundMarkerOption
			}
			
	}
	getIcon(marker){
		//console.log("got marker", marker.type);
		if(marker.type=='B' ){
		//	console.log("returning background");
			 return this.countyMarkerOption.icon 
		}
		else{
		//	console.log("returning foregeground");

			return this.countyForegroundMarkerOption.icon
		}
	}
	makeCountyMarker(element){
		var lat: number = +element.lat;
		var lng: number = +element.lng;
		
		
			
			

				  var myLatLng = { lat: lat, lng: lng };
			
	
				var image = {
					url: './assets/images/bmarker.svg',
					size: new google.maps.Size(71, 71),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(17, 34),
					scaledSize: new google.maps.Size(25, 25)
				  };
				  var options = {
					icon:image,
					title:	element.constituency,
					visible:true,
					label:  {text: element.constituency , color: "white"}
				}
				//this.countyMarkerOption.title="test";
					 this.countyMarkerPositions.push({ lat: lat, lng: lng });
					 this.countyMarkerOptions.push(options);
	}
	
	getUniqueCountyMarkers(){
		console.log("getting unique county markers");
		var markerLocations = [];
		this.markers = [] ;
		
		this.dataSource.data.forEach(element => {
		//	console.log("Element",element);
			if(markerLocations.indexOf(element.constituency)==-1){

				markerLocations.push(element.constituency);			//console.log(element.lat,element.lng)

			//	if(typeof element.lat == "number" && typeof element.lng == "number"){
				if(element.countyboroughuniv=="C"){
					this.makeCountyMarker(element);
						
				}
					
	
			
			}
		});

	}
	setMatchingCountyMarkerVisibility(visible, constituency){
		console.log("mouseover",constituency);
		var image = {
			url: './assets/images/dot.svg',
			size: new google.maps.Size(20, 20),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(10, 10),
			scaledSize: new google.maps.Size(20, 20)
		  };
		  var options = {
			icon:image,
			title:constituency,
			visible:visible,
			label:  {text: constituency , color: "white"}
		}


	
		this.dynamicMarkers.forEach(element => {
			if(element.getTitle()==constituency){
			//	console.log("setting ",constituency, " to ", visible);
				element.setOptions(options)
			}
		});
		this.appRef.tick();
		// this.countyMarkerOptions= [];
		// this.countyMarkerPositions= [];
		// var markerLocations = [];
		// this.dataSource.data.forEach(element => {
		// 		if(markerLocations.indexOf(element.constituency)==-1 && element.constituency==constituency){
	
		// 			markerLocations.push(element.constituency);		
	
		
		// 			if(element.countyboroughuniv=="C"){
		// 				this.makeCountyMarker(element);
							
		// 			}
						
		
				
		// 		}
		// 	});
	
		// this.appRef.tick() ;

	}
	setBoroughCentreMarkers(){
		this.boroughMarkers = [];
		var markerLocations = [];
		//this.markers = [] ;
		this.dataSource.data.forEach(element => {
			if(markerLocations.indexOf(element.constituency.trim())==-1){
			//	console.log("adding point for ",element.constituency.trim())
			
				var lat: number = +element.lat;
				var lng: number = +element.lng;
				
					markerLocations.push(element.constituency.trim());
					if(element.countyboroughuniv=="B"){
						var myLatLng = { lat: lat, lng: lng };
			
	
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
							visible:true
							// label:  {text: element.constituency , color: "white"}
						}
						this.boroughMarkerPositions.push({ lat: lat, lng: lng });
						this.boroughMarkerOptions.push(options);
						
					//	this.boroughMarkers.push(marker);
					}

			}
		});
	}
	makeMarker(element, isBackgroundBorough){
		var lat: number = +element.lat;
		var lng: number = +element.lng;
		
		var myLatLng = { lat: lat, lng: lng };
			if(element.countyboroughuniv=="B" && isBackgroundBorough){
				
				//console.log("Making background marker for ", element.constituency);
	

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
					visible:true
					// label:  {text: element.constituency , color: "white"}
				}
			
				var thisMarker: googleMapsMarkerWrapper = {
					position:myLatLng,
					options:options,
					title: element.constituency,
					type:"B"
				}
				this.mmarkers.push(thisMarker);
			}
			else if(element.countyboroughuniv=="B" && !isBackgroundBorough){
			//	console.log("Making foreground marker for ", element.constituency);
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
					visible:true
					// label:  {text: element.constituency , color: "white"}
				}
			
				var thisMarker: googleMapsMarkerWrapper = {
					position:myLatLng,
					options:options,
					title: element.constituency,
					type:"BB"
				}
				this.mmarkers.push(thisMarker);

			}
			else if(element.countyboroughuniv=="C" && !isBackgroundBorough){
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
					visible:true
					// label:  {text: element.constituency , color: "white"}
				}
			
				var thisMarker: googleMapsMarkerWrapper = {
					position:myLatLng,
					options:options,
					title: element.constituency,
					type:"C"
				}
				this.mmarkers.push(thisMarker);
			}
			
			//	this.boroughMarkers.push(marker);
			
			
	}
	updateMarkers() {
		
		// this.displayedMarkers = this.markers;
		// this.displayedMarkers = this.markers.filter(marker => this.getFilteredConstituencies().includes(marker.formatted_address));
		// this.updateMapStyles(this.getFilteredConstituencies());
		this.dataSource.filteredData.forEach(element => {
			this.mmarkers.forEach(melement => {
				melement.type="B";
				if(element.constituency == melement.title){

					melement.type="BB";
				}
			});
		});
	}
	getUniqueConstituencies(){
		var constituencies = [];
		if(this.uniqueElections!=undefined){
		this.dataSource.data.forEach(element => {
			if(constituencies.indexOf(element.constituency)==-1){
			//	console.log("adding ",element)
			constituencies.push(element.constituency);
			this.uniqueElections.push(element);
			}
		});
	}
	//	return constituencies;
	}
	makeAllMarkers(){
		this.mmarkers = [];
		var markerLocations = [];
		var filteredConstituencies = this.getFilteredConstituencies();
		//first make all the boroughs that sit in the background
		var flipper = true;
	//	console.log("making markers");
	//console.log("this.uniqueElections",this.uniqueElections);
	if(this.uniqueElections!=undefined){
	this.uniqueElections.forEach(element => {
		//this.dataSource.data.forEach(element => {
			if(markerLocations.indexOf(element.constituency.trim())==-1){
			//	console.log("adding point for ",element.constituency.trim())
			markerLocations.push(element.constituency.trim());
			if(filteredConstituencies.indexOf(element.constituency)!=-1){
				this.makeMarker(element, false);
			}
			else{
				this.makeMarker(element, true);
			}
			
			//flipper=!flipper;

			}
		});
	//	console.log("made markers",this.mmarkers);
		markerLocations = [];
		//now add any boroughs currently in the filtered data
		this.dataSource.filteredData.forEach(element => {
			this.mmarkers.forEach(melement => {
				if(element.constituency == melement.title){
					//melement.type="BB";
			// 		var lat: number = +element.lat;
			// var lng: number = +element.lng;
					
			// 		var myLatLng = { lat: lat, lng: lng };
			// 		var image = {
			// 			url: './assets/images/dot.svg',
			// 			size: new google.maps.Size(20, 20),
			// 			origin: new google.maps.Point(0, 0),
			// 			anchor: new google.maps.Point(10, 10),
			// 			scaledSize: new google.maps.Size(20, 20)
			// 		  };
			// 		  var options = {
			// 			icon:image,
			// 			title:	element.constituency,
			// 			visible:true
			// 			// label:  {text: element.constituency , color: "white"}
			// 		}
				
			// 		var thisMarker: googleMapsMarkerWrapper = {
			// 			position:myLatLng,
			// 			options:options,
			// 			title: element.constituency,
			// 			type:"C"
			// 		}
			// 		melement = thisMarker;
				}
			});
			
		});

		// image: google.maps.Icon  = {
		// 	url: './assets/images/dot.svg',
		// 	size: new google.maps.Size(20, 20),
		// 	origin: new google.maps.Point(0, 0),
		// 	anchor: new google.maps.Point(10, 10),
		// 	scaledSize: new google.maps.Size(20, 20)
		//   };
		//   countyMarkerOption: google.maps.MarkerOptions = {
		// 	icon:this.image,
		// 	//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         title:	element.constituency,
		// 	visible:true
		// 	// label:  {text: element.constituency , color: "white"}
		// }
	}
	}
	getUniqueMarkers(){
		var markerLocations = [];
		this.markers = [] ;
		this.dataSource.filteredData.forEach(element => {
			if(markerLocations.indexOf(element.constituency)==-1){

			
				var lat: number = +element.lat;
				var lng: number = +element.lng;
				
					markerLocations.push(element.constituency);
					if(element.countyboroughuniv=="B"){
						var image = {
							url: './assets/images/smarker.svg',
							size: new google.maps.Size(71, 71),
							origin: new google.maps.Point(0, 0),
							anchor: new google.maps.Point(17, 34),
							scaledSize: new google.maps.Size(25, 25)
						  };


						var marker: Marker = {
							position: { lat:lat,lng:lng  },
							title:element.constituency,
							icon:  "./assets/images/smarker.svg",
							visible:true,
							options: { 
								opacity:1,
								zIndex:10,
								animation: google.maps.Animation.DROP,
								icon:  image,// google.maps.MarkerImage('./assets/images/smarker.svg',null, null, null, new google.maps.Size(200,200)), //"./assets/images/smarker.svg",
			
								 }
						
		
						}
						this.markers.push(marker);
					}

			}
		});

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
		console.log("years", this.minYear, this.maxYear);
		var y = 1777;

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
		// var image = {
		// 	url: './assets/images/dot.svg',
		// 	size: new google.maps.Size(71, 71),
		// 	origin: new google.maps.Point(0, 0),
		// 	anchor: new google.maps.Point(17, 34),
		// 	scaledSize: new google.maps.Size(25, 25)
		//   };
		//   var options = {
		// 	icon:image,
		// 	title:	"test",
		// 	visible:true,
		// 	label:  {text: "test" , color: "white"}
		// }


	// this.dynamicMarker.setOptions(options);
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

		var years = this.yearFilter.value;
		if (years.split("-").length == 2) {
			this.minYear = years.split("-")[0].trim();
			this.maxYear = years.split("-")[1].trim();
		}
		else if (years.split(",").length > 1) {
			this.minYear = 1695;
			this.maxYear = 1832;

		}
		else if (years.length == 4) {
			this.minYear = parseInt(years.trim());
			this.maxYear = parseInt(years.trim());
		}
		else {
			this.minYear = 1695;
			this.maxYear = 1832;
		}
	}




	/////////////////////////////////////////*********END BUTTONS AND SLIDERS FUNCTIONS***********/////////////////////////////////////////



















	/////////////////////////////////////////*********START FILTER FUNCTIONS***********/////////////////////////////////////////
//https://timdeschryver.dev/blog/google-maps-as-an-angular-component

	//called at the start I think and sets up all the filter subscriptions
	setUpFilters() {
		// this.addMarkers();
		
		
		//this.electionsMeta
	//	console.log("data",this.electionsMeta.elections);
		this.dataSource = new MatTableDataSource<Election>(this.electionsMeta.elections);
		this.dataSource.paginator = this.paginator;
		this.getUniqueConstituencies();
		this.getUniqueMarkers();
		this.setBoroughCentreMarkers();
		this.uniqueElections.forEach(element => {
			var thisDynamicMarker = new google.maps.Marker();
			//console.log(element.lat,typeof(element.lat))
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
			console.log("change in consituencyfilter");
			this.filteredValues['constituency'] = constituencyFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);


			

		});

		this.monthFilter.valueChanges.subscribe((monthFilterValue) => {
			this.filteredValues['election_month'] = monthFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);

		});

		this.yearFilter.valueChanges.subscribe((yearFilterValue) => {

			var yearRange = yearFilterValue.split(",");
			this.setDateSlider();

			this.filteredValues['election_year'] = yearFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
			// this.updateMarkers();
		});


		this.countyFilter.valueChanges.subscribe((countyFilterValue) => {
			this.filteredValues['countyboroughuniv'] = countyFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.contestedFilter.valueChanges.subscribe((contestedFilterValue) => {
			this.filteredValues['contested'] = contestedFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.byElectionGeneralFilter.valueChanges.subscribe((byElectionGeneralFilterValue) => {
			this.filteredValues['by_election_general'] = byElectionGeneralFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);

		});
		this.franchiseFilter.valueChanges.subscribe((franchiseFilterValue) => {
			this.filteredValues['franchise_type'] = franchiseFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);

		});
		this.pollBookCodeFilter.valueChanges.subscribe((pollBookCodeFilterValue) => {
			this.filteredValues['pollbook_id'] = pollBookCodeFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);

		});

		this.dataSource.filterPredicate = this.customFilterPredicate();

	}
	//what it sound slike, set all the searches to blank and include all daata
	clearSearch() {

		this.constituencyFilter.setValue("");

		this.monthFilter.setValue("");

		this.countyFilter.setValue("");

		this.contestedFilter.setValue("");

		this.byElectionGeneralFilter.setValue("");
		this.franchiseFilter.setValue("");
		this.pollBookCodeFilter.setValue("");
		this.constituencyFilter.setValue("");
//		 this.constituencyFilter.setValue(this.constituencyFilter.value+",Yorkshire");

		this.dataSource.filter = JSON.stringify(this.filteredValues);
		
	}

	getFilteredConstituencies() {
		var filteredConstituencies = [];
		for (var i = 0; i < this.dataSource.filteredData.length; i++) {
			if (!filteredConstituencies.includes(this.dataSource.filteredData[i].constituency)) {
				filteredConstituencies.push(this.dataSource.filteredData[i].constituency);
			}
		}
		return filteredConstituencies;
	}

	customFilterPredicate() {
		this.pollBooks = null;
		const myFilterPredicate = (data: Election, filter: string): boolean => {
			var globalMatch = !this.globalFilter;
			//  console.log('globalMatch',globalMatch);
			if (this.globalFilter) {
				// search all text fields
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
			// return data.constituency.toString().trim().indexOf(searchString.constituency) !== -1  
			return this.hasConstituencies(data, searchString)
			&& this.hasMonths(data, searchString)
			&& this.hasYears(data, searchString)
			// && data.election_month.toString().trim().toLowerCase().indexOf(searchString.election_month.toLowerCase()) !== -1 
			// && data.Year.toString().trim().toLowerCase().indexOf(searchString.Year.toLowerCase()) !== -1 
			&& data.countyboroughuniv.toString().trim().toLowerCase().indexOf(searchString.countyboroughuniv.toLowerCase()) !== -1

			&& data.contested.toString().trim().toLowerCase().indexOf(searchString.contested.toLowerCase()) !== -1
			&& data.by_election_general.toString().trim().toLowerCase().indexOf(searchString.by_election_general.toLowerCase()) !== -1
			&& data.contested.toString().trim().toLowerCase().indexOf(searchString.contested.toLowerCase()) !== -1
			&& data.franchise_type.toString().trim().toLowerCase().indexOf(searchString.franchise_type.toLowerCase()) !== -1
			// && data.pollbook_id.toString().trim().toLowerCase().indexOf(searchString.pollbook_id.toLowerCase()) !== -1 
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

		//	if(year>=lowYear && year<=this.currentMaxValue) return 0;
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

