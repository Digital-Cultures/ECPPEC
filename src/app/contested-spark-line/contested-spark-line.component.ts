import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';

import * as echarts from 'echarts';
import { DatasourceService } from '../datasource.service';
import { TableComponent } from '../table/table.component';
import { Subscription } from 'rxjs';
import { DataStoryService } from '../data-story.service';
import { ContestedUtils } from '../contested-utils';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-contested-spark-line',
  templateUrl: './contested-spark-line.component.html',
  styleUrls: ['./contested-spark-line.component.scss']
})
export class ContestedSparkLineComponent implements OnInit, OnDestroy {

  constructor(private datasourceService: DatasourceService, private ref: ChangeDetectorRef, private dataStoryService: DataStoryService) { }
  subscription: Subscription;
  myValueSub: Subscription;
  utils: ContestedUtils;
  seriesData: any[] = [];
  chartInstance: any;
  updateParams: any = {};
  epy: number[] = [];
  years: number[] = [];
  options = {
    grid: {
      bottom: 12,
      top: 12,
      containLabel: true
    },

   
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
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

  updateOptions: any = {};
  update() {
    // console.log("updating elections data", this.datasourceService.dataSource.filteredData);

    if (this.utils != undefined) {
      var start = this.utils.getEarliestFilteredYear(this.datasourceService.dataSource.filteredData);
      var end = this.utils.getLatestFilteredYear(this.datasourceService.dataSource.filteredData);
      var yearRange = end - start;
      this.years = [];
      for (var i = start; i <= end; i++) {
        this.years.push(i);
      }
      this.epy = this.getContestedElectionsPerYear(start, end, this.datasourceService.dataSource.filteredData);

      var neys = this.getNonEmptyYears(this.utils.start, this.utils.end, this.datasourceService.dataSource.filteredData);
      //console.log("updateParams",updateParams);
      //  console.log("updating graph",this.years,this.getContestedElectionsPerYear(this.utils.start,this.utils.end,this.datasourceService.dataSource.filteredData));
      if (this.chartInstance != undefined) this.chartInstance.clear();
      if (this.updateParams.type == "showCountyBorough") {


        //  console.log("updatin showCountyBorough")
        this.updateOptions = {
          grid: {

            top: 42

          },
          // title: {
          //   text: this.updateParams.title,
          //   subtext: '',
          //   x: 'left',
          //   textStyle: {
          //     fontSize: 12,
          //     lineHeight: 12,
          //   }
          // },
          tooltip: {
            trigger: 'axis'
          },
          visualMap: {
            show: false,
            dimension: 0,
            pieces: [{
              gt: 0,
              lte: 141,
              color: 'rgba(251, 191, 36,1)'
            }]
          },
          legend: {
            data: ['counties', 'boroughs']
          },
          xAxis: {
            type: 'category',
            data: neys,
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: "counties",
            lineStyle: { color: '#673ab7' },
            data: this.utils.getContestedElectionsPerNoneEmptyYearCB("C", neys, this.datasourceService.dataSource.filteredData),
            type: 'line'
          }, {
            name: "boroughs",
            lineStyle: { color: "rgba(251, 191, 36,1)" },
            data: this.utils.getContestedElectionsPerNoneEmptyYearCB("B", neys, this.datasourceService.dataSource.filteredData),
            type: 'line'
          }],


        }
        // console.log(" option ",this.updateOptions);
      } else if (this.updateParams.type == "showLargeConstituencies") {
        //  console.log("showLargeConstituencies");
        //  this.chartInstance.clear();
        this.updateOptions = {
          grid: {

            top: 42

          },
          //  title: {
          //    text: this.updateParams.title,
          //    x: 'left',
          //    subtext: '',

          //    textStyle: {
          //      fontSize: 12,
          //      lineHeight: 12,
          //    }
          //  },
          tooltip: {
            trigger: 'axis'
          },
          visualMap: {
            show: false,
            dimension: 0,
            pieces: [{
              gt: 0,
              lte: 141,
              color: 'rgba(251, 191, 36,1)'
            }]
          },

          xAxis: {
            type: 'category',
            data: neys,
          },
          yAxis: {
            type: 'value'
          },
          legend: {
            data: ['all constituencies', 'large constituencies']
        },
          series: [{
            name: "all constituencies",
            lineStyle: { color: '#673ab7' },

            data: this.utils.getContestedElectionsPerNoneEmptyYear(neys, this.datasourceService.dataSource.filteredData),
            type: 'line'
          },

          {
            name: "large constituencies",
            lineStyle: { color: 'rgba(251, 191, 36,1)' },

            data: this.utils.getContestedElectionsPerNoneEmptyYearLargeConstituencies(neys, this.datasourceService.dataSource.filteredData),
            type: 'line'
          }],


        }
      }
      else {
        //  console.log("not showing county boroguh");
        //  this.chartInstance.clear();
        this.updateOptions = {
          grid: {

            top: 42

          },
          //  title: {
          //    text: this.updateParams.title,
          //    x: 'left',
          //    subtext: '',

          //    textStyle: {
          //      fontSize: 12,
          //      lineHeight: 12,
          //    }
          //  },
          tooltip: {
            trigger: 'axis'
          },
          visualMap: {
            show: false,
            dimension: 0,
            pieces: [{
              gt: 0,
              lte: 141,
              color: 'rgba(251, 191, 36,1)'
            }]
          },

          xAxis: {
            type: 'category',
            data: neys,
          },
          yAxis: {
            type: 'value'
          },
          series: [{

            data: this.utils.getContestedElectionsPerNoneEmptyYear(neys, this.datasourceService.dataSource.filteredData),
            type: 'line'
          }],


        }
      }



    }
    this.ref.detectChanges();
  }
  getNonEmptyYears(startYear, endYear, data) {
    let ney: number[] = [];
    // for(var i=startYear;i<=endYear;i++){

    //   ney.push(0);
    // }
    data.forEach(element => {
      //   var index = element.election_year -startYear;
      if (element.election_year >= startYear && element.election_year <= endYear && ney.indexOf(element.election_year) == -1) ney.push(element.election_year)
    });
    return ney;
  }

