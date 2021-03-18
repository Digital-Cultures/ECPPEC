import { ElementRef, ApplicationRef, Component, Directive, OnInit, OnDestroy, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { HttpParams, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { GetElectionsService } from '../get-elections.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

import { FormControl } from '@angular/forms';
import * as cloneDeep from 'lodash/cloneDeep';
import { DoCheck, KeyValueDiffers, KeyValueChangeRecord } from '@angular/core';

import { FilterObj } from  '../viz/viz.component';
import { Elections } from  '../viz/viz.component';
import { Election } from  '../viz/viz.component';
// import { copyFile } from 'fs';
// export interface FilterObj {
// 	lowValue: number;
// 	highValue: number;
// }
// export interface Election {
// 	election_year: string;
// 	election_month: string;
// 	constituency: string;
// 	countyboroughuniv: string;
// 	by_election_general: string;
// 	contested: string;
// 	election_id: string;
// 	franchise_type:string;
// 	pollbook_id: string;
// 	by_election_cause: string;
// 	notes: string;
// 	latitude: string;
// 	longitude: string;
// 	lat:number;
// 	lng:number;
// }
// export interface Elections {
// 	num_results: number;
// 	earliest_year: number;
// 	latest_year: number;
// 	elections: any[];
// }
@Component({
  selector: 'app-sandpit',
  templateUrl: './sandpit.component.html',
  styleUrls: ['./sandpit.component.scss']
})
export class SandpitComponent implements OnInit {

  constructor(private http: HttpClient, private getElectionsService: GetElectionsService) { }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  filterargs: FilterObj;
  filteredValues = {
		election_month: '', constituency: '', election_year: '', countyboroughuniv: '', contested: '', by_election_general: '', by_election_cause: '' ,franchise_type: '',pollbook_id: ''

	};
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

  chartInstance: any;
  electionsMeta: Elections; 
  schartOption: EChartsOption;
  updateOptions: any;
  updatePieOptions: any;
  years: number[] = [];
  seriesData: any[] = [] ;
  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: this.years,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: this.seriesData,
        type: 'line',
      },
    ],
  };
  theme:string = "macarons";
  pieOptions = {
    title: {
      text: 'Franchise type',
      subtext: '',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      x: 'center',
      y: 'bottom',
      data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
    },
    calculable: true,
    series: [
      {
        name: 'area',
        type: 'pie',
        radius: [30, 110],
        roseType: 'area',
        data: [
          { value: 10, name: 'rose1' },
          { value: 5, name: 'rose2' },
          { value: 15, name: 'rose3' },
          { value: 25, name: 'rose4' },
          { value: 20, name: 'rose5' },
          { value: 35, name: 'rose6' },
          { value: 30, name: 'rose7' },
          { value: 40, name: 'rose8' }
        ]
      }
    ]
  };
  ngOnInit(): void {
    this.getElectionsService.getData()
		.subscribe(
			(data: Elections) => this.electionsMeta = {
				num_results: data['num_results'],
				earliest_year: data['earliest_year'],
				latest_year: data['latest_year'],
				elections: data['elections']
			}, err => console.error(err), () => this.setUpFilters());
  }
  onChartInit(e: any) {
    this.chartInstance = e;
    console.log('on chart init:', e);
  }
  getFranchiseTypes(){
    var franchise_types = [];
    var franchise_data = [];
    this.dataSource.filteredData.forEach(element =>{
      if(franchise_types.indexOf(element.franchise_type)==-1){
        franchise_types.push(element.franchise_type);
      }
    }

    )
  }
  getFranchiseData(){
    var franchise_data = {};
    //  franchise_types.forEach(element =>{
    //   franchise_data[element]=0;
    // });
    this.dataSource.filteredData.forEach(element =>{
      if (element.franchise_type in franchise_data){
        franchise_data[element.franchise_type]++;
      }else{
        franchise_data[element.franchise_type]=1;
      }
      
      
    })
    console.log("franchise_data",franchise_data);
    var clean_data = [];
    for (var property in franchise_data) {
      var obj = {
        value:franchise_data[property],
        name:property
      }
      clean_data.push(obj);
    }
    return clean_data;
  }
  onDataSubscriptionChange(){
    console.log("after",this.dataSource.filteredData);
    this.updateOptions = {
      series: [{
        data: this.getContestedPerYear(this.years)
      }]
    }
    var names = [];
    var franchiseData = this.getFranchiseData();
    console.log("franchiseData",franchiseData);
    for(var i =0;i<franchiseData.length;i++){
      names.push(franchiseData[i].name);
    }
    this.updatePieOptions = {
      series: [
        {
          name: 'area',
          type: 'pie',
          radius: [30, 110],
          roseType: 'area',
          data: franchiseData
        }
      ],
      legend: {
        x: 'center',
        y: 'bottom',
        data: names
      },

    }
    console.log("updatePieOptions",this.updatePieOptions);

  }

  setUpFilters(){
    
    this.dataSource = new MatTableDataSource<Election>(this.electionsMeta.elections);
    this.dataSource.paginator = this.paginator;
    for(var i=this.electionsMeta.earliest_year;i<this.electionsMeta.latest_year;i++){
    this.years.push(i);
    }
    this.seriesData = this.getContestedPerYear(this.years);
    this.updateOptions = {
      series: [{
        data: this.seriesData
      }]
    }
    console.log("before",this.dataSource.filteredData);

    console.log("chartOption",this.chartOption,this.seriesData);
  	this.constituencyFilter.valueChanges.subscribe((constituencyFilterValue) => {
      	console.log("change in consituencyfilter");
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
  
    }
 
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
  getContestedPerYear(years){
    var cpy = [];
    this.years.forEach(element => {
      cpy.push(0);
    });
    for(var i=0;i<this.dataSource.filteredData.length;i++){
      var index = parseInt(this.dataSource.filteredData[i].election_year)-this.electionsMeta.earliest_year;
      cpy[index]++;
    }
    return cpy;
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
  getRandomPerYear(years){
    var cpy = [];
    this.years.forEach(element => {
      cpy.push(Math.random()*100);
    });
    
    return cpy;
  }
  getHasPollBooks(pollbook_id) {
		if (pollbook_id.length > 0) return 'Y (' + pollbook_id.split(";").length + ')';

		return 'N';
	}
  customFilterPredicate() {
	//	this.pollBooks = null;
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

  onClick(){
    console.log(this.chartInstance);
    this.constituencyFilter.setValue("Bedford");
    this.filteredValues['constituency'] = "Bedford";
    this.dataSource.filter = JSON.stringify(this.filteredValues);
    // this.updateOptions = {
    //   series: [{
    //     data: this.getRandomPerYear(this.years)
    //   }]
    // }
   // this.chartOption.series.data = this.getContestedPerYear(this.years);
  }
  
}
