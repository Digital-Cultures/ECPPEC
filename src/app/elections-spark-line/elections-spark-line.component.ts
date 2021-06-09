import { Component, OnInit , OnDestroy, ApplicationRef, ChangeDetectionStrategy, NgZone, ChangeDetectorRef} from '@angular/core';
import { map } from 'rxjs/operators';
import { DatasourceService } from '../datasource.service';
import {ContestedUtils} from '../contested-utils';
import { DataStoryService} from '../data-story.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-elections-spark-line',
  templateUrl: './elections-spark-line.component.html',
  styleUrls: ['./elections-spark-line.component.scss']
})
export class ElectionsSparkLineComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  constructor(private datasourceService: DatasourceService,private ref: ChangeDetectorRef,private dataStoryService: DataStoryService) { 
    
  }
  utils: ContestedUtils;
  seriesData: any[] = [] ;
  chartInstance: any;
  epy: number []=[];
  years: number [] = [];
  options = {
    grid:{
      bottom:12,
      top:12,
      containLabel: true
    },
    title: {
      text: 'All elections by year',
      subtext: '',
      x: 'center',
      textStyle: {
        fontSize: 12,
        lineHeight: 12,
      }
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
      min:0,
      max:600
    },
    
    series: [
      {
        data: this.seriesData,
        type: 'line',
      },
    ],
  };
  updateOptions:any = {};
  ngOnInit(): void {
    this.utils= new ContestedUtils(this.datasourceService);
    this.datasourceService.ready.subscribe(value => {this.gotData(value)});
    this.testFunction();
    this.subscription = this.dataStoryService.getMessage().subscribe(message => {
     // console.log("got message", message);
      if(message.text=="visualMap1"){
        
        this.update({type:"visualMap",highLightStart:1695,highLightEnd:1715});
      }else if(message.text=="visualMap2"){
        
        this.update({type:"visualMap",highLightStart:1715,highLightEnd:1780});
      }
      else if(message.text=="visualMap3"){
        
        this.update({type:"visualMap",highLightStart:1780,highLightEnd:1835});
      }
      else if(message.text=="stayTall"){
        
        this.update({type:"stayTall"});
      }
      
      
      // if (message) {
      //   console.log("from data story service", message);
      //   if(message.text=="separate sections"){
      //     console.log("separating sections")
      //     //this.update("visualMap");
      //   }
      //   }
      // } else {
      //   // clear messages when empty message received
        
      // }
    });
   

   
  }
  onChartInit(e: any) {
    this.chartInstance = e;
    
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  testFunction(){

  }
  update(updateOptions){
  //  console.log("updating elections data", this.datasourceService.dataSource.filteredData);
   this.chartInstance.clear();
    if(this.utils!=undefined){
      var start =this.utils.getEarliestFilteredYear(this.datasourceService.dataSource.filteredData);
      var start =this.utils.getEarliestFilteredYear(this.datasourceService.dataSource.filteredData);
       var end = this.utils.getLatestFilteredYear(this.datasourceService.dataSource.filteredData);
       var yearRange = end-start;
       this.years = [];
       for(var i=start;i<=end;i++){
         this.years.push(i);
       }
      // this.epy = this.getContestedElectionsPerYear(start,end,this.datasourceService.dataSource.filteredData);
 
       var neys = this.utils.getNonEmptyYears(this.utils.start,this.utils.end,this.datasourceService.dataSource.filteredData);
      // var leastSquares=[];
      // leastSquares = this.findLineByLeastSquares(this.years, this.epy);
      //
      
   //   console.log("neys",neys);
      if(updateOptions.type=="visualMap"){
        var colorIndexStart =updateOptions.highLightStart-this.utils.start;
        var colorIndexEnd =updateOptions.highLightEnd-this.utils.start;
   //     console.log("updating visualmap",colorIndexStart,colorIndexEnd);
        this.updateOptions = {

          visualMap : {
            show: false,
            dimension: 0,
            pieces: [{
                gt: 0,
                lte: colorIndexStart,
                color: 'rgba(251, 191, 36,1)'
            }, {
                gt: colorIndexStart,
                lte: colorIndexEnd,
                color: '#673ab7'
            },
            {
              gt: colorIndexEnd,
              lte: this.utils.end,
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
           
            data: this.utils.getElectionsPerNoneEmptyYear(neys,this.datasourceService.dataSource.filteredData),
            type:'line'
          }],
        
        
        }
      }
    else if(updateOptions.type=="stayTall"){
     // console.log("Stay tall");
      this.updateOptions = {
        
      visualMap : {
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
          type: 'value',
          min:0,
          max:600
      },
        series: [{
         
          data: this.utils.getElectionsPerNoneEmptyYear(neys,this.datasourceService.dataSource.filteredData),
          type:'line'
        }],
      
      
      }

    }
else{
    this.updateOptions = {

      visualMap : {
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
        // lineStyle: {color: '#673ab7'},
        data: this.utils.getElectionsPerNoneEmptyYear(neys,this.datasourceService.dataSource.filteredData),
        type:'line'
      }],
    
    
    }
  }
    
    
  }
  this.ref.detectChanges();
  }
  // getElectionsPerNoneEmptyYear(neys, data){
  //   //console.log("get per none empty")
   
  //   let epy :number []= [];
  //   neys.forEach(element => {
  //     epy.push(0);
     
      
  //   });


  //   data.forEach(element => {
     
  //     if(neys.indexOf(element.election_year)!=-1 ){
  //       epy [neys.indexOf(element.election_year)]++;
  //     }
      
  //   });
  //   //console.log("epy",epy);
    
  //   return epy;
  // }
  // getNonEmptyYears(startYear, endYear, data){
  //   let ney :number []= [];
  //   // for(var i=startYear;i<=endYear;i++){
    
  //   //   ney.push(0);
  //   // }
  //   data.forEach(element => {
  //  //   var index = element.election_year -startYear;
  //     if(element.election_year>=startYear && element.election_year <=endYear && ney.indexOf(element.election_year)==-1) ney.push(element.election_year)
  //   });
  //   return ney;
  //  }
   
  
  // getElectionsPerYearNew(startYear, endYear, data){
   
  //   let epy :number []= [];
  //   for(var i=startYear;i<=endYear;i++){
    
  //     epy.push(0);
  //   }
  //   data.forEach(element => {
  //     var index = element.election_year -startYear;
  //     epy[index]++;
  //   });
  //   return epy;
  // }
  ///https://dracoblue.net/dev/linear-least-squares-in-javascript/
  findLineByLeastSquares(values_x, values_y) {
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_xx = 0;
    var count = 0;

    /*
     * We'll use those variables for faster read/write access.
     */
    var x = 0;
    var y = 0;
    var values_length = values_x.length;

    if (values_length != values_y.length) {
        throw new Error('The parameters values_x and values_y need to have same size!');
    }

    /*
     * Nothing to do.
     */
    if (values_length === 0) {
        return [ [], [] ];
    }

    /*
     * Calculate the sum for each of the parts necessary.
     */
    for (var v = 0; v < values_length; v++) {
        x = values_x[v];
        y = values_y[v];
        sum_x += x;
        sum_y += y;
        sum_xx += x*x;
        sum_xy += x*y;
        count++;
    }

    /*
     * Calculate m and b for the formular:
     * y = x * m + b
     */
    var m = (count*sum_xy - sum_x*sum_y) / (count*sum_xx - sum_x*sum_x);
    var b = (sum_y/count) - (m*sum_x)/count;

    /*
     * We will make the x and y result line now
     */
    var result_values_x = [];
    var result_values_y = [];

    for (var v = 0; v < values_length; v++) {
        x = values_x[v];
        y = x * m + b;
        result_values_x.push(x);
        result_values_y.push(y);
    }

    return [result_values_x, result_values_y];
}
 polyNomialRegression(){
  
}
  gotData(value){
    this.datasourceService.dataSource.connect().pipe(
      map(val => {
        return val      //Returning Value
      })
      )
      .subscribe(ret=> {
        //console.log('Recd from map : ' + ret[0].election_year      );
        if(this.chartInstance!=undefined)this.update("");
      
      })
  }
}
