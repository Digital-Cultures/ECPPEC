import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
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
  years: number[] = [];
  updateOptions: any;
  updateElectionOptions: any;
  updatePieOptions: any;
  constructor(private datasourceService: DatasourceService) { }
  chartOptions = {
    visualMap: [{
      show: false,
      type: 'continuous',
      seriesIndex: 0,
      min: 0,
      max: 1
  }],
    grid:{
      bottom:12,
      top:12
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
  electionOptions = {
    grid:{
      bottom:12,
      top:12
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
        this.years.push(i);
        }
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
    // console.log("after",this.datasourceService.dataSource.filteredData);
    
      this.updateOptions = {
        series: [{
          data: this.getNormalisedContestedPerYear(this.years)
        }]
      }
    
   
      // this.updateOptions = {
      //   series: [{
      //     data: this.getContestedPerYear(this.years)
      //   }]
      // }
    
    this.updateElectionOptions = {
      series: [{
        data: this.getElectionsPerYear(this.years)
      }]
    }
  

    
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
}
