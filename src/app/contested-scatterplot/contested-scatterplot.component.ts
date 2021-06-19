
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit,AfterViewInit , OnDestroy } from '@angular/core';
import { getNamedType } from 'graphql';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContestedUtils } from '../contested-utils';
import { DataStoryService } from '../data-story.service';
import { DatasourceService } from '../datasource.service';

@Component({
  selector: 'app-contested-scatterplot',
  templateUrl: './contested-scatterplot.component.html',
  styleUrls: ['./contested-scatterplot.component.scss']
})


export class ContestedScatterplotComponent implements OnInit {

  constructor(private datasourceService: DatasourceService,private ref: ChangeDetectorRef,private dataStoryService: DataStoryService) { }
  subscription: Subscription;
  utils: ContestedUtils;
  seriesData: any[] = [] ;
  chartInstance: any;
  updateParams: any = {};
  epy: number []=[];
  years: number [] = [];
   myValueSub: Subscription;
  options = {
    
};
updateOptions: any = {};
ngOnInit(): void {
}
ngOnDestroy(){
  if(this.subscription) this.subscription.unsubscribe();
  if(this.chartInstance) { 
    this.chartInstance.dispose();
    this.chartInstance = null;
  }
  if (this.myValueSub) {
    this.myValueSub.unsubscribe();
  }

}
ngAfterViewInit(): void {
    this.utils = new ContestedUtils(this.datasourceService);
    this.datasourceService.getData();

    this.datasourceService.ready.subscribe(value => { this.gotData(value) });
    this.subscription = this.dataStoryService.getMessage().subscribe(message => {
      console.log("got message", message);
      if (message.text == "scatter") {
        this.update({});
      }
    });

  }
  update(updateOptions) {
    //  console.log("updating elections data", this.datasourceService.dataSource.filteredData);
  //  this.chartInstance.clear();
    if (this.utils != undefined) {
      //var start = this.utils.getEarliestFilteredYear(this.datasourceService.dataSource.filteredData);
      //var end = this.utils.getLatestFilteredYear(this.datasourceService.dataSource.filteredData);
   
    //  var neys = this.utils.getNonEmptyYears(this.utils.start, this.utils.end, this.datasourceService.dataSource.filteredData);

   //   var franchiseData = this.utils.getProportionContestedFranchiseData(this.datasourceService.dataSource.filteredData);
      
      // console.log("update scatter");
        var colorIndexStart = updateOptions.highLightStart - this.utils.start;
        var colorIndexEnd = updateOptions.highLightEnd - this.utils.start;
        var colorPalette = ['#7fc97f','#673ab7','#fdc086','rgba(251, 191, 36,1)','#386cb0','#f0027f','#bf5b17','black','pink'];
        var data = this.utils.getNumberElectionsAndContestedPerConstituency(this.datasourceService.dataSource.filteredData);
        var franchiseNames = ["Freeman","Freeholder","Burgage","Scot and Lot","Corporation","Householder","Disputed",""];
       
      //  console.log("franchiseNames",franchiseNames);
        var pieces = [];
        for (var i = 0; i < franchiseNames.length; i++) {
            pieces.push({
                value: i,
                label: franchiseNames[i],
                color: colorPalette[i]
            });
        }
     //   console.log("pieces",pieces);
        this.updateOptions = {
        //   legend: {
        //     type: 'scroll',
        //     orient: 'vertical',
        //     right: 10,
        //     top: 20,
        //     bottom: 20,
        //     data: pieces
    
           
        // },
          // title: {
          //   text: "proportion of contested elections against number of elections contested",
          //   x: 'left',
          //   subtext: '',
            
          //   textStyle: {
          //     fontSize: 12,
          //     lineHeight: 12,
          //   }
          // },
    
          tooltip: {
            trigger: "item",
            formatter: function (params) { return params.data[2]+ " ("+params.data[3] +") had "+params.data[0]+" elections<br>of which "+Math.floor(params.data[1])+"% were contested"}
          },
          xAxis: {
            min:30,
            max:72
          },
          yAxis: {},
          
          // toolbox: {
          //     show: true,
          //     feature: {
          //         mark: {show: true},
          //         dataView: {show: true, readOnly: false},
          //         restore: {show: true},
          //         saveAsImage: {show: true}
          //     }
          // },
          // visualMap : {
          //   show: false,
          //   dimension: 0,
          //   pieces: [{
          //       gt: 49,
          //       lte: 51,
          //       color: 'rgba(251, 191, 36,1)'
          //   }]
          // },
          series: [
            {
              type: 'effectScatter',
              symbolSize: 20,
              data: data['York']
          },
            
            
              {
                
                  
                  type: 'scatter',
                 
                 
                  data: data,
                  itemStyle: {
                    opacity:function(param ){return 0.1},
                    color: function(param) {
                      // Write your logic.
                      // for example: in case your data is structured as an array of arrays, you can paint it red if the first value is lower than 10:
                      // if (param.data[0] < 50)  {return 'red' }else{return 'blue'}
                      return colorPalette[franchiseNames.indexOf(param.data[3].trim())]
                     
                    }
                  }
              }
          ]
      };
      //}
    }
  }
  getName(){

  }
  gotData(value) {
    this.datasourceService.dataSource.connect().pipe(
      map(val => {
        return val      //Returning Value
      })
    )
      .subscribe(ret => {
   
        if (this.chartInstance != undefined) this.update("");

      })
  }
  onChartInit(e: any) {
    this.chartInstance = e;

  }

}
