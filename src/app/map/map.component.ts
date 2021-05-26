
import { Component, OnInit, OnDestroy,ViewChild, ApplicationRef} from '@angular/core';
import { GoogleMapsModule,GoogleMap } from '@angular/google-maps'
import { DatasourceService } from '../datasource.service';
import { TableComponent} from '../table/table.component';
import {mapStyles} from '../mapStyles';// import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy{

  constructor(private datasourceService: DatasourceService, private appRef: ApplicationRef) { }
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  clicked:boolean=false;
  zoom: number = 7;
  mapIsReady:boolean = false;
  center: google.maps.LatLngLiteral= {
		lat: 52.4862,
		lng: 1.8904
	}
  m: any  = mapStyles.styles ;//this.mStyles.styles;
  //console.log(mpStyles);
  myValueSub: Subscription;
  dynamicMarkers: google.maps.Marker []=[];
  ngOnInit(): void {
    this.myValueSub = this.datasourceService.ready.subscribe(value => {this.gotData(value)});
  // this.datasourceService.ready.subscribe(() => this.gotData() );
  
   // this.datasourceService.onDataSubscriptionChange().subscribe(() => this.dataChange());
   this.datasourceService.constituencyFilter.valueChanges.subscribe(() => this.dataChange("constituencyFilter"));
   this.datasourceService.monthFilter.valueChanges.subscribe(() => this.dataChange("monthFilter"));
   this.datasourceService.yearFilter.valueChanges.subscribe(() => this.dataChange("yearFilter"));
   this.datasourceService.countyFilter.valueChanges.subscribe(() => this.dataChange("countyFilter"));
   this.datasourceService.contestedFilter.valueChanges.subscribe(() => this.dataChange("contestedFilter"));
   this.datasourceService.byElectionGeneralFilter.valueChanges.subscribe(() => this.dataChange("byElectionGeneralFilter"));
   this.datasourceService.byElectionCauseFilter.valueChanges.subscribe(() => this.dataChange("byElectionCauseFilter"));
   this.datasourceService.franchiseFilter.valueChanges.subscribe(() => this.dataChange("franchiseFilter"));
   this.datasourceService.pollBookCodeFilter.valueChanges.subscribe(() => this.dataChange("pollBookCodeFilter"));

  }
  dataChange(val){

  }
  dataUpdate(value){
    
	// setTimeout(()=>{                           //<<<---using ()=> syntax
		
  
	// console.log("data update in map componenet", this.datasourceService.getFilteredConstituencies());
  this.datasourceService.electionsPerYear = this.datasourceService.getElectionsPerYear();
  var doubleCheck = this.datasourceService.getFilteredConstituencies();
  this.updateIsActive(this.datasourceService.getFilteredConstituencies());
  this.setMapStyle();

  this.dynamicMarkers.forEach(delement => {
    var inData =false;
    var cbu = "";
  this.datasourceService.dataSource.filteredData.forEach(felement => {
    
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

  gotData(value){
    if(value){
		this.datasourceService.dataUpdate.subscribe(() => this.dataUpdate(value)
		);
       this.datasourceService.getUniqueElections();
	   console.log("map data ready",this.datasourceService.uniqueElections);
this.datasourceService.uniqueElections.forEach(element => {
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
    }
  }
  


  mapReady(){
	
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
				var updatedConstituencyFilterValue = this.datasourceService.filteredValues['constituency'].replace(','+event.feature.getProperty("name"),'');
				this.datasourceService.constituencyFilter.setValue(updatedConstituencyFilterValue);
				this.datasourceService.filteredValues['constituency']=updatedConstituencyFilterValue;
				this.datasourceService.dataSource.filter = JSON.stringify(this.datasourceService.filteredValues);
			
			}
			else{
			
				 event.feature.setProperty('isActive',true);
				 this.datasourceService.filteredValues['constituency'] =this.datasourceService.filteredValues['constituency']+","+event.feature.getProperty("name");
				 this.datasourceService.constituencyFilter.setValue(this.datasourceService.filteredValues['constituency']);
				this.datasourceService.dataSource.filter = JSON.stringify(this.datasourceService.filteredValues);
			
			}
			
			this.appRef.tick() ;
			setTimeout(() => {
				this.clicked = false;
			}, 500);
			
		}
		});
		

		this.setMapStyle();
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
  setMatchingCountyMarkerVisibility(visible, constituency){
	

	
		this.dynamicMarkers.forEach(element => {
			if(element.getTitle()==constituency){
			//	element.setOptions(options);
				element.setVisible(visible);
			}
		});
		this.appRef.tick();


	}
  mapZoomChanged(){

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
  ngOnDestroy(){
	if (this.myValueSub) {
        this.myValueSub.unsubscribe();
    }
  }
 
}
