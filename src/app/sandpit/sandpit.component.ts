import { ElementRef, ApplicationRef, Component, Directive, OnInit, OnDestroy, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { HttpParams, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { GetElectionsService } from '../get-elections.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { Injectable } from '@angular/core';
import { DatasourceService } from '../datasource.service';

import { FormControl } from '@angular/forms';
import * as cloneDeep from 'lodash/cloneDeep';
import { DoCheck, KeyValueDiffers, KeyValueChangeRecord } from '@angular/core';

import { FilterObj } from  '../viz/viz.component';
import { Elections } from  '../viz/viz.component';
import { Election } from  '../viz/viz.component';

import { TableComponent} from '../table/table.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-sandpit',
  templateUrl: './sandpit.component.html',
  styleUrls: ['./sandpit.component.scss']
})
export class SandpitComponent implements OnInit {

  constructor(private datasourceService: DatasourceService) { }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  electionsPerYear: any[] = [];
  
	
	dataSource = new MatTableDataSource<Election>();
  normalise: boolean = false;
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

  // bSubject.subscribe(value => {
  //   console.log("Subscription got", value); // Subscription got b, 
  //                                           // ^ This would not happen 
  //                                           // for a generic observable 
  //                                           // or generic subject by default
  // });
  ngOnInit(): void {
    //this.datasourceService.dataSourceService.getData();
    // this.datasourceService.dataSourceService.ready.subscribe(() => this.gotData()
    // );
    this.datasourceService.ready.subscribe(value => {this.gotData(value)});
    // this.datasourceService.onDataSubscriptionChange().subscribe(() => this.dataChange());
   
  }
  gotData(value){
    if(value){
   console.log("this.datasourceService.electionsMeta",this.datasourceService.electionsMeta, this.datasourceService.dataSource.data);
    for(var i=this.datasourceService.electionsMeta.earliest_year;i<this.datasourceService.electionsMeta.latest_year;i++){
    this.years.push(i);
    }
    if(this.normalise){
      this.seriesData = this.getNormalisedContestedPerYear(this.years);
    }
    else{
      this.seriesData = this.getContestedPerYear(this.years);
    }
    
    this.updateOptions = {
      series: [{
        data: this.seriesData
      }]
    }
    this.datasourceService.constituencyFilter.valueChanges.subscribe(() => this.dataChange());
    this.datasourceService.monthFilter.valueChanges.subscribe(() => this.dataChange());
    this.datasourceService.yearFilter.valueChanges.subscribe(() => this.dataChange());
    this.datasourceService.countyFilter.valueChanges.subscribe(() => this.dataChange());
    this.datasourceService.contestedFilter.valueChanges.subscribe(() => this.dataChange());
    this.datasourceService.byElectionGeneralFilter.valueChanges.subscribe(() => this.dataChange());
    this.datasourceService.byElectionCauseFilter.valueChanges.subscribe(() => this.dataChange());
    this.datasourceService.franchiseFilter.valueChanges.subscribe(() => this.dataChange());
    this.datasourceService.pollBookCodeFilter.valueChanges.subscribe(() => this.dataChange());

    
    }
  }
  onChartInit(e: any) {
    this.chartInstance = e;
    console.log('on chart init:', e);
  }
  getFranchiseTypes(){
    var franchise_types = [];
    var franchise_data = [];
    this.datasourceService.dataSource.filteredData.forEach(element =>{
      if(franchise_types.indexOf(element.franchise_type)==-1){
        franchise_types.push(element.franchise_type);
      }
    }

    )
  }
  toggleNormalise(){
    this.normalise = !this.normalise;
    this.dataChange();
  }
  getFranchiseData(){
    var franchise_data = {};
    //  franchise_types.forEach(element =>{
    //   franchise_data[element]=0;
    // });
    this.datasourceService.dataSource.filteredData.forEach(element =>{
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
  dataChange(){
    console.log("after",this.datasourceService.dataSource.filteredData);
    if(this.normalise){
      this.updateOptions = {
        series: [{
          data: this.getNormalisedContestedPerYear(this.years)
        }]
      }
    }
    else{
      this.updateOptions = {
        series: [{
          data: this.getContestedPerYear(this.years)
        }]
      }
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

 numberMap (val, in_min, in_max, out_min, out_max) {
    return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }
  getNormalisedContestedPerYear(years){
    var cpy :number[];
    this.years.forEach(element => {
      cpy.push(0);
    });
    for(var i=0;i<this.datasourceService.dataSource.filteredData.length;i++){
      var index = parseInt(this.datasourceService.dataSource.filteredData[i].election_year)-this.datasourceService.electionsMeta.earliest_year;
      cpy[index]++;
    }
    var nor = [];
    var i=0;
    cpy.forEach(element => {
      nor.push(this.numberMap( element, Math.min(...cpy), Math.max(...cpy), 0, 100)  );
      i++;
    });

    return nor;
  }

  getContestedPerYear(years){
    var cpy = [];
    this.years.forEach(element => {
      cpy.push(0);
    });
    for(var i=0;i<this.datasourceService.dataSource.filteredData.length;i++){
      var index = parseInt(this.datasourceService.dataSource.filteredData[i].election_year)-this.datasourceService.electionsMeta.earliest_year;
      cpy[index]++;
    }
    return cpy;
  }
  
  
}
