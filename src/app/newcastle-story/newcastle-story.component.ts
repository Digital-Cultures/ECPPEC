import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ViewChild, HostListener, OnInit, AfterViewInit, Renderer2, ElementRef, ViewChildren, QueryList } from '@angular/core';
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
            style({ height: 150, opacity: 0 }),
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
  selector: 'app-newcastle-story',
  templateUrl: './newcastle-story.component.html',
  styleUrls: ['./newcastle-story.component.scss']
})

export class NewcastleStoryComponent implements OnInit {

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
            // this.viewChanged(i);
            this.debounce = true;
            this.visIndex = i;
           
            setTimeout(() => {
              this.debounce = false;
            }, 100);
          }

        }
      }

    }


  }

  //https://thecodeframework.com/this-is-how-to-trigger-change-detection-manually-in-angular/
  constructor(private datasourceService: DatasourceService, private renderer2: Renderer2, private ref: ChangeDetectorRef, private dataStoryService: DataStoryService) {


  }

  utils: any;
  scrollNext(i){
  //   console.log(`scrolling to ${i}`);

    this.smoothScroll.scrollTo({ x: 0, y:  this.ps.get(i+1).nativeElement.offsetTop -200}, {
      duration: 1800,
      // timingFunction: '.13, 1.07, .51, 1.29'
      timingFunction: 'ease-in-out'
  });
  }
  scrollUp(){
       console.log(`scrolling up`);
  
      this.smoothScroll.scrollTo({ x: 0, y:  0}, {
        duration: 4800,
        timingFunction: 'ease-in-out'
    });
  }


  viewChanged(index) {
  //  console.log("view changed to number ", index);
    if (index == 0) {
      
      this.setFilters("1695-1845","","","","");
    }
    else if (index == 1) {
     
      this.setFilters("1695-1845","","","Y","");
      this.sendMessage("stayTall")
    }
    else if (index == 2) {
     
      this.setFilters("1695-1845","","","","");
      this.sendMessage("visualMap1")
      //  this.datasourceService.yearFilter.setValue("1695-");
    }
    else if (index == 3) {
      
      this.setFilters("1695-1845","","","","");
      this.sendMessage("visualMap2")
      //  this.datasourceService.yearFilter.setValue("1695-");
    }
    else if (index == 4) {
    
      this.setFilters("1695-1845","","","","");
      this.sendMessage("visualMap3")
      //  this.datasourceService.yearFilter.setValue("1695-");
    }
    else if (index == 5) {
     
      this.setFilters("1695-1711","","","","");
     
    }
    //contested spark line
    else if (index == 6) {
      setTimeout(() => {
        this.sendMessage("all");
        this.setFilters("1695-1845","","","","");


      }, 4000);


    }
    else if (index == 7) {
      this.sendMessage("general");
    
      this.setFilters("1695-1845","","G","","");

    }
    else if (index == 8) {
      this.sendMessage("showCountyBorough");
    
      this.setFilters("1695-1845","","G","","");
 
    }
    else if (index == 9) {
  
  
      this.setFilters("1695-1845","","","","B");

    }
    else if (index == 10) {
     
     
      setTimeout(() => {
        this.sendMessage("showLargeConstituencies");
        var lcs = "Bedford, Beverley, Bridgnorth, Bristol, Canterbury, Carlisle, Chester, Colchester, Coventry, Cricklade, Dover, Durham City, Evesham, Exeter, Gloucester, Hereford, Kingston-Upon-Hull, Lancaster, Leicester, Lincoln, Liverpool, London, Maidstone, Newark, Newcastle-upon-Tyne, Northampton, Norwich, Nottingham, Oxford, Southwark, Westminster, Worcester, York";
        this.setFilters("1695-1845","","G","","");


      }, 4000);

    }
    else if (index == 11) {
      this.setFilters("1695-1845","","","","");


    }
  }
  setFilters(year,constituency,byElectionGeneral,contested,countyBoroughUniv){
    if(this.datasourceService.yearFilter.value != year) { 
      this.datasourceService.yearFilter.setValue(year);
    }else{
    }
    if(this.datasourceService.constituencyFilter.value != constituency) { 
      this.datasourceService.constituencyFilter.setValue(constituency);
    }else{
    }
    if(this.datasourceService.byElectionGeneralFilter.value != byElectionGeneral) { 
      this.datasourceService.byElectionGeneralFilter.setValue(byElectionGeneral);
    }else{
    }
    if(this.datasourceService.contestedFilter.value != contested) { 
      this.datasourceService.contestedFilter.setValue(contested);
    }else{
    }
    if(this.datasourceService.countyFilter.value != countyBoroughUniv) { 
      this.datasourceService.countyFilter.setValue(countyBoroughUniv);
    }else{
    }
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
   
    this.smoothScroll = new NgxSmoothScroll(this.elementView.nativeElement);
    for(var i=0;i<100;i++){
      this.buffer.push(0);
    }
    this.utils = new ContestedUtils(this.datasourceService);
    if (this.paras.length == 0) this.addParas();
    // this.ref.detectChanges();
  
    // this.datasourceService.getData();

    // this.datasourceService.ready.subscribe(value => { this.gotData(value) });
    // for (var i = 1695; i < 1835; i++) {
    //   this.years.push(i);
    // }

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

    // this.myValueSub = this.datasourceService.dataSource.connect().pipe(
    //   map(val => {
    //     //    console.log("cont inner");
    //     return val      //Returning Value
    //   })
    // )
    //   .subscribe(ret => {
    //    // console.log('Recd from map : ' + ret[0].election_year);
    //     this.onDataSubscriptionChange();

    //   })
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
  getAccessibliltyData(index){
    return "checK";
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

  getTitle(){
    return this.paras[this.visIndex].title;
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
    if(this.chartInstance) this.chartInstance.dispose();
    if (this.myValueSub) {
      this.myValueSub.unsubscribe();
    }
    if (this.id) {
      clearInterval(this.id);
    }
  }
  getCurrentImageSrc(){
    if(this.paras.length==0 || this.paras==null)return "";

    var src = this.paras[this.visIndex].src;
    return src
  }
  addParas() {

    var para = {
      title: "Number of elections in England",
      src:'./assets/images/newcastle/NCL_1820_slide2.jpg',
      index: 0, 
      readmore:``,
        showReadmore: false,
      showControls: false,
      widgets: [ ],
      content: `Newcastle upon Tyne was a two-member borough constituency. The right to vote was vested in the freemen of the city. They were members of the city’s Incorporated Companies (sometimes called trades or guilds), either by inheritance of enrolment. This meant a large electorate of somewhere between 2500 and 5000. Many of these freemen were not resident in Newcastle.
      The expense of transporting non-residents to vote discouraged electoral contests. There hadn’t been a contested election since 1780. By tacit agreement, a Whig and a Tory were returned, who were expected to support the interests of the commercial, manufacturing and coal mining interests.`,
      spacing: "150%"
    };
    this.paras.push(para);
    //0
    para = {
      title: "Number of elections in England",
      src:'./assets/images/newcastle/NCL_1820_slide3.jpg',
      index: 1,
      readmore:``,
      showReadmore: false,
      showControls: false  ,
      widgets: [],
      content: `The death of George III in January 1820 meant a general election.
      At that point, one of Newcastle’s sitting MPs, the Tory Cuthbert Ellison, was in Italy, recovering his health.
      Nevertheless, both he and the other sitting MP, the ‘Old Whig’ Matthew White Ridley, offered themselves for re-election (Major Robert Ellison acting on his brother’s behalf, as stated in this handbill).`,
      spacing: "150%"
    };
    this.paras.push(para);

    para = {
      title: "Number of elections in England",
      src:'./assets/images/newcastle/NCL_1820_slide4.jpg',
      index: 2,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `Ridley and Ellison canvassed in early March, visiting the halls of the city’s Incorporated Companies and incurring substantial expenses in an attempt to secure support.
      Ridley alone seems to have spent £1501 in this short period (equivalent to about 10,000 days of wages for a skilled worker).`,
      spacing: "150%"
    };
    this.paras.push(para);

    para = {
      title: "Number of elections in England",
      src:'./assets/images/newcastle/NCL_1820_slide5.jpg',
      index: 3,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `The election was fixed for Thursday 9th March. Newcastle’s freemen were invited to assemble at the Guildhall on Sandhill, by the river.
      There was so little expectation of any challenge to Ridley and Ellison that (as the Newcastle Courant reported) ‘chairs were ready at the door of the hall’ to carry the elected MPs through the town.
      However, first one rival candidate, James Graham Clarke, was announced; then a second, the Hon. William Scott.
      `,
      spacing: "150%"
    };
    this.paras.push(para);



    para = {
      title: "Number of elections in England",
      src:'./assets/images/newcastle/NCL_1820_slide6.jpg',
      index: 4, 
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `The new candidate came from a prominent Newcastle family. His father was Sir William Scott, an eminent judge and MP for Oxford University (until his elevation to the peerage as Baron Stowell in 1821). His uncle was the lord chancellor, Lord Eldon.
      The candidate himself wasn’t a Newcastle resident and was absent for his nomination. He was described in 1817 by the diarist Joseph Farington as ‘a heavy indolent young man ... who would lay in bed for a fortnight together’.
      Scott is presented in this handbill (which must have been hastily printed on 9 March) as standing for freedom and independence.`,
      spacing: "150%"
    };
    this.paras.push(para);

    para = {
      title: "Number of contested elections in England",
      src:'./assets/images/newcastle/NCL_1820_slide7.jpg',
      index: 5,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `At the Guildhall, Ridley gave a long speech.
      His nominator had expressed a hope that the new parliament would support constitutional reform. Ridley made no promises, but spoke of the ‘rights and liberties of the people’.
      Perhaps in acknowledgement of feeling in the city, where 20,000 had gathered in October 1819 to deplore the Peterloo Massacre (depicted in this print), he pointed out that he had opposed the Government’s ‘Six Acts’, recently passed to supress radical meetings.
      He also spoke of his attempts to dissuade the Government from taxing coal at source (acknowledging his self-interest in the matter).`,
      spacing: "150%"
    };
    this.paras.push(para);

    para = {
      title: "Percentage of English constituencies contested during general elections",
      src:'./assets/images/newcastle/NCL_1820_slide8.jpg',
      index: 6,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `The Sheriff called for a show of hands to decide the election.
      The majority of votes went to Ridley and Scott.
      However, Major Ellison demanded a formal poll, and the election was adjourned to the following day. Hustings were hastily erected in the Exchange, outside the Guildhall.
      Ridley addressed an ‘immense concourse of freemen and others’ from a window above the Guildhall door.`,
      spacing: "150%"
    };
    this.paras.push(para);
    // para = {
    //   title: "Percentage of English county and borough constituencies contested during general elections",
    //   src:'./assets/images/newcastle/NCL_1820_slide9.jpg',
    //   index: 7,
    //   readmore:``,
    //   showReadmore: false,
    //   showControls: false,
    //   widgets: [],
    //   content: `If we compare the rate of contested elections in counties and boroughs, you can see that county constituencies were typically contested less than boroughs – with the exception of the years between 1695 and 1710, when the reverse was true.`,
    //   spacing: "150%"
    // };
    // this.paras.push(para);
    para = {
      title: "Percentage of elections contested by franchise type in England",
      src:'./assets/images/newcastle/NCL_1820_slide9.jpg',
      index: 7,
      readmore:``,
      showReadmore: false,
      showControls: true,
      widgets: ["year"],
      content: `That evening, 9th March, saw a flurry of print, with the campaigns printing cards soliciting votes, and handbills asserting their certainty of success and requesting supporters to attend the hustings the next day to cast their ballots.      `,
      spacing: "150%"
    };
    this.paras.push(para);
    
    para = {
      title:"Percentage of large English borough constituencies contested during general elections",
      src:'./assets/images/newcastle/NCL_1820_slide10.jpg',
      index: 8,
      readmore:``,
      showReadmore: true,
      showControls: true,
      widgets: ['general'],
      content: `In Scott’s absence, his committee’s main task was to convince potential supporters that he would certainly stand.
      His opponents issued handbills warning against the folly of replacing either of the sitting MPs (‘Look before you Leap!!’, as this handbill puts it), and the wastefulness of electoral contests in general.`,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"Percentage of contested elections in English constituencies compared with the total number of elections",
      src:'./assets/images/newcastle/NCL_1820_slide11.jpg',
      index: 9,
      readmore:``,
      showReadmore: false,
      showControls: true,
      widgets: ["franchise","constituency"], 
      content: `It was a response to local and practical complaints as much as ideological principles.`,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"Acknowledgements",
      src:'./assets/images/newcastle/NCL_1820_slide12.jpg',
      index: 10,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `A handbill, reprinted in the Newcastle Courant, gives more detail on the reasons for Scott’s nomination.
      Scott’s supporters complained that ‘the Wishes and Opinions of the Freemen of Newcastle have not been sufficiently consulted in late Years’, and that the representation of Newcastle in Parliament had become little more than a cosy, family affair. (Indeed, a member of the Ridley family held a Newcastle seats from 1747 until 1836!)`,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"./assets/images/newcastle/NCL_1820_slide13.jpg",
      index: 11,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `They were also worried that Newcastle was losing ground to its commercial rivals.
      They blamed the incumbent MPs for the failure of a Newcastle-Carlisle canal, and for other curbs on trade.
      They were particularly concerned about the threatened removal of the Customs House from Newcastle to North Shields, a emerging port at the mouth of the River Tyne.
      Lord Eldon was thought to be responsible for having prevented such a move. Having his nephew as MP would cement Eldon’s support (they argued).`,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"./assets/images/newcastle/NCL_1820_slide14.jpg",
      index: 12,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `Scott’s opponents presented him as a radical.
      They scorned the methods of his campaign, accusing him of ‘parading the Town with a Band of Music, in humble imitation of Mr Polito, the wild Beast man.’
      (Stephen Polito was the owner of a famous travelling menagerie.)`,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"./assets/images/newcastle/NCL_1820_slide15.jpg",
      index: 13,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `All candidates appealed particularly to the voters of North and South Shields.
      They apologised for not being able to canvass there in person, and appointed places for each candidate’s supporters to meet there.
      One handbill urged voters to plump for Ellison.`,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"./assets/images/newcastle/NCL_1820_slide16.jpg",
      index: 14,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `A rapid-fire pamphlet war began in North and South Shields.
      Polling day saw further handbills on both sides, arguing to and fro about whether Ridley and Ellison had supported the move of the Custom House, and whether they, or Scott, would be more likely to depress the fortune of Shields by protecting the interests of Newcastle.`,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"./assets/images/newcastle/NCL_1820_slide17.jpg",
      index: 15,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `A handbill giving reasons for Scott’s nomination was adapted to target different audiences in Newcastle, North Shields, and South Shields, between 9 and 10 March. `,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"./assets/images/newcastle/NCL_1820_slide18.jpg",
      index: 16,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `Scott’s campaign also appealed to voters in Sunderland and vicinity.
      Ridley’s campaign urged the danger of ‘out-voters’ deciding the result.`,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"./assets/images/newcastle/NCL_1820_slide19.jpg",
      index: 17,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `However, as this Darlington-printed handbill shows, Ridley and Ellison’s supporters were themselves active in seeking votes from non-resident freemen. They offered to pay the cost of travel to Newcastle to vote. `,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"./assets/images/newcastle/NCL_1820_slide20.jpg",
      index: 18,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `Election ballads were hurried out for election day. (Most used the tune of Robert Burns’ ‘Scots, wha hae’, doubtless in allusion to the name of the new candidate.)`,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"./assets/images/newcastle/NCL_1820_slide21.jpg",
      index: 19,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `Also ‘squibs’, chiefly satirising Scott as an outsider with no real interest in Newcastle, who had not even appeared, and had been nominated by radicals even though he himself was an enemy of reform.
      (The note scribbled at the bottom of this squib says that Alderman Forster, who had nominated Scott, threatened to sue the printer for libel.)`,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"./assets/images/newcastle/NCL_1820_slide22.jpg",
      index: 20,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `The anti-Scott propaganda also attacked his supporters.
      Local knowledge was needed to decipher their identities. As the notes added to this ballad make clear, it was their reputations as tradesmen, and their physical characteristics, that were used to distinguish and decry them.`,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"./assets/images/newcastle/NCL_1820_slide23.jpg",
      index: 21,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `On polling day, Scott’s supporters were asked to report to their ‘tally house’ at Wallace’s and Guthrie’s, and to proceed from there to the Hustings.
      Ellison’s Tally Room was on Sandhill.
      Ridley’s supporters were urged to muster at the Turf Hotel on Collingwood Street before proceeding to vote.`,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"./assets/images/newcastle/NCL_1820_slide24.jpg",
      index: 22,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `Polling commenced on Friday 10 March, and was conducted in a festive atmosphere.
      ‘Throughout the day parties of [the candidates’] friends, decorated with favours, and preceded by bands of music, were seen parading the streets, or conducting voters to the poll.’
      These scraps of ribbon show campaign colours associated with the candidates: pink, green, and blue.`,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"./assets/images/newcastle/NCL_1820_slide25.jpg",
      index: 23,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `This rare surviving election cockade has ribbons of two different campaign colours combined. It shows, and encourages, support for Ridley (pink) and Scott (blue).
      Cockades like this might have been home-made for personal use, or produced by the campaign in larger numbers  for distribution to supporters. It may have signified the wearer’s intended voting preferences. But it might equally have been worn by someone lacking the right to vote – a woman, a child, or adult male who was not a Freeman of the city.`,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"./assets/images/newcastle/NCL_1820_slide26.jpg",
      index: 24,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `Rolling results were declared every hour or half hour, with each announcement being ‘received with great applause’ by the assembled crowd.
      Handbills were also printed to announce the changing state of the poll.
      They show that Ridley took an early lead, followed by Ellison.
      Scott lagged behind from the start.`,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"./assets/images/newcastle/NCL_1820_slide27.jpg",
      index: 25,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `At the end of the first day, Ridley, Major Ellison and Alderman Forster (on behalf of Scott) made speeches to the crowd.
      All three campaigns printed statements thanking their supporters (both at Newcastle, and Shields), simultaneously asserting confidence in success and the need for further votes as the poll progressed.  `,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"./assets/images/newcastle/NCL_1820_slide28.jpg",
      index: 26,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `Scott’s arrival from Scotland was expected after the poll closed on Friday evening.
      This handbill, printed at South Shields, claimed he had reached Newcastle, and that victory would follow.`,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"./assets/images/newcastle/NCL_1820_slide29.jpg",
      index: 27,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `In fact, Scott had not arrived.
      On the morning of the second day, therefore, Forster withdrew Scott’s candidacy. 
      The poll closed at 10am on Saturday 11 March. 
      The second morning had seen gains for Ridley and Ellison, but little further support for Scott.`,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"./assets/images/newcastle/NCL_1820_slide30.jpg",
      index: 28,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `Ridley and Ellison were declared duly elected. `,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"./assets/images/newcastle/NCL_1820_slide31.jpg",
      index: 29,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `They addressed the crowd, were ‘chaired through the principal streets of the town, the chairs being elegantly decorated with silken ribbons of their appropriate colours’, before attending a grand dinner for around a hundred guests ‘spent in the utmost harmony and conviviality.’      `,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"./assets/images/newcastle/NCL_1820_slide32.jpg",
      index: 30,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `Scott arrived from Scotland half an hour after the poll had closed. 
      This North Shields handbill calls the decision to withdraw from the contest ‘injudicious’.
      Other handbills actually bearing Scott’s signature (as well as the account printed later in the Newcastle Courant) differ by saying that Scott judged Alderman Forster to have ‘acted widely and prudently in declining to persevere’.`,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"./assets/images/newcastle/NCL_1820_slide33.jpg",
      index: 31,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `731 people cast their poll at this election.
      154 of them plumped for a single candidate  (discarding their second vote).
      577 split their votes between two candidates.`,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"./assets/images/newcastle/NCL_1820_slide34.jpg",
      index: 32,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `Those who voted for Scott were over twice as likely to plump for him (21%) as the supporters of either Ridley (10%) or Ellison (10%).
      Most of Scott’s support, however, came from voters who split their votes between him and Ridley, while Ellison relied on those who split between him and Ridley.`,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"./assets/images/newcastle/NCL_1820_slide35.jpg",
      index: 33,
      readmore:`    `,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `This area graph confirms that Ridley and Ellison drew most of their support from voters who voted for them both, but that Ridley had a much broader base.  `,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"./assets/images/newcastle/NCL_1820_slide36.jpg",
      index: 34,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `The poll book lists where each voters was resident. 
      621 of the 731 were from ‘Newcastle’, with 46 from ‘Gateshead’.
      Despite all the propaganda aimed at them, only 10 voters were listed from North Shields and 5 from South Shields.
      Most other voters came from the vicinity of Newcastle. The furthest flung were from Durham (2), Sunderland (3) and parts of Northumberland (8).
      `,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"./assets/images/newcastle/NCL_1820_slide37.jpg",
      index: 35,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `Ellison polled poorly among the voters of Newcastle itself. He was proportionately much more popular in Gateshead.
      Scott drew most of his support from Newcastle and from the few who ‘outvoters’ who polled. But, perhaps because of his association with the maintenance of the Custom House in Newcastle, he very did poorly among the voters of North and South Shields`,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"./assets/images/newcastle/NCL_1820_slide38.jpg",
      index: 36,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `The poll book records the Incorporated Companies to which each voter belonged.
      The chart shows the percentage of each trade who cast one of their votes for Scott (omitting trades with <10 voters).
      Scott received a vote from the majority of only one company, the Ropers.
      Not a single member of the Merchant Adventurers, to whom the city’s commercial elite belonged, voted for Scott.`,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"./assets/images/newcastle/NCL_1820_slide39.jpg",
      index: 37,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `Ridley by contrast did well across all the Incorporated Companies. `,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"./assets/images/newcastle/NCL_1820_slide40.jpg",
      index: 38,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `Ellison tended to secure fewer votes from the Companies whose members voted for Scott, notably the Weavers and the Ropers.
      This confirms that the entrance of Scott into the race was a threat to the Tory Ellison, but not the Whig Ridley.`,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"./assets/images/newcastle/NCL_1820_slide41.jpg",
      index: 39,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `The nomination, in absentia, of Scott briefly shook up the cosy routines of Newcastle parliamentary politics, though ultimately the status quo again prevailed. It may have been the Sheriff’s decision to hold the poll so quickly that scuppered Scott’s chances of building a sustained challenge.
      Nevertheless, though restricted in duration and the actual number of polls cast, 1820 was an expensive election, that generated much creative campaigning, including print, public addresses, song and public festivity.`,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      src:"",
      index: 40,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: ``,
      spacing: "150%"
    };



  }
}