  getContestedElectionsPerYear(startYear, endYear, data) {

    let epy: number[] = [];
    for (var i = startYear; i <= endYear; i++) {

      epy.push(0);
    }
    data.forEach(element => {
      var index = element.election_year - startYear;
      if (element.contested == "Y") epy[index]++;
    });
    return epy;
  }
  // getContestedElectionsPerNoneEmptyYear(neys, data){

  //   let epy :number []= [];
  //   let cpy: number [] = [];
  //   neys.forEach(element => {
  //     epy.push(0);
  //     cpy.push(0);
  //   });


  //   data.forEach(element => {
  //     if(neys.indexOf(element.election_year)!=-1 && element.contested=="Y"){
  //       cpy [neys.indexOf(element.election_year)]++;
  //     }
  //     if(neys.indexOf(element.election_year)!=-1 ){
  //       epy [neys.indexOf(element.election_year)]++;
  //     }

  //   });
  //   for(var i=0;i<epy.length;i++){
  //     if(epy[i]>0) cpy[i] = (cpy[i]/epy[i]) *100;
  //   }

  //   return cpy;
  // }
  // getContestedElectionsPerNoneEmptyYearCB(cb, neys, data){

  //   let epy :number []= [];
  //   let cpy: number [] = [];
  //   neys.forEach(element => {
  //     epy.push(0);
  //     cpy.push(0);
  //   });


  //   data.forEach(element => {
  //     if(neys.indexOf(element.election_year)!=-1 && element.contested=="Y" && element.countyboroughuniv==cb){
  //       cpy [neys.indexOf(element.election_year)]++;
  //     }
  //     if(neys.indexOf(element.election_year)!=-1 && element.countyboroughuniv==cb ){
  //       epy [neys.indexOf(element.election_year)]++;
  //     }

  //   });
  //   for(var i=0;i<epy.length;i++){
  //     if(epy[i]>0) cpy[i] = (cpy[i]/epy[i]) *100;
  //   }

  //   return cpy;
  // }
  // getContestedElectionsPerYearCB(startYear, endYear, cb, data){

  //   let epy :number []= [];
  //   for(var i=startYear;i<=endYear;i++){

  //     epy.push(0);
  //   }
  //   data.forEach(element => {
  //     var index = element.election_year -startYear;
  //     if(element.contested=="Y" && element.countyboroughuniv   ==cb) epy[index]++;
  //   });
  //   return epy;
  // }
  // getContestedElectionsBoroughsPerYear(startYear, endYear, data){

  //   let epy :number []= [];
  //   for(var i=startYear;i<=endYear;i++){

  //     epy.push(0);
  //   }
  //   data.forEach(element => {
  //     var index = element.election_year -startYear;
  //     if(element.contested=="Y" && element.cbu=="B") epy[index]++;
  //   });
  //   return epy;
  // }
  // getContestedElectionsCountiesPerYear(startYear, endYear, data){

  //   let epy :number []= [];
  //   for(var i=startYear;i<=endYear;i++){

  //     epy.push(0);
  //   }
  //   data.forEach(element => {
  //     var index = element.election_year -startYear;
  //     if(element.contested=="Y" && element.cbu=="C") epy[index]++;
  //   });
  //   return epy;
  // }ngAfterViewInit
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.updateParams = { type: "", title: "% Contested  Elections Per Year" };
    this.utils = new ContestedUtils(this.datasourceService);
    this.datasourceService.ready.subscribe(value => { this.gotData(value) });
    this.subscription = this.dataStoryService.getMessage().subscribe(message => {
   //   console.log("got message", message);
      if (message.text == "showCountyBorough") {

        this.updateParams = { type: "showCountyBorough", title: "% Contested General Elections Per Year" };
        this.update();
      }

      else if (message.text == "showLargeConstituencies") {
        this.updateParams = { type: "showLargeConstituencies", title: "% Contested Elections Per Year for Large Constituencies" };
        // this.update();

      }
      else if (message.text == "general") {
        this.updateParams = { type: "", title: "% Contested General Elections Per Year" };

      }
      else if (message.text == "all") {
        this.updateParams = { type: "", title: "% Contested  Elections Per Year" };
      }


    });
  }
  gotData(value) {
    this.datasourceService.dataSource.connect().pipe(
      map(val => {
        return val      //Returning Value
      })
    )
      .subscribe(ret => {
        //console.log('Recd from map : ' + ret[0].election_year      );
        //
        if (this.chartInstance != undefined) this.update();

      })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.myValueSub) {
      this.myValueSub.unsubscribe();
    }
    if (this.chartInstance) {
      this.chartInstance.dispose();
      this.chartInstance = null;
    }
  }

  onChartInit(e: any) {
    this.chartInstance = e;
    console.log('on chart init:', this.chartInstance);
  }

}
