import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ViewChild, HostListener, HostBinding, OnInit, AfterViewInit, Renderer2, ElementRef, ViewChildren, QueryList, OnChanges } from '@angular/core';
import { GetWhoCouldVoteService } from '../get-who-could-vote.service';
import { GetVotersService } from '../get-voters.service';
import { DatasourceService } from '../datasource.service';
import { LocationStrategy } from '@angular/common';
//import { GetElectionsService } from '../get-elections.service';
import { NgxSmoothScroll } from '@eunsatio/ngx-smooth-scroll';
import { map } from 'rxjs/internal/operators/map';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ApplicationRef } from '@angular/core';
import { DataStoryService } from '../data-story.service';
import { MatButtonModule } from '@angular/material/button';
import { yearsPerPage } from '@angular/material';
@Component({
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('1s ease-out',
              style({ height: 300, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 300, opacity: 1 }),
            animate('1s ease-in',
              style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    ),


    trigger('openClose', [
      // ...
      state('open', style({
        // height: 500,
        opacity: 1
      })),
      state('closed', style({
        // height:300,
        opacity: 0,

      })),
      state('hidden', style({
        // height:300,
        width: 0,
        opacity: 0

      })),
      state('visible', style({
        // height:300,
        width: '*',
        opacity: 1

      })),

      transition('open => closed', [
        animate('0.5s ease-out')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
      transition('visible => hidden', [
        animate('0.5s ease-out')
      ]),
      transition('hidden => visible', [
        animate('0.5s')
      ]),
    ])
  ],
  selector: 'app-who-can-vote-story',
  templateUrl: './who-can-vote-story.component.html',
  styleUrls: ['./who-can-vote-story.component.scss']
})
export class WhoCanVoteStoryComponent implements OnInit {

  constructor(private getWhoCouldVoteService: GetWhoCouldVoteService, private location: LocationStrategy, private datasourceService: DatasourceService, private getVotersService: GetVotersService) {

    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      console.log("prevent back");
      history.pushState(null, null, window.location.href);
    });

  }
  paras: any[] = [];

  qAnswered: boolean = false;
  qAnswer: string = "";
  isOpen = true;
  showAnswer = false;
  visIndex: number = 19;
  nextRoute = 19;
  chartInstance: any;
  totalVotesConstituencies: string[] = ["Liverpool", "Bristol", "Newcastle upon Tyne", "Grampound", "Westminster", "Bedford"];
  totalVotesConstituenciesSearchString: string = "";
  // trigger: any;

  // startHeight: number;

  // @HostBinding('@grow') grow: any;
  electionYears: number[] = [];
  electionVoteCounts: number[] = [];
  updateOptions: any = {};
  options = {
    grid: {
      bottom: 5,
      top: 5,
      containLabel: true
    },
    title: {
      text: 'Votes cast by constituency in election years',
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
      type: 'category'

    },
    yAxis: {
      type: 'value'
    },
    // dataset: {
    //   source: [

    //   ]
    // },
    series: [
      {
        type: 'line',
        encode: {
          // Map "amount" column to x-axis.
          x: [0, 0],
          // Map "product" row to y-axis.
          y: [0, 1]
        }
      }
    ]
    // series: [
    //   {
    //     // encode: { x: 0, y: 1 },
    //     data: [
    //       [[2015,3], [2016,6]],
    //       [[2015,4], [2016,1]]
    //     ],
    //     type: 'line',
    //   },
    // ],
  };

  @ViewChildren('div') ps: QueryList<ElementRef>
  @ViewChild('scrollContent') elementView: ElementRef;
  @HostListener('window:scroll') onScroll(e: Event): void {
    //console.log(this.getYPosition(e));
  }
  @HostListener('scroll', ['$event']) onElementScroll(e: Event): void {
    console.log(e);


  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
  ngAfterViewInit(): void {

    //todo uncomment
    console.log("view init");
    this.datasourceService.getData();

    this.datasourceService.ready.subscribe(value => { this.gotElectionsData(value) });
    this.totalVotesConstituencies.forEach(element => {
      this.totalVotesConstituenciesSearchString += element + ";";
    });
    //trim trailing semi colon
    this.totalVotesConstituenciesSearchString = this.totalVotesConstituenciesSearchString.substring(0, this.totalVotesConstituenciesSearchString.length - 1);
  }


  ngOnInit(): void {
    console.log("on init");
    this.getWhoCouldVoteService.getData();
    this.getWhoCouldVoteService.getData().subscribe(value => { this.gotWhoCouldVoteStoryData(value) });

    // this.getElectionsService.getData().subscribe(
    // 	(data: Elections) => this.electionsMeta = {
    // 		num_results: data['num_results'],
    // 		earliest_year: data['earliest_year'],
    // 		latest_year: data['latest_year'],
    // 		elections: data['elections']
    // 	}, err => console.error(err), () => this.gotData()  );
  }

  gotWhoCouldVoteStoryData(value) {
    console.log(value);
    this.paras = value;
  }
  gotElectionsData(value) {
    console.log("all data", value);
    // this.paras = value;
  }
  getAccessibliltyData(index) {

  }
  onChartInit(e: any) {
    this.chartInstance = e;

  }
  answered(answer) {
    if (answer == "Start again") answer = "startagain";
    if (answer == "Scot and lot") answer = "Scotandlot";

    console.log("answer", answer);
    console.log("answered", this.paras[this.visIndex].answers[answer]);

    // if (this.visIndex === 7 || this.visIndex == 9 || this.visIndex == 13) {
    //   this.nextRoute = this.paras[this.visIndex].answers[answer].route;
    //   this.isOpen = false;

    //   if (answer === "Freeman" || answer == "Burgage" || answer == "Corporation" || answer == "Householder" || answer == "Freeholder" || answer == "Scotandlot") {
    //     if (answer == "Scotandlot") answer = "Scot and lot";
    //     this.datasourceService.franchiseFilter.setValue(answer);
    //   } else if (answer === "counties" || answer === "boroughs" || answer === "universities") {
    //     console.log("setting county borogouh filters");
    //     if (answer === "counties") {
    //       this.datasourceService.countyFilter.setValue("C");
    //     } else if (answer === "boroughs") {
    //       this.datasourceService.countyFilter.setValue("B");
    //     } else if (answer === "universities") {
    //       this.datasourceService.countyFilter.setValue("U");
    //     }

    //   }
    // }
    // else
    if (answer === "yes" || answer === "no") {
      this.qAnswered = true;
      this.nextRoute = this.paras[this.visIndex].answers[answer].route;
      this.showAnswer = true;
      // if (this.paras[this.visIndex].answers[answer].consequence == "next question") {
      //   // this.visIndex = this.paras[this.visIndex].answers[answer].route;
      //   this.nextRoute = this.paras[this.visIndex].answers[answer].route;
      //   this.isOpen = false;
      // } else {
      //   this.qAnswered = true;
      this.qAnswer = answer;
      //   this.showAnswer = true;
      // }


    }
    else if (answer === "next") {
      console.log(this.paras[this.visIndex]);

      this.showAnswer = false;


      //this.visIndex = this.paras[this.visIndex].answers[aq].route;
      this.nextRoute = this.paras[this.visIndex].answers[this.qAnswer].route;
      this.isOpen = false;
      this.qAnswered = false;
      this.qAnswer = "";
    }
    else if (answer === "back") {
      console.log(this.paras[this.visIndex]);

      this.showAnswer = false;


      //this.visIndex = this.paras[this.visIndex].answers[aq].route;
      this.nextRoute = this.paras[this.visIndex].prev_route;
      this.isOpen = false;
      this.qAnswered = false;
      this.qAnswer = "";
    }
    else {
      this.nextRoute = this.paras[this.visIndex].answers[answer].route;
      this.isOpen = false;

      if (answer === "Freeman" || answer == "Burgage" || answer == "Corporation" || answer == "Householder" || answer == "Freeholder" || answer == "Scotandlot") {
        if (answer == "Scotandlot") answer = "Scot and lot";
        this.datasourceService.franchiseFilter.setValue(answer);
      } else if (answer === "counties" || answer === "boroughs" || answer === "universities") {
        console.log("setting county borogouh filters");
        if (answer === "counties") {
          this.datasourceService.countyFilter.setValue("C");
        } else if (answer === "boroughs") {
          this.datasourceService.countyFilter.setValue("B");
        } else if (answer === "universities") {
          this.datasourceService.countyFilter.setValue("U");
        }

      }
    }

  }
  animationDone($event) {
    console.log("animation done");
    this.isOpen = true;
    this.visIndex = this.nextRoute;

    //TODO UPDATE
    if (this.visIndex === this.paras.length - 2 && this.paras.length > 0) {
     
      // this.getVotersService.getData("?constituency=Liverpool&include_votes=Y");//    "?constituency=Liverpool");

      //      this.getVotersService.getData("?constituency=" + this.totalVotesConstituenciesSearchString + "&include_results=Y").subscribe(value => { this.gotVoterData(value) });
     var search_url = "?constituency=" + this.totalVotesConstituenciesSearchString + "&include_votes=Y";
     console.log("fetching voters",search_url);
       this.getVotersService.getData(search_url).subscribe(value => { this.gotVoterData(value) });

    }
  }
  gotVoterData(value) {
    console.log("Voters ", value);
    var series = [];

    this.totalVotesConstituencies.forEach(element => {
      var consituencyName = element;
      console.log("consituencyName", consituencyName);
      var data = [];
      for (var i = value.earliest_year; i <= value.latest_year; i++) {
        //console.log(i);
        data.push([i, null]);
      };
      // console.log(data);
      value.elections.forEach(element => {
        if (element.constituency == consituencyName) {
          var totalVotes = 0;
          if (Array.isArray(element.results)) {
            element.results.forEach(element => {
              totalVotes += element.votes;
            });

            data[parseInt(element.election_year) - value.earliest_year][1] = totalVotes;
          }


        }
      });
      var s = {
        connectNulls: true,
        type: 'line',
        name: consituencyName,
        encode: {

          x: 0,

          y: 1
        },
        data: data
      }
      series.push(s);

    });
    //  / console.log('series;',series);
    this.updateOptions = {

      series: series

    }

  }
  answerAnimationDone($event) {
    //this.showAnswer=f
  }
  getConsequence(para) {
    if (this.qAnswer.length < 1) return "";

    return para.answers[this.qAnswer].consequence;
  }
  getSpacing(index) {
    // console.log("spacing",this.paras[index].spacing);
    return 10;//this.paras[index].spacing;
  }
}
