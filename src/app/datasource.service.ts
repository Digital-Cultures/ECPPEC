import { EventEmitter, Injectable, Output, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FormControl } from '@angular/forms';
import * as cloneDeep from 'lodash/cloneDeep';
import { FilterObj, Elections, Election , PollBook, PollBookResponse, HOPData} from  './viz/viz.component';
import { HttpParams, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { GetElectionsService } from './get-elections.service';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { switchMap ,delay, timeout, map} from 'rxjs/operators';
import express, {Request, Response} from 'express';
@Injectable({
  providedIn: 'root'
})
export class DatasourceService {

  constructor(private http: HttpClient, private getElectionsService: GetElectionsService) { }
  	filteredValues = {
		election_month: '', constituency: '', election_year: '', countyboroughuniv: '', contested: '', by_election_general: '', by_election_cause: '' ,franchise_type: '',pollbook_id: ''

	};
	dataReady: Observable<any>;
	dataReadySubscription: Subscription;
	pollBooksMeta: PollBookResponse;
	electionsMeta: Elections;
		pollBooks: PollBookResponse;

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
	dataSource = new MatTableDataSource<Election>();
	
	public ready= new BehaviorSubject(false);
	ngOnInit() {

// 	}
//   init(){
	
  }
  onDataSubscriptionChange(): Observable<any> {
	return of({id:1,data:"hello word"});
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
		}else{
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
getRandomConstituenciesString(numRandomConsituencies) {
	var filteredConstituencies = [];


	for (var i = 0; i < this.dataSource.data.length; i++) {
		if (!filteredConstituencies.includes(this.dataSource.data[i].constituency)) {
			filteredConstituencies.push(this.dataSource.data[i].constituency);
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
generateRandomSearch() {
	var spread = Math.floor(Math.random() * 8) + 2;
	var fullRange = 1832 - (1695 + spread);
	var start = Math.floor(Math.random() * fullRange) + 1696;
	var minYear = start;
	var maxYear = spread + start;
	// var y = 1777;
	//TODO add some other filters here like by election cause
	this.yearFilter.setValue(minYear.toString() + "-" + maxYear.toString());
	var rands = this.getRandomConstituenciesString(20);
	this.constituencyFilter.setValue(rands);
	this.dataSource.filter = JSON.stringify(this.filteredValues);
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
	else if (searchString.election_year.includes("-") && searchString.election_year.length==9) {
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
	else if (searchString.election_year.length>0 &&  searchString.election_year.length<4) {
		return 0;
	}
	else if (searchString.election_year.length==0) {
		return 1;
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
	//otherwise assume it's a list
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
  getData(){


		this.getElectionsService.getData().subscribe(
			(data: Elections) => this.electionsMeta = {
				num_results: data['num_results'],
				earliest_year: data['earliest_year'],
				latest_year: data['latest_year'],
				elections: data['elections']
			}, err => console.error(err), () => this.gotData()  );

  }
//   obsTest(service: any, object: any, data: any): Observable<any> {
// 	return service.obsTest().pipe(
// 		map((result)=>{
// 			//data.splice(index,1);
// 			return data;
// 		}))
//   }
  gotData(){
	  	this.dataSource = new MatTableDataSource<Election>(this.electionsMeta.elections);
			this.constituencyFilter.valueChanges.pipe(

			);

		  this.constituencyFilter.valueChanges.subscribe((constituencyFilterValue) => {
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
		//  this.generateRandomSearch();
		this.ready.next(true);
		
		// setTimeout(() => {
		// 	console.log("generating random search");
		// 	this.generateRandomSearch();
		// }, 5000);

  }


}