import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ViewChild, HostListener, OnInit, Renderer2, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EChartsOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { SafeHtmlPipe } from '../safe-html.pipe';
import {MatIconModule} from '@angular/material/icon'


import * as echarts from 'echarts';
import { DatasourceService } from '../datasource.service';
import { TableComponent } from '../table/table.component';
import { Subscription, Observable, Subject } from 'rxjs';
import { ContestedUtils } from '../contested-utils';
import { map } from 'rxjs/internal/operators/map';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ApplicationRef } from '@angular/core';
import { DataStoryService } from '../data-story.service';
import { MAY } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
 import { NgxSmoothScroll } from '@eunsatio/ngx-smooth-scroll';
//https://itnext.io/4-ways-to-listen-to-page-scrolling-for-dynamic-ui-in-angular-ft-rxjs-5a83f91ee487
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
    )
  ],
  selector: 'app-contested-story',
  templateUrl: './contested-story.component.html',
  styleUrls: ['./contested-story.component.scss']
})

export class ContestedStoryComponent implements OnInit {

  normalise: boolean = true;
  smoothScroll:any;
  test: string = "fish";
  myValueSub: Subscription;
  paras: any[] = [];
  chartInstance: any;
  filteredStart: number = 1695;
  filteredEnd: number = 1835;
  filteredNumElections: number = 1;
  filteredNumContested: number = 0;
  filteredPercentageContested: number = 0;
  start: number = 1695;
  end: number = 1835;
  id:any;
  years: number[] = [];
  triggers: number[] = [200, 200, 200, 200, 200, 200, 3200, 3400, 3700, 3900, 4300];
  listener;
  showImage: boolean = true;
  buffer: number [] = []
  bufferIndex:number =0;
  scrollPos: number = 0;
  scrollElementHeight: number = 0;
  visIndex: number = 0;
  model: string = "test";
  debounce: boolean = false;
  @ViewChildren('div') ps: QueryList<ElementRef>
  @ViewChild('scrollContent') elementView: ElementRef;
  @HostListener('window:scroll') onScroll(e: Event): void {
    //console.log(this.getYPosition(e));
  }
  @HostListener('scroll', ['$event']) onElementScroll(e: Event): void {
    //console.log(this.getYPosition(e));
    // console.log("ps",this.ps);
    var firstOffSet = this.ps.get(0).nativeElement.offsetTop;
    var newVisIndex = 0;
    for (var i = 0; i < this.ps.length - 1; i++) {
      var element = this.ps.get(i);
      var nextElement = this.ps.get(i + 1);
      var topBuffer = 200;
      //  
      var thisOffset = (element.nativeElement.offsetTop - firstOffSet) - topBuffer;
      var nextOffset = (nextElement.nativeElement.offsetTop - firstOffSet)- topBuffer;
      this.buffer[this.bufferIndex]=this.getYPosition(e) ;
      this.bufferIndex++;
      if(this.bufferIndex>=this.buffer.length) this.bufferIndex=0;
      var bufferTotal = 0;
      this.buffer.forEach(element => {
        bufferTotal+=element;
      });
      var smoothedYPos = bufferTotal/this.buffer.length;
      if (this.getYPosition(e)>= thisOffset && this.getYPosition(e) < nextOffset) {
        // newVisIndex =i; 
        if (!this.debounce) {
          if (i != this.visIndex) {
            this.viewChanged(i);
            this.debounce = true;
            this.visIndex = i;
            console.log("paras ",thisOffset,nextOffset,this.getYPosition(e),smoothedYPos, this.visIndex);
           // console.log(" visIndex", this.visIndex);
            setTimeout(() => {
              this.debounce = false;
            }, 100);
          }

        }
      }

    }

    // this.ps.forEach(element => {

    //   //check if 

    // });

    // this.scrollElementHeight = this.elementView.nativeElement.offsetHeight;
    // //console.log(this.scrollElementHeight, (this.getYPosition(e)/this.scrollElementHeight)*100);

    //   for(var i=0;i<this.triggers.length-1;i++){
    //     if(this.scrollPos>=this.triggers[i] && this.scrollPos<this.triggers[i+1]){
    //       if(i!=this.visIndex) this.viewChanged(i);

    //       this.visIndex=i;
    //     }
    //   }
  }
  //  @HostListener('scroll', ['$event'])
  // onElementScroll($event) {
  //   console.log("Scrlling");
  // }
  //https://thecodeframework.com/this-is-how-to-trigger-change-detection-manually-in-angular/
  constructor(private datasourceService: DatasourceService, private renderer2: Renderer2, private ref: ChangeDetectorRef, private dataStoryService: DataStoryService) {


  }

