import { Input, ElementRef, Component, Directive ,OnInit, OnDestroy,Output, EventEmitter,SimpleChanges, OnChanges, ViewChild} from '@angular/core';
import { MouseEvent } from '@agm/core';
import {DataMouseEvent, DataLayerManager, AgmDataLayer} from '@agm/core';
import { Subscription } from 'rxjs/Subscription';

import { ResizeEvent } from 'angular-resizable-element';
import { GeojsonServiceService } from '../geojson-service.service';

import {DataSource} from '@angular/cdk/collections';

import { GetLocationsService } from '../get-locations.service';

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

import {MatPaginator} from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';

import { Location } from '../location';

import { MatFormFieldControl } from '@angular/material/form-field';

import { FormControl } from '@angular/forms';
import * as cloneDeep from 'lodash/cloneDeep';
import { DoCheck, KeyValueDiffers, KeyValueChangeRecord } from '@angular/core';

import {MatDialog} from '@angular/material/dialog';
import { PollbookDialogueComponent } from '../pollbook-dialogue/pollbook-dialogue.component';
import { DialogueComponent } from '../dialogue/dialogue.component';
import { WarningDialogueComponent } from '../warning-dialogue/warning-dialogue.component';

import { WalkthroughModule } from 'ngx-walkthrough';
import {TooltipPosition} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
export interface Election {
	Year:string;
	Month:string;
	Constituency:string;
	CountyBoroughUniv: string;
	ByElectionGeneral: string;
	Contested: string;
	ElectionCode: string;
	PollBookCode: string;
	Notes: string;
	Latitude: string;
	Longitude: string;
}
export interface PollBook {

	BookCode: string;
	PrintMS: string;
	Citation:string;
	Holdings: string;
	Source: string;
	ElectionCode: string;
	Notes: string;
}

export interface PollBookResponse {

	num_results: number;
	poll_books: PollBook [];
}

export interface Elections{
	num_results: number;
	earliest_year: number;
	latest_year: number;
	elections: any [];
}
export interface FilterObj {
	lowValue: number;
	highValue: number;
}
export interface APIResponse {
	books:PollBook[];
}
export interface HOPData {
	innerText:string;
	yearRange:string;
	url:string;
	constituency:string;
	fetch:boolean;
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
	type:string;
	features:any[];
}
export interface County {
	name: string;
	lat: number;
	lng: number;
	isOpen: boolean;
	// books:PollBook[];
}
export interface Centroid{
	name:string;
	lat: number;
	lng: number;
}

@Component({
	selector: 'app-viz',
	templateUrl: './viz.component.html',
	styleUrls: ['./viz.component.scss']
})
@Directive({
	selector: 'agm-data-layer'
})

//@Dan these are to make data bind more efficiently. at the time of coding they weren't implemented in AGM
export class VizComponent implements OnInit, OnDestroy, OnChanges {
	@Output()
	layerAddfeature = new EventEmitter<DataMouseEvent>();

	@Output()
	layerDblclick = new EventEmitter<DataMouseEvent>();

	@Output()
	layerMousedown = new EventEmitter<DataMouseEvent>();

	@Output()
	layerMouseout = new EventEmitter<DataMouseEvent>();

	@Output()
	layerMouseover = new EventEmitter<DataMouseEvent>();

	@Output()
	layerMouseup = new EventEmitter<DataMouseEvent>();

	@Output()
	layerRemovefeature = new EventEmitter<DataMouseEvent>();

	@Output()
	layerRemoveproperty = new EventEmitter<DataMouseEvent>();

	@Output()
	layerRightclick = new EventEmitter<DataMouseEvent>();

	@Output()
	layerSetgeometry = new EventEmitter<DataMouseEvent>();

	@Output()
	layerSetproperty = new EventEmitter<DataMouseEvent>();

	private _subscriptions: Subscription[] = [];


	private _differ: any;    

	constructor( public dialog: MatDialog, private _differs: KeyValueDiffers, private centroidsService: CentroidsService, private boroughService: BoroughService , private http: HttpClient, private hOPService: HOPService, private downloadPollBooksService: DownloadPollBooksService, private downloadService: DownloadService, private getLocationsService: GetLocationsService,private geojsonServiceService:GeojsonServiceService,private getPollBooksService:  GetPollBooksService, private getLatLonService: GetLatLonService) {
		this._differ = _differs.find({}).create();
	}

	constituencies:any[];

	currentBooks: PollBook[];
	
	filterargs: FilterObj;
	
	//@dan hop is history of parliament. I have a service which goes and scrapes their etnry for an election
	hopData:HOPData;
	
	boroughs:Boroughs;
	
