import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';

// We use the gql tag to parse our query string into a query document
const GET_CANDIDATE = 
gql`query { 
    candidate {
    candidate_name
    candidates_elections{
      is_winner
      ultimate_winner
      overturned_by
      election{
        election_year
        contested
      }
    }
  }
}
`;

@Component({
  selector: 'app-graph-ql-demo',
  templateUrl: './graph-ql-demo.component.html',
  styleUrls: ['./graph-ql-demo.component.scss']
})
export class GraphQLDemoComponent implements OnInit, OnDestroy {
  loading: boolean;
  candidate: any;

  private querySubscription: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_CANDIDATE
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.candidate = data.candidate;
      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

}
