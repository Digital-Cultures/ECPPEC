import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';

import * as echarts from 'echarts';
import { DatasourceService } from '../datasource.service';
import { TableComponent} from '../table/table.component';

@Component({
  selector: 'app-contested-story',
  templateUrl: './contested-story.component.html',
  styleUrls: ['./contested-story.component.scss']
})
export class ContestedStoryComponent implements OnInit {
  // chartOptions: any = {};
  // pieOptions: any = {};
  normalise: boolean = true;
  


  electionsPerYear: any[] = [];
  theme:string = "macarons";
  chartInstance: any;
  seriesData: any[] = [] ;
  allElectionsSeriesData: any[] = [] ;
  //years: number[] = [];
  start: number = 1695;
  end: number = 1835;
  years: number[]  =[];

  updateOptions: any;
  updateElectionOptions: any;
  updateNorthSouthOptions: any;
  updatePieOptions: any;
  constructor(private datasourceService: DatasourceService) { }

  data: any [] = [
    [[28604,77,17096869,'Australia',1990],[31163,77.4,27662440,'Canada',1990],[1516,68,1154605773,'China',1990],[13670,74.7,10582082,'Cuba',1990],[28599,75,4986705,'Finland',1990],[29476,77.1,56943299,'France',1990],[31476,75.4,78958237,'Germany',1990],[28666,78.1,254830,'Iceland',1990],[1777,57.7,870601776,'India',1990],[29550,79.1,122249285,'Japan',1990],[2076,67.9,20194354,'North Korea',1990],[12087,72,42972254,'South Korea',1990],[24021,75.4,3397534,'New Zealand',1990],[43296,76.8,4240375,'Norway',1990],[10088,70.8,38195258,'Poland',1990],[19349,69.6,147568552,'Russia',1990],[10670,67.3,53994605,'Turkey',1990],[26424,75.7,57110117,'United Kingdom',1990],[37062,75.4,252847810,'United States',1990]],
    [[44056,81.8,23968973,'Australia',2015],[43294,81.7,35939927,'Canada',2015],[13334,76.9,1376048943,'China',2015],[21291,78.5,11389562,'Cuba',2015],[38923,80.8,5503457,'Finland',2015],[37599,81.9,64395345,'France',2015],[44053,81.1,80688545,'Germany',2015],[42182,82.8,329425,'Iceland',2015],[5903,66.8,1311050527,'India',2015],[36162,83.5,126573481,'Japan',2015],[1390,71.4,25155317,'North Korea',2015],[34644,80.7,50293439,'South Korea',2015],[34186,80.6,4528526,'New Zealand',2015],[64304,81.6,5210967,'Norway',2015],[24787,77.3,38611794,'Poland',2015],[23038,73.13,143456918,'Russia',2015],[19360,76.5,78665830,'Turkey',2015],[38225,81.4,64715810,'United Kingdom',2015],[53354,79.1,321773631,'United States',2015]]
];

optioni = {
  
  grid:{
    bottom:12,
    top:12,
    containLabel: true
  },
  title: {
    text: 'All elections s by year',
    subtext: '',
    x: 'center',
    textStyle: {
      fontSize: 12,
      lineHeight: 12,
    }
  },
  xAxis: {
      splitLine: {
          lineStyle: {
              type: 'dashed'
          }
      }
  },
  yAxis: {
      splitLine: {
          lineStyle: {
              type: 'dashed'
          }
      },
      scale: true
  },
  series: [{
      name: '2015',
      data: this.data[1],
      type: 'scatter',
      symbolSize: function (data) {
          return Math.random()*20; Math.sqrt(data[2]) / 5e2;
      },
      emphasis: {
          focus: 'series',
          label: {
              show: true,
              formatter: function (param) {
                  return param.data[3];
              },
              position: 'top'
          }
      },

  }]
};
  contestedOptions = {
    visualMap: [{
      show: false,
      type: 'continuous',
      seriesIndex: 0,
      min: 0,
      max: 1
  }],
    grid:{
      bottom:12,
      top:12,
      containLabel: true
    },
    title: {
      text: '% contested elections by year',
      subtext: '',
      x: 'center',
      textStyle: {
        fontSize: 12,
        lineHeight: 12,
      },
      
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
        showSymbol: false,
        type: 'line'
      },
    ],
  };
  electionOptions = {
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
    },
    series: [
      {
        data: this.seriesData,
        type: 'line',
      },
    ],
  };
  northSouthOptions = {
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
    series: [
      {
        data: this.seriesData,
        showSymbol: false,
        type: 'scatter'
      },
    ],
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
   
    },
    yAxis: {
   
    },
    symbolSize: 2
  , emphasis: {
    focus: 'series',
    label: {
        show: true,
        formatter: function (param) {
            return param.data[1];
        },
        position: 'top'
    }
},
itemStyle: {
    shadowBlur: 10,
    shadowColor: 'rgba(120, 36, 50, 0.5)',
    shadowOffsetY: 5
    
}
  };

  pieOptions = {
    title: {
      text: 'Franchise type',
      subtext: '',
      x: 'center',
      textStyle: {
        fontSize: 12,
        lineHeight: 12,
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      x: 'center',
      y: 'bottom',
      data: []
    },
    calculable: true,
    series: [
      {
        name: 'area',
        type: 'pie',
        radius: [30, 110],
        roseType: 'area',
        data: [ ]
      }
    ]
  };
  ngOnInit(): void {
   for(var i=1695;i<1835;i++){
     this.years.push(i);
   }
    this.datasourceService.ready.subscribe(value => {this.gotData(value)});
  }

numberMap (val, in_min, in_max, out_min, out_max) {
return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
getContestedPerYear(years){
  var cpy = [];
  
  this.years.forEach(element => {
    cpy.push(0);
  });
  for(var i=0;i<this.datasourceService.dataSource.filteredData.length;i++){
    var index = parseInt(this.datasourceService.dataSource.filteredData[i].election_year)-this.datasourceService.electionsMeta.earliest_year;
    if(this.datasourceService.dataSource.filteredData[i].contested=='Y'){
      cpy[index]++;
    }
    
  }
  return cpy;
}
getPercentageContestedPerElectionVLat(){
  var elections = [];
  var numElections = [];
  var numContestedElections = [];
  var percentageContestedElections = [];
  this.datasourceService.dataSource.filteredData.forEach(element => {
    var constituency  = element.constituency;
    if(elections.indexOf(element.constituency)==-1){
      elections.push(element.constituency);
      numElections[element.constituency]=0;
      numContestedElections[element.constituency]=0;
      var arr = [0.0,0.0,0.0,element.constituency];
      percentageContestedElections[element.constituency]=arr;
    }
  });
  this.datasourceService.dataSource.filteredData.forEach(element => {
    numElections[element.constituency]+=1.0;
    if(element.contested=='Y'){
      numContestedElections[element.constituency]+=1.0;
    }
  //  console.log("whats wrong with these numbers ", numElections[element.constituency],  numContestedElections[element.constituency]);
    percentageContestedElections[element.constituency] [0]= element.lng;
    percentageContestedElections[element.constituency] [1]= element.lat;
    percentageContestedElections[element.constituency] [2] = (parseFloat(numContestedElections[element.constituency]) / parseFloat(numElections[element.constituency])) *100.0;

    percentageContestedElections[element.constituency] [3]= element.constituency;
  });
  var contVLat = [];
  // percentageContestedElections.forEach(element => {
    
  //   var arr = [element[0],element[1]];
  //   contVLat.push(arr);
  // });
  for (const property in percentageContestedElections) {
    if(percentageContestedElections[property][1] >1){
      contVLat.push([percentageContestedElections[property][0],percentageContestedElections[property][1],percentageContestedElections[property][2], property ] )
    }
   
  }
  return contVLat;
}

getStartEndYears(){
  var startYear = this.datasourceService.electionsMeta.earliest_year;
  var endYear = this.datasourceService.electionsMeta.latest_year ;
  if(this.datasourceService.yearFilter.value!=null){
    if(this.datasourceService.yearFilter.value.indexOf("-")==-1) {
      startYear = parseInt(this.datasourceService.yearFilter.value);
      endYear = parseInt(this.datasourceService.yearFilter.value);
    }
    else{
      var exploded = this.datasourceService.yearFilter.value.split("-");
      if (exploded.length == 2){
        startYear = parseInt(exploded[0].trim());
        endYear = parseInt(exploded[1].trim());
      }
    }
  }
  return { startYear: startYear, endYear: endYear}
}
getNormalisedContestedPerYear(years){
  
  var startYear = this.datasourceService.electionsMeta.earliest_year;
  var endYear = this.datasourceService.electionsMeta.latest_year ;
  var startEndYears = this.getStartEndYears();
  startYear = startEndYears.startYear;
  endYear = startEndYears.endYear;
 

  var cpy = [];
  var epy = [];
  this.years.forEach(element => {
  cpy.push(0);
  epy.push(0);

  });
  for(var i=0;i<this.datasourceService.dataSource.filteredData.length;i++){
    var index = parseInt(this.datasourceService.dataSource.filteredData[i].election_year)-this.datasourceService.electionsMeta.earliest_year;
   
    if(this.datasourceService.dataSource.filteredData[i].contested=='Y'){
      cpy[index]++;
    }
    epy[index]++;
  }
  
  var nor = [];
  var i=0;
  cpy.forEach(element => {
    nor.push( element / epy[i] );
    i++;
  });

  var startIndex = startYear-this.datasourceService.electionsMeta.earliest_year;
  var yearRange = endYear- startYear;
  var endIndex = startIndex + yearRange
  var sp = [];//nor.splice(startIndex, endIndex);

  for(var i=startIndex;i<=endIndex ;i++){
    sp.push(nor[i]*100);
  }
  // console.log("spliced","length",sp.length,"yearRange", yearRange, "startYear", startYear, "endYear",endYear, "strartIndex",startIndex, "endIndex",endIndex);
  return sp;
}
topAndTail(array){
  var arr;
  array.forEach(element => {
  //  if(element>0)
  });
}

getElectionsPerYear(years){
  var startYear = this.datasourceService.electionsMeta.earliest_year;
  var endYear = this.datasourceService.electionsMeta.latest_year ;
  var startEndYears = this.getStartEndYears();
  startYear = startEndYears.startYear;
  endYear = startEndYears.endYear;
  var cpy = [];
  this.years.forEach(element => {
    cpy.push(0);
  });
  for(var i=0;i<this.datasourceService.dataSource.filteredData.length;i++){
    var index = parseInt(this.datasourceService.dataSource.filteredData[i].election_year)-this.datasourceService.electionsMeta.earliest_year;
    cpy[index]++;
  }
  
  var startIndex = startYear-this.datasourceService.electionsMeta.earliest_year;
  var yearRange = endYear- startYear;
  var endIndex = startIndex + yearRange
  var sp = [];//nor.splice(startIndex, endIndex);

  for(var i=startIndex;i<=endIndex ;i++){
    sp.push(cpy[i]);
  }
  // console.log("spliced","length",sp.length,"yearRange", yearRange, "startYear", startYear, "endYear",endYear, "strartIndex",startIndex, "endIndex",endIndex);
  return sp;
}
getMax(arr){
  var max = 0;
  arr.forEach(element => {
    if(element>max) max = element;
  });
  return max;
}
getMin(arr){
  var min = 11111110;
  arr.forEach(element => {
    if(element<min) min = element;
  });
  return min;
}




gotData(value) {
    if(value){
      this.datasourceService.dataUpdate.subscribe(() => this.onDataSubscriptionChange()
      );
      for(var i=this.datasourceService.electionsMeta.earliest_year;i<this.datasourceService.electionsMeta.latest_year;i++){
        //this.years.push(i);
        }
        console.log("years ", this.years);
        if(this.normalise){
          
        }
        else{
          
        }
        this.seriesData = this.getNormalisedContestedPerYear(this.years);
        this.allElectionsSeriesData = this.getElectionsPerYear(this.years);
        this.updateOptions = {
          series: [{
            data: this.seriesData
          }]
        }
    }
  }
  // updateOptions(){

  // }
  // updatePieOptions(){

  // }
  onChartInit(e: any) {
    this.chartInstance = e;
    
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
    var startYear = this.datasourceService.electionsMeta.earliest_year;
    var endYear = this.datasourceService.electionsMeta.latest_year ;
    var startEndYears = this.getStartEndYears();
    startYear = startEndYears.startYear;
    endYear = startEndYears.endYear;

    var yearRange = [];
    for(var i=startYear;i<=endYear;i++){
      yearRange.push(i);
    }

      this.updateOptions = {
        series: [{
          data: this.getNormalisedContestedPerYear(this.years)
        }],
        xAxis: {
          type: 'category',
          data: yearRange,
        }
      }
    
   
      // this.updateOptions = {
      //   series: [{
      //     data: this.getContestedPerYear(this.years)
      //   }]
      // }
    
    this.updateElectionOptions = {
      series: [{
        data: this.getElectionsPerYear(this.years)
      }],
      xAxis: {
        type: 'category',
        data: yearRange,
      }
    }
    var nsData = this.getPercentageContestedPerElectionVLat();
    this.updateNorthSouthOptions = {
      
  grid:{
    bottom:12,
    top:12,
    containLabel: true
  },
  title: {
    text: 'percentage of contested elections per location',
    subtext: '',
    x: 'center',
    textStyle: {
      fontSize: 12,
      lineHeight: 12,
    }
  },
  xAxis: {
      splitLine: {
          lineStyle: {
              type: 'dashed'
          }
      },
      scale: true
  },
  yAxis: {
      splitLine: {
          lineStyle: {
              type: 'dashed'
          }
      },
      scale: true
  },
      series: [{
        
          data: nsData,
          type: 'scatter',
          symbolSize: function (data) {
              return 3*Math.sqrt(data[2]);
          },
          itemStyle: {
            color: '#0db9f0'
          },
          emphasis: {
              focus: 'series',
              label: {
                  show: true,
                  formatter: function (param) {
                    var p = param.data[2].toString();
                    var sp = p.split(".");
                    return param.data[3] + " "+ sp[0] +"% contested";
              
                  },
                  position: 'top'
              }
          },
    
      }]
    };
 //console.log("updateNorthSouthOptions",this.updateNorthSouthOptions);

    
    var names = [];
    var franchiseData = this.getFranchiseData();
  
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
  formatLabel(name,percent){
    console.log(name,percent);
    var p = percent.toString();
    var sp = p.split(".");
    return name + " "+ sp[0] +"% contested";

  }
}