	//I had to make my own data for cetnroids of the boroughs by hand
	centroids: Centroid [] = [];
	counties: County [] = [];
	elections: Election [];

	public style: object = {};

	gotPollBooks:boolean = false;
	
	locationLookup: any;
	zoom: number = 7;
	
	showDataLayer: boolean = true;
	
	pollBooks: PollBookResponse;

	mapLinked: boolean = true;

	electionsMeta: Elections;

	HOPtext: string = "";

	///the data for the map layer. I tried two appraoches, one with a single object and another with an object for each county
	geojson: GEOJSON;
	geojsons: GEOJSON [] = [];

	//centre point
	lat: number = 52.4862;
	lng: number = 1.8904;

	markers: marker []=[];
	///the filtered markers currently on display
	displayedMarkers: marker []=[];


	forceLink:boolean = false;

	//the main filters for the table/database
	filteredValues = {
		Month: '', Constituency: '',Year: '', CountyBoroughUniv: '', Contested: '',ByElectionGeneral:'',PollBookCode:''

	};
	//assumoning this was a test....
	cornwall: string = "Cornwall";
	
	//for the graph
	electionsPerYear: any [] = [];

	constituencyFilter = new FormControl();
	monthFilter = new FormControl();
	yearFilter = new FormControl();
	countyFilter = new FormControl();
	contestedFilter = new FormControl();
	byElectionGeneralFilter = new FormControl();
	pollBookCodeFilter = new FormControl();
	globalFilter = '';

	highlightedConsituencies: string[] = [];
	
	displayedColumns: string[] = [  'Constituency', 'Year','Month','CountyBoroughUniv','ByElectionGeneral','Contested','PollBookCode'];
	dataSource = new MatTableDataSource<Election>();
	
	updatingMapStyles: boolean = false;
	//for the timelines
	minValue: number = 1695;
	maxValue: number = 1832;
	
	prevDataSourceSize: number = 0;

	currentMinValue: number = this.minValue;
	currentMaxValue: number = this.maxValue;

	options: Options = {
		floor: 1695,
		ceil: 1832
	};
	

	// 
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild("agmSearch", {static: false}) public searchElement: ElementRef;
	//is called after the main fetching event for the elecitons data (we get the whole set on initial load. and then sort it client side)
	ngDoCheck() {


		var datObj ={};
		if(this.dataSource.filter.length>0){

			datObj = JSON.parse(this.dataSource.filter);
		}
		const change = this._differ.diff(datObj);
		if (change) {
			this.electionsPerYear = this.getElectionsPerYear();
			//console.log("data change",this.mapLinked,datObj);

			if(this.mapLinked){

				//this is my brute force approach to dealing with too many queries. if there are more than 200 hits then I unlink the map unless asked not to
				var numConstituenciesInSearch=this.getFilteredConstituencies().length;
				if(numConstituenciesInSearch<200){

					this.updateDataLayerStyles();
					this.updateMarkers();

				}else{
					//@Dan sorry I can't remember what forceLink does but probably it was jsut for testing and can be removed
					if(!this.forceLink){
						// alert("this is a lot of data to show on the map so we've disabled it for a while ");

						//open a modal
						var showWarning={
							warning:true,
							numConstituenciesInSearch:numConstituenciesInSearch,
							message:""
						}
						let dialogRef = this.dialog.open(WarningDialogueComponent, {
							data: showWarning,
						});
						dialogRef.afterClosed().subscribe(
							data => this.stopUnlinking  (data) 
							); 

						this.mapLinked=false;
						this.clearMap();

					}
				}

			}
			// console.log(this.getElectionsPerYear());

		}
	}
	stopUnlinking(data){
		if(data.stopUnlinking){
			this.forceLink = true;
			this.mapLinked = true;
			this.updateDataLayerStyles();
			this.updateMarkers();
		}
	}
	ngOnDestroy(){

	}
	ngOnInit() {
		console.log("init");

		//main function containing callbacks from the API
		this.getData();

		//tedious material stuff to add pagination to the table
		this.dataSource.paginator = this.paginator;
		// when we land, open the initial modal with the search options in it
		const dialogRef = this.dialog.open(DialogueComponent);

		dialogRef.afterClosed().subscribe(
			data => this.setSearchFromDialogue  (data) 
			); 


		this.mapLinked=true;
		this.hopData = {
			innerText:"",
			yearRange:"",
			url:"",
			constituency:"",
			fetch:true

		}
		// this.minValue = 1800;

		//originally I had a search fandomly generated on load
		setTimeout(()=>{				
			//this.generateRandomSearch();
		},3000);

	}

