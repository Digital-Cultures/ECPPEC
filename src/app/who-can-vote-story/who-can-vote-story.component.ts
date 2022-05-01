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
import { timeout } from 'rxjs/operators';
@Component({
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('1.5s ease-out',
              style({ height: '*', opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: '*', opacity: 1 }),
            animate('1.5s ease-in',
              style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    ),


    trigger('openClose', [
      // ...
      state('open', style({
        // height: '*',
        height:'*',
        width: '*',
        opacity: 1
      })),
      state('closed', style({
        height:'0px',
        width: '0px',
        opacity: 0

      })),
      state('hidden', style({
         height:'0px',
        width: '0px',
        opacity: 0.5,
        overflow:"hidden"

      })),
      state('visible', style({
       height:'*',
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
  qConsequence: string = "";
  isOpen = true;
  showAnswer = false;
  visIndex: number = 19;
  nextRoute = 19;
  visIndexMap: number[] = [];
  questionState: number = 0;
  states: number[] = [0, 1, 2];
  
  chartInstance: any;
  totalVotesConstituencies: string[] = ["Liverpool", "Bristol", "Newcastle-upon-Tyne", "Grampound", "Westminster", "Bedford", "Bedfordshire", "Mitchell", "Worcester", "Pontefract", "Minehead", "Bath", "London", "Middlesex"];
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
    var ind = 0;
    this.totalVotesConstituencies.forEach(element => {
      if (ind < 6) {
        this.totalVotesConstituenciesSearchString += element + ";";
      }
      ind++;
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
    //map  array index to vis index

    this.paras.forEach(element => {
      this.visIndexMap.push(0);
    });
    var index = 0;
    this.paras.forEach(element => {
      this.visIndexMap[element.index] = index;
      index++;
    });
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
  stateSelected(state) {
    this.questionState = state;
  }
  caseStudySelected(constituencies) {
    console.log("constituencies", constituencies)
    this.totalVotesConstituenciesSearchString = "";
    constituencies.forEach(element => {
      this.totalVotesConstituenciesSearchString += element + ";";
    });
    //trim trailing semi colon
    this.totalVotesConstituenciesSearchString = this.totalVotesConstituenciesSearchString.substring(0, this.totalVotesConstituenciesSearchString.length - 1);
    console.log("this.totalVotesConstituenciesSearchString", this.totalVotesConstituenciesSearchString)
    this.fetchVoters();
  }
  answered(answer) {
    if (answer == "Start again") answer = "startagain";
    if (answer == "Scot and lot") answer = "Scotandlot";

    console.log("answer", answer);
    // console.log("answered", this.paras[this.visIndexMap[this.visIndex]].answers[answer]);


    if (answer === "next" ) {

      this.questionState = 0;
      console.log("next", this.qAnswer);
      this.nextRoute = this.paras[this.visIndexMap[this.visIndex]].answers[this.qAnswer].route;
      console.log("next nexrouate", this.nextRoute);
      this.qAnswer = "";
      this.qConsequence = "";
    }
    else if(answer === "startagain"){
      this.questionState = 0;
      console.log("startagain", this.qAnswer);
      this.nextRoute = 0;
      console.log("next nexrouate", this.nextRoute);
      this.qAnswer = "";
      this.qConsequence = "";
    }
    else if (answer === "back") {

      console.log("back", this.questionState, this.visIndex);
      if (this.questionState === 1) {
        this.nextRoute = this.paras[this.visIndexMap[this.visIndex]].prev_route;
        console.log("set next route in back questions state 1", this.nextRoute);
        this.qAnswer = "";
        this.questionState = 0;
      }
      else if (this.questionState === 2) {
        console.log(this.paras[this.visIndexMap[this.visIndex]]);
        //set the next route to be the current one
        this.nextRoute = this.paras[this.visIndexMap[this.visIndex]].index;

        this.questionState = 1;
        console.log("set next route in back questions state 2", this.nextRoute);
        this.qAnswer = "";
      }


    }
    else {
      // if (answer === "Freeman" || answer == "Burgage" || answer == "Corporation" || answer == "Householder" || answer == "Freeholder" || answer == "Scotandlot") {
      //   if (answer == "Scotandlot") answer = "Scot and lot";
      //   this.datasourceService.franchiseFilter.setValue(answer);
      // } else if (answer === "counties" || answer === "boroughs" || answer === "universities") {
      //   console.log("setting county borogouh filters");
      //   if (answer === "counties") {
      //     this.datasourceService.countyFilter.setValue("C");
      //   } else if (answer === "boroughs") {
      //     this.datasourceService.countyFilter.setValue("B");
      //   } else if (answer === "universities") {
      //     this.datasourceService.countyFilter.setValue("U");
      //   }

      // }
      
      this.nextRoute = this.paras[this.visIndexMap[this.visIndex]].index;// this.paras[this.visIndexMap[this.visIndex]].answers[answer].route;
        console.log("set next route in yes or no", this.nextRoute);
      
      if(this.visIndex==7 || this.visIndex===9){
        this.nextRoute = this.paras[this.visIndexMap[this.visIndex]].answers[answer].route;
      //TODO I
        // if (answer === "counties") {
        //   this.datasourceService.countyFilter.setValue("C");
        // } else if (answer === "boroughs") {
        //   this.datasourceService.countyFilter.setValue("B");
        // } else if (answer === "universities") {
        //   this.datasourceService.countyFilter.setValue("U");
        // }

        this.qConsequence = this.paras[this.visIndexMap[this.visIndex]].answers[answer].consequence;
        this.questionState = 0;
         this.qConsequence ="";
         this.qAnswer ="";
      }else{
        this.questionState = 2;
        
      

      this.qConsequence = this.paras[this.visIndexMap[this.visIndex]].answers[answer].consequence;
      this.qAnswer = this.paras[this.visIndexMap[this.visIndex]].answers[answer].text;
      // setTimeout(() => {                           // <<<---using ()=> syntax

      }
      // }, 500);

      if (answer === "Freeman" || answer == "Burgage" || answer == "Corporation" || answer == "Householder" || answer == "Freeholder" || answer == "Scotandlot") {
        if (answer == "Scotandlot") answer = "Scot and lot";
        this.datasourceService.franchiseFilter.setValue(answer);
      } 
     
    }

  }
  fetchVoters() {
    var search_url = "?constituency=" + this.totalVotesConstituenciesSearchString+"&include_voter_count=true";
    console.log("fetching voters", search_url);
    // this.updateOptions = this.options;
    if (this.chartInstance != undefined) this.chartInstance.clear();
    this.options = {
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
    this.updateOptions.series = [];

    this.getVotersService.getData(search_url).subscribe(value => { this.gotVoterData(value) });
  }

  //1
  // questionFadeInDone($event) {
  //   if (this.questionState === 0) {
  //     this.questionState = 1;
  //   }
  //   else if ($event.fromState != "void") {
  //     console.log("questionFadeInDone", $event)

  //   }
  // }
  // //2
  // consequenceFadeInDone($event) {



  //   if ($event.fromState != "void") {
  //     // console.log("consequenceFadeInDone", $event)
  //   }
  // }
  // nextFadeInDone($event) {


  //   if ($event.fromState != "void") {
  //     // console.log("nextFadeInDone", $event)
  //     if ($event.toState == "closed") {
  //       // if(this.questionState==2){
  //       console.log("next has faded out")
  //       //}
  //       if (this.questionState === 1) {
  //         // this.questionState = 1;
  //         this.visIndex = this.nextRoute;
  //         console.log("going to next route", this.visIndex);
  //       }
  //     }

  //   }
  // }
  // backFadeInDone($event) {


  //   if ($event.fromState != "void") {
  //     if ($event.toState == "closed") {
  //       // if(this.questionState==2){
  //       console.log("back has faded out")
  //       //}
  //       if (this.questionState === 2) {
  //         // this.questionState = 1;
  //         this.visIndex = this.nextRoute;
  //         console.log("going to next route", this.visIndex);
  //       }
  //     }

  //     // console.log("backFadeInDone", $event)
  //   }
  // }

  animationDone($event) {
    if (this.questionState === 0) {
      if ($event.fromState != "void") {
      this.questionState = 1;
      }
      else{
        setTimeout(() => {
          this.questionState = 1;
        }, 500);
      }
    }

    this.visIndex = this.nextRoute;
    //TODO UPDATE
    if (this.visIndex === 19 && this.paras.length > 0) {


      this.fetchVoters();

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
          if (element.num_voters != 0) {


            data[parseInt(element.election_year) - value.earliest_year][1] = element.num_voters;
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
    if (para.co.length < 1) return "";

    return para.answers[this.qAnswer].consequence;
  }
  getSpacing(index) {
    // console.log("spacing",this.paras[index].spacing);
    return 10;//this.paras[index].spacing;
  }
}