  utils: any;
  scrollNext(i){
  //   console.log(`scrolling to ${i}`);

    this.smoothScroll.scrollTo({ x: 0, y:  this.ps.get(i+1).nativeElement.offsetTop -200}, {
      duration: 2800,
      timingFunction: '.13, 1.07, .51, 1.29'
  });
   
  
  }
  ngAfterViewInit() {
     this.smoothScroll = new NgxSmoothScroll(this.elementView.nativeElement);
}

  viewChanged(index) {
  //  console.log("view changed to number ", index);
    if (index == 0) {
      this.datasourceService.yearFilter.setValue("1695-1845")

      this.datasourceService.contestedFilter.setValue("");
    }
    else if (index == 1) {
      this.datasourceService.yearFilter.setValue("1695-1845")
      this.datasourceService.byElectionGeneralFilter.setValue("");
      this.datasourceService.contestedFilter.setValue("Y");
      this.sendMessage("stayTall")
    }
    else if (index == 2) {
      this.datasourceService.yearFilter.setValue("1695-1845")
      this.datasourceService.byElectionGeneralFilter.setValue("");
      this.datasourceService.contestedFilter.setValue("");
      this.sendMessage("visualMap1")
      //  this.datasourceService.yearFilter.setValue("1695-");
    }
    else if (index == 3) {
      this.datasourceService.yearFilter.setValue("1695-1845")
      this.datasourceService.byElectionGeneralFilter.setValue("");
      this.datasourceService.contestedFilter.setValue("");
      this.sendMessage("visualMap2")
      //  this.datasourceService.yearFilter.setValue("1695-");
    }
    else if (index == 4) {
      this.datasourceService.yearFilter.setValue("1695-1845")
      this.datasourceService.contestedFilter.setValue("");
      this.datasourceService.byElectionGeneralFilter.setValue("");
      this.sendMessage("visualMap3")
      //  this.datasourceService.yearFilter.setValue("1695-");
    }
    else if (index == 5) {
      this.datasourceService.yearFilter.setValue("1695-1711");
      this.datasourceService.contestedFilter.setValue("");
      this.datasourceService.byElectionGeneralFilter.setValue("");
      // this.sendMessage("")
      //  this.datasourceService.yearFilter.setValue("1695-");
    }
    //contested spark line
    else if (index == 6) {
      setTimeout(() => {
        this.sendMessage("all");
        this.datasourceService.yearFilter.setValue("1696-1835");
        this.datasourceService.contestedFilter.setValue("");
        this.datasourceService.byElectionGeneralFilter.setValue("");


      }, 4000);


    }
    else if (index == 7) {
      this.sendMessage("general");
      this.datasourceService.yearFilter.setValue("1695-1835");
      this.datasourceService.contestedFilter.setValue("");
      this.datasourceService.byElectionGeneralFilter.setValue("G");

    }
    else if (index == 8) {
      this.sendMessage("showCountyBorough");
      this.datasourceService.yearFilter.setValue("1695-1835");
      this.datasourceService.contestedFilter.setValue("");
      this.datasourceService.byElectionGeneralFilter.setValue("G");
      console.log("sending message to contested spark line");

      // this.sendMessage("general");
    }
  }

  ngOnInit(): void {
    for(var i=0;i<100;i++){
      this.buffer.push(0);
    }
    this.utils = new ContestedUtils(this.datasourceService);
    this.datasourceService.getData();

    this.datasourceService.ready.subscribe(value => { this.gotData(value) });
    for (var i = 1695; i < 1835; i++) {
      this.years.push(i);
    }

    //this.datasourceService.ready.subscribe(value => {this.gotData(value)});
  }
  sendMessage(message): void {
    // send message to subscribers via observable subject
    this.dataStoryService.sendMessage(message);
  }