	//called when the filter updates I think
	setDateSlider(){

		var years = this.yearFilter.value;
		if(years.split("-").length==2){
			this.minValue =  years.split("-")[0].trim();
			this.maxValue =  years.split("-")[1].trim();
		}
		else if(years.split(",").length>1){
			this.minValue =  1695;
			this.maxValue =  1832;

		}
		else if(years.length==4){
			this.minValue =  parseInt(years.trim());
			this.maxValue =  parseInt(years.trim());
		}
		else{
			this.minValue =  1695;
			this.maxValue =  1832;
		}
	}

	//what it sounds like - jsut called at the beginning to get some nice looking data
	generateRandomSearch(){
		var spread = Math.floor(Math.random() * 8)+2;
		var fullRange = 1832-(1695+spread) ;
		var start = Math.floor(Math.random() * fullRange) + 1696;
		this.minValue  = start;
		this.maxValue  = spread + start;
		console.log("years", this.minValue,this.maxValue);
		var y = 1777;

		this.yearFilter.setValue(this.minValue.toString()+"-"+this.maxValue.toString());

		this.constituencyFilter.setValue(this.getRandomConstituenciesString(20));
		this.dataSource.filter = JSON.stringify(this.filteredValues);
	}

	//open the main search dialogue (this is called from the gui button to)
	openDialogue(){
		const dialogRef = this.dialog.open(DialogueComponent);

		dialogRef.afterClosed().subscribe(
			data => this.setSearchFromDialogue  (data) 
			); 

	}

	//what it sound slike, set all the searches to blank and include all daata
	clearSearch(){

		this.constituencyFilter.setValue("");

		this.monthFilter.setValue("");

		this.countyFilter.setValue("");

		this.contestedFilter.setValue("");

		this.byElectionGeneralFilter.setValue("");

		this.pollBookCodeFilter.setValue("");

		this.dataSource.filter = JSON.stringify(this.filteredValues);
	}

	//calledf rom within the dialogu
	setSearchFromDialogue(data){
		console.log("Dialog output for search:", data);

		if(data!=undefined){
			//theres a make a random search button in the modal search dialogu
			if(data.triggerRandomSearch){
				this.generateRandomSearch()
			}
			//otherwise lets actuallyupdate all the filters
			if(data.updateSearch){
				if(data.constituency!=null){
					this.constituencyFilter.setValue(data.constituency);
				}
				else{
					this.constituencyFilter.setValue("");
				}

				if(data.year!=null){
					this.yearFilter.setValue(data.year);
				}
				else{
					this.yearFilter.setValue("");
				}

				if(data.month!=null){
					this.monthFilter.setValue(data.month);
				}
				else{
					this.monthFilter.setValue("");
				}


				if(data.county!=null){
					this.countyFilter.setValue(data.county);
				}
				else{
					this.countyFilter.setValue("");
				}


				if(data.contested!=null){
					this.contestedFilter.setValue(data.contested);
				}
				else{
					this.contestedFilter.setValue("");
				}

				if(data.byElectionGeneral!=null){
					this.byElectionGeneralFilter.setValue(data.byElectionGeneral);
				}
				else{
					this.byElectionGeneralFilter.setValue("");
				}

				if(data.pollBookCode!=null){
					this.pollBookCodeFilter.setValue(data.pollBookCode);
				}
				else{
					this.pollBookCodeFilter.setValue("");
				}




				this.dataSource.filter = JSON.stringify(this.filteredValues);
			}
		}
	}
	//the database table is draggable
	onResizeEnd(event: ResizeEvent): void {
		console.log('Element was resized', event);
		this.style = {
			position: 'fixed',
			// left: `${event.rectangle.left}px`,
			right:"3%",
			// top: `${event.rectangle.top}px`,
			width: `${event.rectangle.width}px`,
			// height: `${event.rectangle.height}px`
		};
	}

	onResizeStart(event: ResizeEvent): void {
		console.log('Element was resized start', event);

	}
	//this is used to calibrate the bar heigh on the graph
	getMaxMinElectionsPerYear(){
		var max= 0;
		var min = 10000000;
		for(var i=0;i<this.electionsPerYear.length;i++){
			if(this.electionsPerYear[i]['numElections']>max) max = this.electionsPerYear[i]['numElections'];
			if(this.electionsPerYear[i]['numElections']<min) min = this.electionsPerYear[i]['numElections'];

		}
		return {max:max,min:min};
	}
	getHeight(bar){
		return bar.numElections;
	}
	//is called as a [ngStyle]= in the html for the graph
	getBarStyle(bar, divWidth, divHeight, contested){

		var maxMin = this.getMaxMinElectionsPerYear();
		var yearRange = this.maxValue  - this.minValue+1;
		var barWidth = divWidth / yearRange;
		var left = bar.year-this.minValue;
		left*=barWidth;
		var leftStr = left.toString();
		leftStr+="px";
		var barHeight = 0;
		var col;
		if(contested){
			barHeight = this.mapRange( bar.numContested,  maxMin.min,maxMin.max, 0,divHeight); 

		}
		else{
			barHeight = this.mapRange( bar.numElections,  maxMin.min,maxMin.max, 0,divHeight); 
		}

		return {

			width:barWidth+"px",
			// bottom:"0px",
			height: barHeight+"px",
			left: leftStr

		};

	}

