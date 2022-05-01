
import { Component, OnInit, OnDestroy, ViewChild, ApplicationRef, AfterViewInit , ElementRef} from '@angular/core';
import { GoogleMapsModule, GoogleMap } from '@angular/google-maps'
import { DatasourceService } from '../datasource.service';
import { TableComponent } from '../table/table.component';
import { mapStyles } from '../mapStyles';// import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { windowWhen } from 'rxjs/operators';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {

	constructor(private datasourceService: DatasourceService, private appRef: ApplicationRef) { }
	@ViewChild(GoogleMap, { static: false }) map: GoogleMap;
	@ViewChild('myIdentifier')
 	 myIdentifier: ElementRef;
	clicked: boolean = false;
	zoom: number = 7;
	mapIsReady: boolean = false;
	center: google.maps.LatLngLiteral = {
		lat: 52.4862,
		lng: -2
	}
	w:number = 0;
	m: any = mapStyles.styles;//this.mStyles.styles;
	//console.log(mpStyles);
	myValueSub: Subscription;
	dynamicMarkers: google.maps.Marker[] = [];
	highlightColour: string = "#673ab7";
	markers = [];

	ngOnInit(): void {
		this.w = window.innerWidth;
		if(window.innerWidth<600) {
			this.zoom = 6;
		}
		//this.map.zoom(this.zoom);

	}
	ngAfterViewInit() {
		// console.log("got map" ,window.innerWidth);
		

	}
	dataChange(val) {

	}
	dataUpdate(value) {

		// setTimeout(()=>{                           //<<<---using ()=> syntax


		// console.log("data update in map componenet", this.datasourceService.getFilteredConstituencies());
		//this.datasourceService.electionsPerYear = this.datasourceService.getElectionsPerYear();
		//var doubleCheck = this.datasourceService.getFilteredConstituencies();
		this.updateIsActive(this.datasourceService.getFilteredConstituencies());
		this.setMapStyle();
		
		//todod replace marker update here
		this.dynamicMarkers.forEach(delement => {
			var inData = false;
			var cbu = "";

			//check if this marker appears in the current filtered data
			this.datasourceService.dataSource.filteredData.forEach(felement => {

				if (delement.getTitle().trim() == felement.constituency.trim()) {
					inData = true;
					cbu = felement.countyboroughuniv;
				}

			});
			if (inData) {
				var image = {
					url: './assets/images/dot.png', //smarker
					size: new google.maps.Size(20, 20),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(10, 10),
					scaledSize: new google.maps.Size(20, 20)
				};
				var options = {
					icon: image,
					title: delement.getTitle(),
					visible: true//cbu == "C" ? false : true
					// label: { text: delement.getTitle(), color: "white" }
				}


				delement.setOptions(options);

			} else {
				var image = {
					url: './assets/images/dot.png',
					size: new google.maps.Size(20, 20),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(10, 10),
					scaledSize: new google.maps.Size(20, 20)
				};
				var options = {
					icon: image,
					title: delement.getTitle(),
					visible: false//cbu == "C" ? false : true,
					// label: { text: delement.getTitle(), color: "white" }
				}


				delement.setOptions(options);

			}
		});
		//console.log("markers,",this.dynamicMarkers);

		this.appRef.tick();
	}

	gotData(value) {
		if (value) {
			this.datasourceService.dataUpdate.subscribe(() => this.dataUpdate(value)
			);
			this.datasourceService.getUniqueElections();
		//	console.log("this.dynamicMarkers", this.dynamicMarkers);
			this.dynamicMarkers = [];
			this.createMarkers();
			
		}
		this.appRef.tick();
	}

	createMarkers(){
		this.datasourceService.uniqueElections.forEach(element => {
		//	console.log(element.constituency);
		var image = {
			url: './assets/images/dot.png',
			size: new google.maps.Size(20, 20),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(10, 10),
			scaledSize: new google.maps.Size(20, 20)
		};


			if(element.countyboroughuniv=="B" || element.countyboroughuniv=="U"){
			//	console.log("lat",element.lat)
				this.markers.push({
					position: {
					  lat: +element.lat,
					  lng: +element.lng ,
					},
					// label: {
					//   color: 'red',
					//   text: 'Marker label ' + (this.markers.length + 1),
					// },
					options :{
						icon:{
						url: './assets/images/dot.png',
						size: new google.maps.Size(20, 20),
						origin: new google.maps.Point(0, 0),
						anchor: new google.maps.Point(10, 10),
						scaledSize: new google.maps.Size(20, 20)
					}
				},
					visible:true,
					title: element.constituency,
					
				  })


			var thisDynamicMarker = new google.maps.Marker();

			thisDynamicMarker.setPosition({ lat: +element.lat, lng: +element.lng });
			
			var options = {
			 icon: image,
				title: element.constituency,
				visible: true//element.countyboroughuniv == "C" ? false : true
				// label: { text: element.constituency, color: "white" }
			}


			thisDynamicMarker.setOptions(options);

			this.dynamicMarkers.push(thisDynamicMarker);



			}

		});
		//console.log("dynamicMarkers",this.dynamicMarkers);
		//this.addGMarker();
		//this.appRef.tick();
	}

	mapReady() {
	//	this.addMarker();
		this.myValueSub = this.datasourceService.ready.subscribe(value => { this.gotData(value) });
		this.datasourceService.constituencyFilter.valueChanges.subscribe(() => this.dataChange("constituencyFilter"));
		this.datasourceService.monthFilter.valueChanges.subscribe(() => this.dataChange("monthFilter"));
		this.datasourceService.yearFilter.valueChanges.subscribe(() => this.dataChange("yearFilter"));
		this.datasourceService.countyFilter.valueChanges.subscribe(() => this.dataChange("countyFilter"));
		this.datasourceService.contestedFilter.valueChanges.subscribe(() => this.dataChange("contestedFilter"));
		this.datasourceService.byElectionGeneralFilter.valueChanges.subscribe(() => this.dataChange("byElectionGeneralFilter"));
		this.datasourceService.byElectionCauseFilter.valueChanges.subscribe(() => this.dataChange("byElectionCauseFilter"));
		this.datasourceService.franchiseFilter.valueChanges.subscribe(() => this.dataChange("franchiseFilter"));
		this.datasourceService.pollBookCodeFilter.valueChanges.subscribe(() => this.dataChange("pollBookCodeFilter"));

		this.map.data.loadGeoJson("/assets/data/england.json");

		this.map.data.setStyle(function (feature) {


			var color = "white";

			return {
				fillColor: "pink",
				strokeColor: "white",
				strokeWeight: 1,
				zIndex: 0,
			};
		});
		//shows centroid of county on mouse over
		this.map.data.addListener('mouseover', (event) => {
			this.setMatchingCountyMarkerVisibility(true, event.feature.getProperty("name"));
		});
		this.map.data.addListener('mouseout', (event) => {
			this.setMatchingCountyMarkerVisibility(false, event.feature.getProperty("name"));
		});

		this.map.data.addListener('click', (event) => {

			//clicked is a debounce
			if (!this.clicked) {
				this.clicked = true;
				if (this.datasourceService.filteredValues['constituency'].includes(event.feature.getProperty("name"))) {

					event.feature.setProperty('isActive', false);
					var updatedConstituencyFilterValue = this.datasourceService.filteredValues['constituency'].replace(',' + event.feature.getProperty("name"), '');
					var updatedConstituencyFilterValue = this.datasourceService.filteredValues['constituency'].replace(event.feature.getProperty("name"), '');

					this.datasourceService.constituencyFilter.setValue(updatedConstituencyFilterValue);
					this.datasourceService.filteredValues['constituency'] = updatedConstituencyFilterValue;
					this.datasourceService.dataSource.filter = JSON.stringify(this.datasourceService.filteredValues);

				}
				else {
					//console.log("click",event,event.feature.getProperty("name"));

					event.feature.setProperty('isActive', true);
					if (this.datasourceService.filteredValues['constituency'].length > 0) {
						this.datasourceService.filteredValues['constituency'] = this.datasourceService.filteredValues['constituency'] + "," + event.feature.getProperty("name");
					}
					else {
						this.datasourceService.filteredValues['constituency'] = event.feature.getProperty("name");
					}

					this.datasourceService.constituencyFilter.setValue(this.datasourceService.filteredValues['constituency']);
					this.datasourceService.dataSource.filter = JSON.stringify(this.datasourceService.filteredValues);

				}

				this.appRef.tick();
				setTimeout(() => {
					this.clicked = false;
				}, 500);

			}
		});


		this.setMapStyle();
	}
	markerClicked(marker: google.maps.Marker, content) {
		console.log("Marker", marker);

		//if the marker name is already in the filter remove it
		if (this.datasourceService.filteredValues['constituency'].includes(marker.getTitle().trim())) {
			console.log("name exists",this.datasourceService.filteredValues['constituency']);

			var filterContents = this.datasourceService.filteredValues['constituency'];
			//console.log("contents",filterContents,filterContents.replace(',' + marker.getTitle().trim(), ''));

			var updatedConstituencyFilterValue = this.datasourceService.filteredValues['constituency'].replace(',' + marker.getTitle().trim(), '');
			
			var updatedConstituencyFilterValue = this.datasourceService.filteredValues['constituency'].replace(marker.getTitle().trim(), '');

			this.datasourceService.filteredValues['constituency'] = updatedConstituencyFilterValue;
			console.log("name existed",this.datasourceService.filteredValues['constituency'],updatedConstituencyFilterValue);

		} else {
			if (this.datasourceService.filteredValues['constituency'].length > 0) {
				this.datasourceService.filteredValues['constituency'] = this.datasourceService.filteredValues['constituency'] + "," + marker.getTitle().trim();

			}
			else {
				this.datasourceService.filteredValues['constituency'] = marker.getTitle().trim();
			}
		}
		this.datasourceService.constituencyFilter.setValue(this.datasourceService.filteredValues['constituency']);
		this.datasourceService.dataSource.filter = JSON.stringify(this.datasourceService.filteredValues);
	}
	setMapStyle() {
		if (this.map) {
			this.map.data.setStyle(function (feature) {
				var name = feature.getProperty('isActive');
				var color = "white";
				var index = 1;
				if (name) {
					color = "rgba(251, 191, 36,1)";
					index = 2;


				}
				else {
					color = "white";
					index = 1;
				};
				return {

					strokeColor: color,
					strokeWeight: index,
					zIndex: index,
					fillColor: "grey"
				};
			});
		}
	}
	setMatchingCountyMarkerVisibility(visible, constituency) {



		this.dynamicMarkers.forEach(element => {
			if (element.getTitle() == constituency) {
				//	element.setOptions(options);
				//	element.setVisible(visible);
				var image = {
					url: './assets/images/dot.png',
					size: new google.maps.Size(5, 5),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(2, 2),
					scaledSize: new google.maps.Size(5, 5)
				};

				var options = {
					icon: image,
					title: constituency,
					visible: visible,
					zIndex: 1001

				}


				element.setOptions(options);
				element.setLabel({ text: constituency, color: "white" });
			}
		});
		this.appRef.tick();




	}
	mapZoomChanged() {

	}
	setallInActive() {
		this.map.data.forEach(function (feature) {
			feature.setProperty("isActive", false)
		});
	}
	updateIsActive(constituencies: String[]) {
		if (this.map) {
			this.map.data.forEach(function (feature) {
				var name = feature.getProperty('name');
				if (constituencies.indexOf(name) > -1) {

					feature.setProperty("isActive", true)

				}
				else {
					feature.setProperty("isActive", false)
				}
			});
		}
	}
	// updateMapStyles(constituencies: String[]) {

	// 	this.map.data.setStyle(function (feature) {
	// 		var name = feature.getProperty('name');
	// 		var color = "white";
	// 		var index = 1;
	// 		if (constituencies.indexOf(name) > -1) {
	// 			color = this.highlightColour;
	// 			index = 3;
	// 		}
	// 		else {
	// 			color = "white";
	// 			index = 1;
	// 		};
	// 		return {
	// 			label:"Test",
	// 			strokeColor: color,
	// 			strokeWeight: index,
	// 			zIndex: index

	// 		};
	// 	});

	// }
	mapIdle() {
		// var featureCount = 0;
		// this.map.data.forEach(function (feature) {
		// 	featureCount++;
		// });
		// if (featureCount > 1 && this.mapIsReady == false) {
		// 	this.setallInActive();

		// 	this.mapIsReady = true;

		// }
	}
	ngOnDestroy() {
		if (this.myValueSub) {
			this.myValueSub.unsubscribe();
		}
		// if (this.map) {
		// 	console.log("destroying map",this.map);
		// 	this.map = null;
		// 	console.log("destroyed map",this.map);
		// }
		// if (this.m) this.m = null;
		// if( this.dynamicMarkers) this.dynamicMarkers= [];
	}
	click(event: google.maps.MouseEvent) {
		// console.log(event)
		// //this.addGMarker();
		 this.createMarkers();
		// console.log(this.markers);
	  }
	
	// addGMarker() {
	// 	this.markers.push({
	// 	  position: {
	// 		lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
	// 		lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
	// 	  },
	// 	  label: {
	// 		color: 'red',
	// 		text: 'Marker label ' + (this.markers.length + 1),
	// 	  },
	// 	  title: 'Marker title ' + (this.markers.length + 1),
	// 	  options: { animation: google.maps.Animation.BOUNCE },
	// 	})
	//   }

	// addMarker() {
	// 	// this.dynamicMarkers.push({
		  
		  
	// 	//   title: 'Marker title ' + (this.dynamicMarkers.length + 1),
	// 	//   options: { animation: google.maps.Animation.BOUNCE },
	// 	// })
	// 	var thisDynamicMarker = new google.maps.Marker();
	// 	//51.51056058608404, -0.061594143272712835
	// 			thisDynamicMarker.setPosition({lat: 51.51056058608404, lng: -0.061594143272712835 });
	// 			var image = {
	// 				url: './assets/images/dot.png',
	// 				size: new google.maps.Size(20, 20),
	// 				origin: new google.maps.Point(0, 0),
	// 				anchor: new google.maps.Point(10, 10),
	// 				scaledSize: new google.maps.Size(20, 20)
	// 			};

	// 			var options = {
	// 				icon: image,
	// 				title: "TeST",
	// 				visible: true//element.countyboroughuniv == "C" ? false : true
	// 				// label: { text: element.constituency, color: "white" }
	// 			}


	// 			thisDynamicMarker.setOptions(options);
	// 			thisDynamicMarker.setVisible(true);
	// 			this.dynamicMarkers.push(thisDynamicMarker);
	//   }
}
