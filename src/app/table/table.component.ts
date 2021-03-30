import { Component, OnInit, ViewChild } from '@angular/core';
import { DatasourceService } from '../datasource.service';
import { MatTableDataSource } from '@angular/material/table';
import { FilterObj, Elections, Election , PollBook, PollBookResponse, HOPData} from  '../viz/viz.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(private datasourceService: DatasourceService) { }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource = new MatTableDataSource<Election>();
  ready: boolean = false;
  displayedColumns: string[] = ['constituency', 'election_year', 'election_month', 'countyboroughuniv', 'by_election_general', 'by_election_cause','franchise_type', 'contested', 'pollbook_id'];

  ngOnInit(): void {
    // this.datasourceService.init();
    this.datasourceService.getData();
    this.datasourceService.ready.subscribe(() => this.gotData()
    );
   
    // this.datasourceService.onDataSubscriptionChange().subscribe(() => this.dataChange());
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
  dataChange(){
    console.log("sub change in table");
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
}