	//again for the graph
	getElectionsPerYear(){
		// var filteredConstituencies = this.getFilteredConstituencies();
		this.electionsPerYear = [];
		for(var i=this.minValue;i<=this.maxValue;i++){
			var obj = {
				year:i,
				numElections: 0,
				numContested:0
			};
			this.electionsPerYear.push(obj);

		} 
		// console.log("this.electionsPerYear",this.electionsPerYear);
		for(var i=0;i<this.dataSource.filteredData.length;i++){
			var index = parseInt(this.dataSource.filteredData[i]['Year'])-this.minValue;
			if(index >=0 && index <this.electionsPerYear.length){


				this.electionsPerYear[index ]['numElections']++;
				if(this.dataSource.filteredData[i]['Contested']=='Y'){
					this.electionsPerYear[index]['numContested']++;
				}
			}

		}
		return this.electionsPerYear;
	}
	toggleMapLinked(i){
		this.mapLinked=i;
		if(this.mapLinked){
			console.log("map is re-linked, updating map");
			this.updateDataLayerStyles();
			this.updateMarkers();
		}
	}
	ngOnChanges(changes) {
		console.log(changes);
	}
	onValueChange(changeContext: ChangeContext): void {
		console.log( changeContext);

	}
	//called from timeline listener
	onUserChange(changeContext: ChangeContext): void {
		// this.yearFilter.setValue("");

		this.currentMinValue = changeContext.value;
		this.currentMaxValue = changeContext.highValue;

		this.yearFilter.setValue( changeContext.value.toString()+"-"+changeContext.highValue.toString());
		this.dataSource.filter = JSON.stringify(this.filteredValues);


	}
	//generic mapping funciton
	mapRange = (num, in_min, in_max, out_min, out_max) => {
		return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
	}
	//what it sounds like
	getRandomConstituenciesString(numRandomConsituencies){
		var filteredConstituencies = [];


		for(var i=0;i<this.dataSource.filteredData.length;i++){
			if(!filteredConstituencies.includes(this.dataSource.filteredData[i].Constituency)){
				filteredConstituencies.push(this.dataSource.filteredData[i].Constituency);
			}
		}
		var indices = [];
		var randomConsituencies = "";

		var isFirst = true;
		for(var i=0;i<numRandomConsituencies;i++){
			var randomIndex = Math.floor(Math.random() * filteredConstituencies.length-1);
			// if(!in_array())

			if(!indices.includes(randomIndex)){
				indices.push(randomIndex);
				if(isFirst){
					randomConsituencies=filteredConstituencies[randomIndex];
					isFirst=false;
				}
				else{
					randomConsituencies+=","+filteredConstituencies[randomIndex];
				}

			}
		}



		return randomConsituencies;

	}

	updateMeta(){
		console.log("updated meta",this.electionsMeta.earliest_year,this.options.floor);

	}
	//downlaod the elections data
	download(){
		this.downloadService.downloadFile(this.dataSource.filteredData, 'elections');
	}
	//downlaod pollbook data
	downloadPollBooks(){

		this.downloadPollBooksService.downloadFile(this.pollBooks.poll_books, 'pollBooks');
	}
	timeMapStyles(){

	}
	getFilteredConstituencies(){
		var filteredConstituencies = [];
		for(var i=0;i<this.dataSource.filteredData.length;i++){
			if(!filteredConstituencies.includes(this.dataSource.filteredData[i].Constituency)){
				filteredConstituencies.push(this.dataSource.filteredData[i].Constituency);
			}
		}
		return filteredConstituencies;
	}
	//return the markers included from the current list of filtered table data
	updateMarkers() {
		// this.displayedMarkers = this.markers;
		this.displayedMarkers = this.markers.filter(marker => this.getFilteredConstituencies().includes(marker.formatted_address));
	}
	//this is the really problematic bit that causes the biggest data delay. 
	updateDataLayerStyles(){

		var filteredConstituencies = this.getFilteredConstituencies();


		for(var i=0;i<this.geojsons.length;i++){

			if(this.highlightedConsituencies.includes(this.geojsons[i].features[0].properties.name.trim())){

				if(this.filteredValues['Constituency'].length == 0){
					this.geojsons[i].features[0].properties.isactive=false;
					this.constituencyFilter.setValue("");
					this.geojsons[i] = JSON.parse(JSON.stringify(this.geojsons[i]));  
					this.highlightedConsituencies = this.arrayRemove(this.highlightedConsituencies,this.geojsons[i].features[0].properties.name.trim());
				}
				if(filteredConstituencies.includes(this.geojsons[i].features[0].properties.name.trim())){

				}else{

					this.geojsons[i].features[0].properties.isactive=false;
					this.geojsons[i] = JSON.parse(JSON.stringify(this.geojsons[i]));  
					this.highlightedConsituencies = this.arrayRemove(this.highlightedConsituencies,this.geojsons[i].features[0].properties.name.trim());
				}

			}


			if(filteredConstituencies.includes(this.geojsons[i].features[0].properties.name.trim())){
				this.geojsons[i].features[0].properties.isactive=true;
				this.highlightedConsituencies.push(this.geojsons[i].features[0].properties.name.trim());
				this.geojsons[i] = JSON.parse(JSON.stringify(this.geojsons[i]));  
			}


		}


	}

