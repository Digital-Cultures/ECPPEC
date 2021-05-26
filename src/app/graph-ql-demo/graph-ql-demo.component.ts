import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

// We use the gql tag to parse our query string into a query document
const GET_CANDIDATE = gql`query { 
    candidate {
    candidate_name
    candidates_elections{
      is_winner
      ultimate_winner
      overturned_by
      election{
        election_year
        contested
        constituency
      }
    }
  }
}`;

export interface CandidateElement {
  candidate_name: string;
  constituency: string;
  election_year: number;
  contested: number;
  is_winner: boolean;
  ultimate_winner: boolean;
  overturned_by: string;
}

const ELEMENT_DATA: CandidateElement[] = [];
@Component({
  selector: 'app-graph-ql-demo',
  templateUrl: './graph-ql-demo.component.html',
  styleUrls: ['./graph-ql-demo.component.scss']
})
export class GraphQLDemoComponent implements OnInit, AfterViewInit, OnDestroy {
  loading: boolean;
  candidate: any;
  displayedColumns: string[] = ['candidate_name', 'constituency', 'election_year', 'contested', 'is_winner', 'ultimate_winner', 'overturned_by'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private querySubscription: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {this.querySubscription = this.apollo.watchQuery<any>({
    query: GET_CANDIDATE
  })
    .valueChanges
    .subscribe(({ data, loading }) => {
      this.loading = loading;
      this.candidate = data.candidate;
      data.candidate.forEach(element => {
        element.candidates_elections.forEach(candidates_election => {
          ELEMENT_DATA.push({
            candidate_name: element.candidate_name,
            constituency: candidates_election.election[0].constituency,
            election_year: candidates_election.election[0].election_year,
            contested: candidates_election.election[0].contested,
            is_winner: candidates_election.is_winner,
            ultimate_winner: candidates_election.ultimate_winner,
            overturned_by: candidates_election.overturned_by
          });
        });
      });

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

}
