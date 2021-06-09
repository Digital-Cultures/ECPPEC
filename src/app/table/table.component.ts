import { Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { DatasourceService } from '../datasource.service';
import { MatTableDataSource } from '@angular/material/table';
import { FilterObj, Elections, Election , PollBook, PollBookResponse, HOPData} from  '../viz/viz.component';
import { MatPaginator } from '@angular/material/paginator';
import { ResizeEvent } from 'angular-resizable-element';
import { NgxMatRangeSliderModule } from 'ngx-mat-range-slider';
import { Options, ChangeContext } from '@angular-slider/ngx-slider';
import { MAY } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DownloadService } from '../download.service';
import { DownloadPollBooksService } from '../download-poll-books.service';
import { GetPollBooksService } from '../get-poll-books.service';
import { PollbookDialogueComponent } from '../pollbook-dialogue/pollbook-dialogue.component';

import { DialogueComponent } from '../dialogue/dialogue.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  @Output() myEvent = new EventEmitter();
  constructor(private getPollBooksService: GetPollBooksService, private downloadPollBooksService: DownloadPollBooksService, private downloadService: DownloadService, private datasourceService: DatasourceService,  public dialog: MatDialog) { }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  style:any={};
  dataSource = new MatTableDataSource<Election>();
  ready: boolean = false;
  displayedColumns: string[] = ['constituency', 'election_year', 'election_month', 'countyboroughuniv', 'by_election_general', 'by_election_cause','franchise_type', 'contested', 'pollbook_id'];
  minYear:number = 1695;
  maxYear: number = 1835;
  hopData: HOPData;
  currentBooks: PollBook[];
  pollBooks: PollBookResponse;
  gotPollBooks:boolean = false;
  gotDataFlag:boolean = false;
  myValueSub: Subscription;
  // filterNames: string [] = ["consituency","election_month","","","","","","","","","","",""];
  filterNames: any[] = [
    {value: 'constituency', viewValue: 'Constituency'},
    {value: 'election_month', viewValue: 'Election Month'},
    {value: 'countyboroughuniv', viewValue: 'County/Borough/University'},
    {value: 'by_election_general', viewValue: 'By election/general'},
    {value: 'by_election_cause', viewValue: 'By election cause'},
    {value: 'franchise_type', viewValue: 'Franchise Type'},
    {value: 'contested', viewValue: 'Contested'},
    {value: 'election_month', viewValue: 'Election Month'}
  ];
  sliderOptions: Options = {
    floor: 1695,
    ceil: 1835
  };
  openDialogue(){
    const dialogRef = this.dialog.open(DialogueComponent);
   
  
      dialogRef.afterClosed().subscribe(
        data => this.datasourceService.setSearchFromDialogue(data)
        );
        this.myEvent.emit(null);
  }
  ngOnInit(): void {
   if(!this.gotDataFlag){
    this.datasourceService.getData();
    this.myValueSub = this.datasourceService.ready.subscribe(() => this.gotData()
    );
    this.openDialogue();
   
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
    this.gotDataFlag=true;
  }
  }
  openPollBookDialogue(){
		//console.log();
		let dialogRef = this.dialog.open(PollbookDialogueComponent, {
			data: this.pollBooks,
		});
	}
  openHopDialogue(){
		//console.log("hop text" ,this.hopData);
		let dialogRef = this.dialog.open(PollbookDialogueComponent, {
			data: this.hopData,
		});
	}
  getBook($event, element){


    console.log("element",element);
		var splitCodes = element.pollbook_id.split(";");
		var trimmedCodes="";
		for(var i=0;i<splitCodes.length;i++){
			trimmedCodes+=splitCodes[i].trim()+";";
		}
		trimmedCodes = trimmedCodes.substring(0, trimmedCodes.length - 1);

		this.getPollBooksService.getData(trimmedCodes)
		.subscribe(
			(data: PollBookResponse) => this.pollBooks = {
				num_results:  data['num_results'],
				poll_books:  data['poll_books'],
			},err => console.error(err) , () => this.openPollBookDialogue() );
	} 
  
  dataChange(filterName){
    //console.log("sub change in table", filterName, this.datasourceService.getFilteredConstituencies());
    //TODO i guess because this fires on the filter change rather than the data change this is why we need a timeout. is a proper fix to wathc the filtered data?
    setTimeout(() => {
      var maxMinYears = this.getMaxMinYears();

      this.minYear = maxMinYears.minY;
      this.maxYear = maxMinYears.maxY;
      // console.log(maxMinYears,this.minYear,this.maxYear);
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
  //  console.log("ready",this.datasourceService.dataSource.data)
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

		this.datasourceService.yearFilter.setValue(changeContext.value.toString() + "-" + changeContext.highValue.toString());
		this.datasourceService.dataSource.filter = JSON.stringify(this.datasourceService.filteredValues);


	}
  download(){
    //console.log(this.datasourceService.dataSource.filteredData);
		this.downloadService.downloadFile(this.datasourceService.dataSource.filteredData, 'elections');
		//this.downloadService.downloadElectionsByYearPerColumn(this.datasourceService.dataSource.filteredData, 'electionsbyyear', 'contested');

  }
  downloadYear(name){
    //console.log(this.datasourceService.dataSource.filteredData);
		//this.downloadService.downloadFile(this.datasourceService.dataSource.filteredData, 'elections');
		this.downloadService.downloadElectionsByYearPerColumn(this.datasourceService.dataSource.filteredData, 'electionsbyyear'+name, name);

  }
	//downlaod pollbook data
	downloadPollBooks(){

		// this.downloadPollBooksService.downloadFile(this.pollBooks.poll_books, 'pollBooks');
	}
  ngOnDestroy(){
    if (this.myValueSub) {
          this.myValueSub.unsubscribe();
      }
    }
}