	arrayRemove(arr, value) { return arr.filter(function(ele){ return ele != value; });}


	clearMap(){
		console.log("Clearing map");
		// this.constituencyFilter.setValue("");
		// this.dataSource.filter = JSON.stringify(this.filteredValues);
		for(var i=0;i<this.geojsons.length;i++){


			this.geojsons[i].features[0].properties.isactive=false;
			this.geojsons[i] = JSON.parse(JSON.stringify(this.geojsons[i])); 
		}
		this.displayedMarkers = this.markers.filter(marker => this.getFilteredConstituencies().includes("gobbldeygook"));


	}
	//called at the start I think and sets up all the filter subscriptions
	addDataToConstituencies(){

		this.dataSource = new MatTableDataSource<Election>(this.elections);
		this.dataSource.paginator = this.paginator;


		this.constituencyFilter.valueChanges.subscribe((constituencyFilterValue) => {

			this.filteredValues['Constituency'] = constituencyFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);

			if(this.mapLinked){
				this.updateMarkers();
			}



		});

		this.monthFilter.valueChanges.subscribe((monthFilterValue) => {
			this.filteredValues['Month'] = monthFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);

		});

		this.yearFilter.valueChanges.subscribe((yearFilterValue) => {

			var yearRange = yearFilterValue.split(",");
			this.setDateSlider();




			this.filteredValues['Year'] = yearFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});


		this.countyFilter.valueChanges.subscribe((countyFilterValue) => {
			this.filteredValues['CountyBoroughUniv'] = countyFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.contestedFilter.valueChanges.subscribe((contestedFilterValue) => {
			this.filteredValues['Contested'] = contestedFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.byElectionGeneralFilter.valueChanges.subscribe((byElectionGeneralFilterValue) => {
			this.filteredValues['ByElectionGeneral'] = byElectionGeneralFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);

		});
		this.pollBookCodeFilter.valueChanges.subscribe((pollBookCodeFilterValue) => {
			this.filteredValues['PollBookCode'] = pollBookCodeFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);

		});




		this.dataSource.filterPredicate = this.customFilterPredicate();

	}
	//filter anywhere
	applyFilter(filter) {
		// console.log(filter);
		this.globalFilter = filter;
		this.dataSource.filter = JSON.stringify(this.filteredValues);
	}


	customFilterPredicate() {
		this.pollBooks = null;
		const myFilterPredicate = (data: Election, filter: string): boolean => {
			var globalMatch = !this.globalFilter;
			//  console.log('globalMatch',globalMatch);
			if (this.globalFilter) {
				// search all text fields
				globalMatch = data.Month.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1
				||  data.Constituency.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 
				||  data.CountyBoroughUniv.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 
				||  data.ByElectionGeneral.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ;

			}

			if (!globalMatch) {
				return;
			}

			let searchString = JSON.parse(filter);
			// return data.Constituency.toString().trim().indexOf(searchString.Constituency) !== -1  
			return this.hasConstituencies(data, searchString)
			&& this.hasMonths(data, searchString)
			&& this.hasYears(data, searchString)
			// && data.Month.toString().trim().toLowerCase().indexOf(searchString.Month.toLowerCase()) !== -1 
			// && data.Year.toString().trim().toLowerCase().indexOf(searchString.Year.toLowerCase()) !== -1 
			&& data.CountyBoroughUniv.toString().trim().toLowerCase().indexOf(searchString.CountyBoroughUniv.toLowerCase()) !== -1 

			&& data.Contested.toString().trim().toLowerCase().indexOf(searchString.Contested.toLowerCase()) !== -1 
			&& data.ByElectionGeneral.toString().trim().toLowerCase().indexOf(searchString.ByElectionGeneral.toLowerCase()) !== -1 
			&& data.Contested.toString().trim().toLowerCase().indexOf(searchString.Contested.toLowerCase()) !== -1 
			// && data.PollBookCode.toString().trim().toLowerCase().indexOf(searchString.PollBookCode.toLowerCase()) !== -1 
			&& this.getHasPollBooksFilter (data.PollBookCode.toString().trim().toLowerCase(), searchString.PollBookCode.toLowerCase())  !== -1

			;

		}

		return myFilterPredicate;
	}

	//next funcitons are all custom filters I wrote to filter for specific things (e.g. whether a consituency has pollbooks withing the filtered data)
	hasConstituencies(data, searchString){
		if(searchString.Constituency.includes(",")){

			var constituencyList = searchString.Constituency.split(",");
			for(var i=0;i<constituencyList.length;i++){
				if(constituencyList[i].trim().toLowerCase()===data.Constituency.toString().trim().toLowerCase()){
					return 1;
				}
			}
			return 0;


		}
		else{
			return data.Constituency.toString().trim().toLowerCase().indexOf(searchString.Constituency.toLowerCase()) !== -1 ; 
		}
		return 0;
	}
	hasMonths(data, searchString){
		if(searchString.Month.includes(",")){

			var monthList = searchString.Month.split(",");
			for(var i=0;i<monthList.length;i++){
				if(monthList[i].trim()===data.Month.toString().trim()){
					return 1;
				}
			}
			return 0;


		}
		else{
			return data.Month.toString().trim().indexOf(searchString.Month) !== -1 ; 
		}
		return 0;
	}
	hasYears(data, searchString){
		if(searchString.Year.includes(",")){

			var yearList = searchString.Year.split(",");
			for(var i=0;i<yearList.length;i++){
				if(yearList[i].trim()===data.Year.toString().trim()){
					return 1;
				}
			}
			return 0;


		}
		else if(searchString.Year.includes("-")){
			var yearRange = searchString.Year.split("-");
			if(yearRange.length==2){
				var lowRange = parseInt(yearRange[0].trim());
				var highRange = parseInt(yearRange[1].trim());
				var thisYear = parseInt(data.Year.toString().trim());

				if(thisYear>=lowRange && thisYear<=highRange) return 1;
			}


		}
		else{
			return data.Year.toString().trim().indexOf(searchString.Year) !== -1 ; 
		}
		return 0;
	}

	yearInRange(data, searchString, year){
		//for some reson the search term isn't coming throuhg
		if(this.yearFilter.value.length==0) return 0;

		//if this is a year range separated by a hyphen
		if(this.yearFilter.value.indexOf("-") !=-1){
			var yearRange = this.yearFilter.value.split("-");
			if(yearRange.length==2){
				if(yearRange[0].trim().length==4 && yearRange[1].trim().length==4){
					if(year>=parseInt(yearRange[0].trim()) && year<=parseInt(yearRange[1].trim()) ) return 0; 
				}else if(yearRange[0].trim().length==4 && yearRange[1].trim().length!=4){
					if(year==parseInt(yearRange[0].trim())) return 0;
				}


			}
		}
		//otherwise assume it's a lst
		else {

			if(this.yearFilter.value.includes(",")){

				var yearList = this.yearFilter.value.split(",");
				for(var i=0;i<yearList.length;i++){
					if(yearList[i].trim()===year.trim()){
						return 1;
					}
				}
				return 0;


			}
			else{
				return this.yearFilter.value.toString().trim().indexOf(year) !== -1 ; 
			}
		}

		//	if(year>=lowYear && year<=this.currentMaxValue) return 0;
		return -1;

	}
	getHasPollBooksFilter(pollBookCode,searchTerm){
		if(searchTerm=='y'){
			if(pollBookCode.length>1) {
				return 0;
			}else{
				return -1;
			}


		}
		else if (searchTerm=='n'){
			if(pollBookCode.length==0) {
				return 0;
			}else{
				return -1;
			}
		}
		return 0;

	} 

	PollBookTest(){
		//console.log();
		let dialogRef = this.dialog.open(PollbookDialogueComponent, {
			data: this.pollBooks,
		});
	}
	popUpHop(){
		//console.log("hop text" ,this.hopData);
		let dialogRef = this.dialog.open(PollbookDialogueComponent, {
			data: this.hopData,
		});
	}
	//fetches the pollbook data. is called by click event from the table row 
	getBook($event, element){



		var splitCodes = element.PollBookCode.split(";");
		var trimmedCodes="";
		for(var i=0;i<splitCodes.length;i++){
			trimmedCodes+=splitCodes[i].trim()+";";
		}
		trimmedCodes = trimmedCodes.substring(0, trimmedCodes.length - 1);

		this.getPollBooksService.getData(trimmedCodes)
		.subscribe(
			(data: PollBookResponse) => this.pollBooks = {
				num_results:  data['num_results'],
				poll_books:  data['poll_books'],
			},err => console.error(err) , () => this.PollBookTest() );
	} 
	getHasPollBooks(pollBookCode){
		if(pollBookCode.length>0) return 'Y ('+pollBookCode.split(";").length+')';

		return 'N';
	}
	//just for neatness in the text of the graph
	getPlural(number){
		if(number==1){
			return " was contested.";
		}
		return " were contested.";
	}
	//again this is for the graph i think
	getNumberOfContested(){
		var count = 0;
		for(var i=0;i<this.dataSource.filteredData.length;i++){

			if(  this.dataSource.filteredData[i].Contested.trim().toLowerCase().indexOf("y" )>-1) count++;

		}
		return count;
	}
	checkBoroughData(){
		// console.log("BOROGUHS",this.boroughs);
		for (let key in this.boroughs) {
			// console.log(key, this.boroughs[key]);
			var mark: marker = {
				formatted_address:key,//String(this.boroughs[key]["formatted_address"]),
				lat:this.boroughs[key]["lat"],
				lng:this.boroughs[key]["lng"],
				selected:false
			}

			this.markers.push(mark);

		}

	}

	//add position data for the counties. counties are represented by amrkers
	checkCentroids(){


		this.centroids.forEach(
			(centroid) => {
				let county: County = {
					name:centroid.name,
					lat:centroid.lat,
					lng:centroid.lng,
					isOpen:false
				}
				this.counties.push(county);

			}

			);

	}
	getLatLngForCentroidName(name){
		for(var i=0;i<this.centroids.length;i++){
			if(name==this.centroids[i].name){
				var obj = {
					lat:this.centroids[i].lat,
					lng:this.centroids[i].lng
				}
				return obj;
			}
		}
	}
	//main data grabbign  function called in ngonint 
	getData() {
		this.getLocationsService.getData() .subscribe(
			(data: Elections) => this.elections = data['elections']
			,err => console.error(err),() => this.addDataToConstituencies());

		this.boroughService.getData() .subscribe(
			(data: Boroughs) => this.boroughs = data
			,err => console.error(err),() => this.checkBoroughData());

		this.centroidsService.getData() .subscribe(
			(data: Centroid []) => this.centroids = data
			,err => console.error(err),() => this.checkCentroids());

		this.getLocationsService.getData()
		.subscribe(
			(data: Elections) => this.electionsMeta = {
				num_results:  data['num_results'],
				earliest_year: data['earliest_year'],
				latest_year:  data['latest_year'],
				elections:  data['elections']
			},err => console.error(err),() => this.updateMeta()  );

		this.geojsonServiceService.getData()
		.subscribe((data: GEOJSON) => this.geojson = data,err => console.error(err),() => this.addIsActive() );


	};
	//go through the geojson and add field indicating whther that area is currently lit up or not
	addIsActive(){
		//console.log("geo",this.geojson);

		//type: "FeatureCollection", features: Array(92)
		for(var i=0;i<this.geojson.features.length;i++){
			this.geojson.features[i].properties.isactive = false; 
			// geo.type = this.geojson.type;

			var geo: GEOJSON = {
				type:this.geojson.type,
				features:[this.geojson.features[i]]
			}
			geo.features[0].properties.isactive=false;
			this.geojsons.push(geo);
		}

		//	console.log("this.geojsons",this.geojsons);
	}
	//https://html.developreference.com/article/10051353/Angular+google+maps+%23agm+core
	//dynamically style geosjon counties
	styleFunc(feature) {

				if(feature.j.isactive==true){
					// console.log("active feature",feature);

					return {

						fillColor: "grey",
						strokeColor: "#0db9f0",
						strokeWeight: 2,
						zIndex:100,

					};

				}
				else if (feature.j.isactive==false){
					// console.log("inactive feature",feature.i);

					return {

						fillColor: "black",
						strokeColor: "white",
						strokeWeight: 1,
						zIndex:1,

					};
				}


				return {

					fillColor: "black",
					strokeColor: "blue",
					strokeWeight: 1,
					zIndex:1,

				};
			}
			mouseOverMap(event){
				console.log("event",event);
			}
			mapClicked($event: MouseEvent) {

				// console.log("map click", $event);
				// this.showDataLayer = true;

				// this.centroids[this.centroids.length-1].lat = $event.coords.lat;
				// this.centroids[this.centroids.length-1].lng = $event.coords.lng;
				// console.log(JSON.stringify(this.centroids));
				// console.log("lat ",$event.coords.lat);
				//console.log($event.coords.lng);
			}


			//if you click on a county
			geoClicked(clickEvent) {
				
				//the first time you click on a county it should get the HOP data. The scraper is broken though :(
				this.hopData.fetch = true;
		
					if(this.hopData.fetch){
						this.hOPService.getData(clickEvent.feature.getProperty("name"), this.minValue).subscribe(
							(data: HOPData) => this.hopData = {
								innerText: data['innerText'],
								yearRange:data['date_range'],
								url:data['url'],
								constituency:data['constituency'],
								fetch:true

							}
							,err => console.error("error",err),() => this.popUpHop());
					}


					clickEvent.feature.setProperty("isactive", !clickEvent.feature.getProperty("isactive"));
					//	console.log("after clicked ",clickEvent.feature.getProperty("isactive"));

					//if this feature is now active, add this to constituency filter
					if(clickEvent.feature.getProperty("isactive")){
						//	console.log("this filtier",this.filteredValues['Constituency']);

						//if there's nothign in the filter, then just set the whole filter as this constituency name, toherwise add a comma firt 
						if(this.filteredValues['Constituency'].length == 0){
							// this.filteredValues['Constituency'] +=clickEvent.feature.getProperty("name");
							this.constituencyFilter.setValue(clickEvent.feature.getProperty("name"));
						}
						else{
							//this.filteredValues['Constituency'] +=", "+clickEvent.feature.getProperty("name");



							this.constituencyFilter.setValue(this.filteredValues['Constituency'] +","+clickEvent.feature.getProperty("name"));
						}

						this.dataSource.filter = JSON.stringify(this.filteredValues);
					}
					//if this feature is now inactive
					else{
						if(this.constituencyFilter.value!=null){
							var constituencyList = this.constituencyFilter.value.split(",");
							//		console.log("Before",constituencyList);
							constituencyList = this.arrayRemove(constituencyList,clickEvent.feature.getProperty("name").trim());
							//		console.log("after",constituencyList,constituencyList.length,clickEvent.feature.getProperty("isactive"));
							var newConsituencyFilterValue="";


							this.constituencyFilter.setValue("");

							if(constituencyList.length>0){
								for(var i=0;i<constituencyList.length;i++){
									if(i==0) {
										newConsituencyFilterValue +=constituencyList[i].trim() ;
									}else{
										newConsituencyFilterValue+=","+constituencyList[i].trim() ;
									}

								}
								this.constituencyFilter.setValue(newConsituencyFilterValue);
							}
							else{
								this.constituencyFilter.setValue("");
								// this.clearMap();
							}

							//	console.log("newConsituencyFilterValue",newConsituencyFilterValue);
							if(newConsituencyFilterValue.length>0){

							}


							this.dataSource.filter = JSON.stringify(this.filteredValues);
						}
					}
				}
				mouseOutMarker(marker, event){
					marker.label="";
				}
				mouseOverMarker(marker, event){
					marker.label=marker.formatted_address;


				}
				layerMouseOver(clickEvent, geo){

					if(this.counties.length>0){
						for(var i=0;i<this.counties.length;i++){
							if(this.counties[i]!=undefined){

								if(this.counties[i].name==clickEvent.feature.getProperty("name") ){
									this.counties[i].isOpen = true;
									var that = this;
									var ind = i;
									setTimeout(()=>{   

										this.counties[ind].isOpen = false;
									}, 3000);


								}
							}
						}
					}

				}

				markerClicked(marker) {
					console.log(`clicked the marker: `,marker);

					if(marker.selected){
						this.constituencyFilter.setValue("");
						marker.selected=false;
					}else{

						this.constituencyFilter.setValue(marker.formatted_address);
						marker.selected=true;
					}
					this.dataSource.filter = JSON.stringify(this.filteredValues);


					this.updateMarkers();
				}
				setMyProperty(){
					// this.geojsons[0].features[0].setproperty("stroke","black");
					// console.log("called", this.geojsons[0].features[0]);
				}


				markerDragEnd(m: marker, $event: MouseEvent) {
					console.log('dragEnd', m, $event);
				}
				styles= [
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

			// just an interface for type safety.
			interface marker {
				lat: number;
				lng: number;
				formatted_address?: string;
				selected:boolean;
				// draggable: boolean;
			}
			interface constituency{
				lat: number;
				lng: number;
				formatted_address?: string;
				pollbooks: PollBook[];
				// draggable: boolean;
			}

