import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit,AfterViewInit , OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContestedUtils } from '../contested-utils';
import { DataStoryService } from '../data-story.service';
import { DatasourceService } from '../datasource.service';

@Component({
  selector: 'app-contested-rose',
  templateUrl: './contested-rose.component.html',
  styleUrls: ['./contested-rose.component.scss']
})
export class ContestedRoseComponent implements OnInit {

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
  this.subscription.unsubscribe();
  if (this.myValueSub) {
    this.myValueSub.unsubscribe();
  }
  if(this.chartInstance) { 
    this.chartInstance.dispose();
    this.chartInstance = null;
  }

}
ngAfterViewInit(): void {
    this.utils = new ContestedUtils(this.datasourceService);
    this.datasourceService.getData();

    this.datasourceService.ready.subscribe(value => { this.gotData(value) });
    

  }
  update(updateOptions) {
    //  console.log("updating elections data", this.datasourceService.dataSource.filteredData);
  //  this.chartInstance.clear();
    if (this.utils != undefined) {
      var start = this.utils.getEarliestFilteredYear(this.datasourceService.dataSource.filteredData);
      var end = this.utils.getLatestFilteredYear(this.datasourceService.dataSource.filteredData);
   
      var neys = this.utils.getNonEmptyYears(this.utils.start, this.utils.end, this.datasourceService.dataSource.filteredData);

      var franchiseData = this.utils.getProportionContestedFranchiseDataWODisputed(this.datasourceService.dataSource.filteredData);
      
        
        var colorIndexStart = updateOptions.highLightStart - this.utils.start;
        var colorIndexEnd = updateOptions.highLightEnd - this.utils.start;
        var colorPalette = ['#7fc97f','#673ab7','#fdc086','rgba(251, 191, 36,1)','#386cb0','#f0027f','#bf5b17'];
        
        this.updateOptions = {
         
          grid: {
            bottom: 5,
            top: 5,
            containLabel: true
          },
          series: [
            
              {
                  
                  color: colorPalette,
                  type: 'pie',
                  radius: [10, 80],
                  center: ['50%', '50%'],
                  roseType: 'area',
                  itemStyle: {
                      borderRadius: 8
                  },
                  data: franchiseData
              }
          ]
      };
      //}
    }
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
