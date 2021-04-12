import { Component, OnInit, ViewChild } from '@angular/core';
import { DatasourceService } from '../datasource.service';
import { MatTableDataSource } from '@angular/material/table';
import { FilterObj, Elections, Election , PollBook, PollBookResponse, HOPData} from  '../viz/viz.component';
import { MatPaginator } from '@angular/material/paginator';
import { ResizeEvent } from 'angular-resizable-element';
import { NgxMatRangeSliderModule } from 'ngx-mat-range-slider';
import { Options, ChangeContext } from '@angular-slider/ngx-slider';
import { MAY } from '@angular/material';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(private datasourceService: DatasourceService) { }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  style:any={};
  dataSource = new MatTableDataSource<Election>();
  ready: boolean = false;
  displayedColumns: string[] = ['constituency', 'election_year', 'election_month', 'countyboroughuniv', 'by_election_general', 'by_election_cause','franchise_type', 'contested', 'pollbook_id'];
  minYear:number = 1695;
  maxYear: number = 1835;
  sliderOptions: Options = {
    floor: 1695,
    ceil: 1835
  };
  ngOnInit(): void {
    // this.datasourceService.init();
    this.datasourceService.getData();
    this.datasourceService.ready.subscribe(() => this.gotData()
    );
   
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
  dataChange(filterName){
    console.log("sub change in table", filterName);
    //TODO i guess because this fires on the filter change rather than the data change this is why we need a timeout. is a proper fix to wathc the filtered data?
    setTimeout(() => {
      var maxMinYears = this.getMaxMinYears();

      this.minYear = maxMinYears.minY;
      this.maxYear = maxMinYears.maxY;
      console.log(maxMinYears,this.minYear,this.maxYear);
    }, 10);
    //get min and max years
   
  }
  
  getMaxMinYears(){
    var minY = 4000;
    var maxY = 0;
    this.datasourceService.dataSource.filteredData.forEach(element => {
      var year  = parseInt(element.election_year.trim());
     // console.log("year",year)
      if(year>maxY) {
        maxY = year;
      }
      if(year<minY) {
        minY = year;
      }
    });
    return {
      maxY:maxY,
      minY:minY
    }
  }
  gotData(){
    this.ready =true;
    console.log("ready",this.datasourceService.dataSource.data)
    this.datasourceService.dataSource.paginator = this.paginator;
    //this.dataSource = this.datasourceService.dataSource;
  }
  getHasPollBooks(pollbook_id) {
		if (pollbook_id.length > 0) return 'Y (' + pollbook_id.split(";").length + ')';

		return 'N';
	}
  onResizeEnd(event: ResizeEvent): void {
		
		this.style = {
			position: 'fixed',
			right: "3%",
			width: `${event.rectangle.width}px`,
		};
	}

	onResizeStart(event: ResizeEvent): void {
	

	}
  onValueChange(changeContext: ChangeContext): void {
	

	}
	sliderChange(changeContext: ChangeContext): void {

		this.minYear = changeContext.value;
		this.maxYear = changeContext.highValue;
    console.log("reset year");

		this.datasourceService.yearFilter.setValue(changeContext.value.toString() + "-" + changeContext.highValue.toString());
		this.datasourceService.dataSource.filter = JSON.stringify(this.datasourceService.filteredValues);


	}
}