  clearMessages(): void {
    // clear messages
    this.dataStoryService.clearMessages();
  }
  getSpacing(index) {
    // console.log("spacing",this.paras[index].spacing);
    return this.paras[index].spacing;
  }
  sliderChange(e) {

  }
  addParas() {
    var slider = `<mat-form-field><input matInput class="form-field" [formControl]="datasourceService.yearFilter" placeholder="...."> </mat-form-field>`;
    //0
    var para = {
      index: 0,
      readmore: "These were either general elections, which had to take place at least every three years according to the Triennial Act of 1694, and then every seven years from the Septennial Act of 1716 (or sooner, if a Government fell, or the monarch died). Or they were by-elections, triggered by the resignation or death of a sitting MP, his appointment to Government or the House of Lords, or for various other reasons. The interactive graph shows all these elections: you can see the spikes in the General Election years, but also that no year went by without at least one writ of election being issued ",
      showReadmore: false,
      showControls: true,
      widgets: [ "year"],
      content: "Beween " + this.filteredStart + " and " + this.filteredEnd + " there were " + this.filteredNumElections + " elections.",
      spacing: "150%"
    };
    this.paras.push(para);
    //0
    para = {
      index: 1,
      readmore: "However, only a minority of these elections were ever actually contested, which is to say that the election progressed to a formal poll and the taking of votes.  There were, after all, good reasons to avoid contested elections. They could be hugely expensive. They could open up divisions in a community. And of course some constituencies had only a very small number of people entitled to vote, and they might be under the effective control of the landowner. Some pocket boroughs did not experience a single contested election between 1695 and 1832 (see St. Germans, Castle Rising, and Thirsk). Most elections, therefore, were decided without  a poll, with the two sitting MPs simply being returned to Parliament again, or an amical arrangement being made to divide the constituency’s MPs between the two parties.",
      showReadmore: false,
      showControls: true  ,
      widgets: ["general", "year"],
      content: "However, of these only " + this.filteredNumContested + " were contested. That's " + this.filteredPercentageContested + "%",
      spacing: "150%"
    };
    this.paras.push(para);

    para = {
      index: 2,
      readmore: "example readmore",
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: "Before 1716 general elections were called every 3 years",
      spacing: "150%"
    };
    this.paras.push(para);

    para = {
      index: 3,
      readmore: "example readmore",
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: "...but the septenial act in 1716 changed that and we can see how after this date the frequency of elections falls off",
      spacing: "150%"
    };
    this.paras.push(para);

    para = {
      index: 4,
      readmore: "example readmore",
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: "...until they gather pace in the latter half of the 18th Century around 1789",
      spacing: "150%"
    };
    this.paras.push(para);

    para = {
      index: 5, readmore: "example readmore",
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: "You may have noticed a big spike in the year 1701. This isn't an error. The death of William III precipitated a general election quickly after another was held. Oddly enough, one of the consituencies (Corfe Castle) held its election the year before, in December.",
      spacing: "150%"
    };
    this.paras.push(para);

    para = {
      index: 6,
      readmore: "example readmore",
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: "Now let's have a look a the proportion of elections that were contested",
      spacing: "150%"
    };
    this.paras.push(para);

    para = {
      index: 7,
      readmore: "example readmore",
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: "It's a little clearer if we look only at General Elections",
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      index: 8,
      readmore: "example readmore",
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: "...and then if we separate out counties and boroughs, because the patterns are a bit different in each",
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      index: 9,
      readmore: "example readmore",
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: "d",
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      index: 10,
      readmore: "example readmore",
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: "d",
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      index: 11,
      readmore: "example readmore",
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: "d",
      spacing: "150%"
    };
    this.paras.push(para);


  }
  getYPosition(e: Event): number {
    return (e.target as Element).scrollTop;
  }
  getScrollHeight(): number {
    return Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
  }
  getElementScrollHeight(): number {
    return Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
  }


  gotData(value) {

    this.myValueSub = this.datasourceService.dataSource.connect().pipe(
      map(val => {
        //    console.log("cont inner");
        return val      //Returning Value
      })
    )
      .subscribe(ret => {
       // console.log('Recd from map : ' + ret[0].election_year);
        this.onDataSubscriptionChange();

      })
  }

  onChartInit(e: any) {
    this.chartInstance = e;

  }
  compareByElectionYear(a, b) {
    if (a.election_year < b.election_year) {
      return -1;
    }
    if (a.election_year > b.election_year) {
      return 1;
    }
    return 0;
  }
  formatPercentage(raw) {
    return Math.floor(raw);
  }

  onDataSubscriptionChange() {
   // console.log("contested story datasub change", this.datasourceService.dataSource);
    // var startYear = this.datasourceService.electionsMeta.earliest_year;
    // var endYear = this.datasourceService.electionsMeta.latest_year ;
    if (this.datasourceService.dataSource.filteredData != undefined) {


      if (this.datasourceService.dataSource.filteredData.length > 0) {
        this.filteredStart = parseInt(this.datasourceService.dataSource.filteredData.sort(this.compareByElectionYear)[0].election_year);//this.utils.getEarliestFilteredYear( "fish" );//this.datasourceService.dataSource.filteredData);
        this.filteredEnd = parseInt(this.datasourceService.dataSource.filteredData.sort(this.compareByElectionYear)[this.datasourceService.dataSource.filteredData.length - 1].election_year);
        this.filteredNumElections = this.datasourceService.dataSource.filteredData.length;
        this.filteredNumContested = this.utils.countContested(this.datasourceService.dataSource.filteredData);
        this.filteredPercentageContested = Math.floor((this.filteredNumContested / this.filteredNumElections) * 100);
        //  console.log("setting params",this.filteredNumContested);
        if (this.paras.length == 0) this.addParas();
        this.ref.detectChanges();
      }
    }

  }



  ngOnDestroy() {

    if (this.myValueSub) {
      this.myValueSub.unsubscribe();
      // this.listener();
    }
    if (this.id) {
      clearInterval(this.id);
    }
  }
}
