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
  addParas() {

    var para = {
      title: "Number of elections in England",
      index: 0, 
      readmore:`Much like today, eighteenth-century elections were either general elections (in which every constituency elected MPs to the House of Commons) or by-elections (in which a single parliamentary seat was filled). By-elections could be triggered by the death of an MP, their voluntary resignation, or a variety of other reasons. The graph includes both types of election: you can see the spikes in the general election years, but also observe that no year went by without at least one election being held in England.`,
       showReadmore: false,
      showControls: true,
      widgets: [ "year"],
      content: `Between 1695 and the Reform Act of 1832, 11,672 parliamentary elections were held in England. These elections determined who would represent each constituency as a Member of Parliament in the House of Commons. Hover your cursor over the graph to see how many elections were held in each year. As we will explore below, these elections were not always ‘contested’: candidates frequently ran unopposed for parliamentary seats.`,
      spacing: "150%"
    };
    this.paras.push(para);
    //0
    para = {
      title: "Number of elections in England",
      index: 1,
      readmore:`There were very good reasons to avoid contested elections in the eighteenth century. They could be hugely expensive for candidates. They could open up divisions in a community, or erupt into violent and riotous scenes. And, of course, some constituencies only permitted a very small number of people to vote, and were effectively controlled by a wealthy landowner. Some of these ‘pocket boroughs’ did not experience a single contested election between 1695 and 1832 (St. Germans, Castle Rising and Thirsk). Most elections, therefore, were decided without a poll, with the two sitting MPs simply being returned to Parliament again, or an amical arrangement being made to divide the constituency’s MPs between two rival interests. `,
      showReadmore: false,
      showControls: true  ,
      widgets: ["general", "year"],
      content: `It is a relatively modern assumption that every parliamentary election ought to be contested between multiple candidates. In the eighteenth century, the vast majority of elections were uncontested – in other words, the election did not progress to a formal poll and the taking of votes. In some cases, only one candidate would run for a seat; in others, rival candidates would drop out before the polling of votes. Of the 11,672 elections in England between 1695 and 1832, only 3,285 were contested (that’s 28%).`,
      spacing: "150%"
    };
    this.paras.push(para);

    para = {
      title: "Number of elections in England",
      index: 2,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `General elections were held more frequently during the earlier part of the century. The general election of 1695 was the first following the Triennial Act of 1694, which dictated that a general election must be held at least once every three years. This earlier period is shown in purple.`,
      spacing: "150%"
    };
    this.paras.push(para);

    para = {
      title: "Number of elections in England",
      index: 3,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `However, the Septennial Act of 1716 extended the maximum time permitted between general elections to seven years. The purple section shows that general elections were held on average every six years between 1715 and 1780.`,
      spacing: "150%"
    };
    this.paras.push(para);

    para = {
      title: "Number of elections in England",
      index: 4,
      readmore:`There were multiple reasons for this acceleration of elections. No parliament after 1768 lasted the maximum seven years allowed under the Septennial Act. This was partly due to political instability arising from the American Revolution and Napoleonic Wars, and partly because government ministers became more adept at calling elections early in order to capitalise on periods of good public opinion or catch the opposition off-guard.`,
      showReadmore: true,
      showControls: false,
      widgets: [],
      content: `After 1780, the frequency of general elections gathered pace again. Between 1802 and 1831 there was a general election almost every three years. The eighteenth century was therefore bookended by two periods of frantic electoral activity.`,
      spacing: "150%"
    };
    this.paras.push(para);

    para = {
      title: "Number of elections in England",
      index: 5, 
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `You may have noticed a big spike in the year 1701. William III called two general elections in quick succession during 1701 (held in January and November) as he wavered between supporting the two rival political parties of the day – the Tories and Whigs.`,
      spacing: "150%"
    };
    this.paras.push(para);

    para = {
      title: "Number of contested elections in England",
      index: 6,
      readmore:`General elections were far more likely to be contested than by-elections. Of the 7,838 general elections held in English constituencies between 1695 and 1832, one-third were contested (2,647 at a rate of 34%), compared to only 18% of by-elections in the same period. This is perhaps unsurprising: the simultaneous election of two MPs in almost every English constituency, with a degree of forewarning, provided greater opportunities for candidates and constituents to mount an effective campaign. However, these numbers undoubtedly underestimate the degree of electoral activity in eighteenth-century England. It should be emphasised that many constituencies saw a considerable volume of election campaigning, canvassing and other political activity, but never progressed to a formal poll – usually because one or more of the candidates withdrew from the contest, rather than exert huge expense and effort on an election which they believed they could not win. If ‘abandoned’ contests are taken into account, then our figures for contested elections in the early nineteenth would increase by as much as 50–75%.`,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `To help identify trends across the eighteenth century, we have displayed the number of contested elections as a percentage of the total number elections for each year.`,
      spacing: "150%"
    };
    this.paras.push(para);

    para = {
      title: "Percentage of English constituencies contested during general elections",
      index: 7,
      readmore:`Historians have been particularly interested in exploring these trends. Many have noted the correlation between the frequency with which general elections were held and the proportion which were contested. Between 1695 and 1715, following the Triennial Act, general elections were held on average every two years, with 40% contested. Similarly, after 1774, general elections were held more frequently, and the rate of contested elections began to rise. Frequent elections helped both to raise and maintain the political temperature, while allowing for a semblance of electoral ‘infrastructure’ to remain in place in the localities between elections, all of which probably encouraged higher proportions of contests. However, if the Septennial Act had a major impact on the number of elections contested, it was not felt for several decades after its passage, with the rates of contested elections remaining high until the 1740s. The high number of contested elections at the beginning and end of the long eighteenth century may also have been because of the development of the party system. Geoffrey Holmes termed the period 1680–1714 as the ‘first Age of Party’ in which a great polarity emerged between the Tories and Whigs, who held competing views on fundamental religious and constitutional issues. In 1705 and 1710, for example, the party political issues of the ‘Church in Danger’ and the Sacheverell Affair, respectively, fuelled bitterly contested elections throughout England. It is generally held that such animosity had cooled considerably by the mid-century, with the proportion of contested elections falling accordingly. From 1784, however, the rival personalities of William Pitt the Younger and Charles James Fox helped to reignite party conflict. Simultaneously, society as a whole was steadily politicised, and the late eighteenth century witnessed the rise of popular reform movements, petitioning campaigns, and political radicalism. The proliferation of the newspaper press helped to inject national political issues back into constituencies and stimulate more contests. Between the ‘rage of party’ at the start of the century and the rise of radicalism at the end, historians such as J. H. Plumb have identified a period of ‘political stability’, which may have suppressed the number of contested elections. Under this interpretation, the passage of the Septennial Act was a crucial moment in the ‘growth of oligarchy’ and the establishment of Whig hegemony as the government led by Sir Robert Walpole tightened its grip over the constituencies. Historians like Lewis Namier have concluded that by the 1750s the English electorate was very largely subservient to the wishes of the main ‘patrons’ (or local landowners). According to Frank O’Gorman, the number of constituencies in which a patron enjoyed complete dominance rose from around 20% to 30% over the course of the eighteenth century, while in a further 25% (rising to one-third) a patron could make recommendations which may or may not have been accepted. At the same time, the escalating cost of contested elections for the candidates and patrons involved encouraged opposing interests to reach electoral compromises and share the representation of constituencies in two-member seats. `,
      showReadmore: false,
      showControls: true,
      widgets: ["year"],
      content: `The proportion of contested elections is clearer if we focus on general elections (when every English constituency held an election simultaneously). The graph shows that the country witnessed a comparatively high proportion of contested elections between 1695 and 1734, before dropping off significantly during the mid-eighteenth century. From 1774 the rate began to recover, but failed to regain the high proportion of contested elections seen during the earlier part of the century.`,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title: "Percentage of English county and borough constituencies contested during general elections",
      index: 8,
      readmore:`English constituencies were divided between the 40 counties and 203 boroughs (usually villages, towns, or cities), plus the two university seats of Oxford and Cambridge. Many county elections were settled at ‘county meetings’ attended by the region’s leading landowners. Contests were usually avoided on account of the immense cost of transporting and ‘treating’ huge numbers of voters, and because of a desire to preserve the ‘peace and quiet’ of the county. Only in the years between 1695 and 1710 was party feeling so intense that it could override these enduring concerns.`,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `If we compare the rate of contested elections in counties and boroughs, you can see that county constituencies were typically contested less than boroughs – with the exception of the years between 1695 and 1710, when the reverse was true.`,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title: "Percentage of elections contested by franchise type in England",
      index: 9,
      readmore:`Contests tended to occur more regularly in borough constituencies with larger electorates and wider franchises. Rates of contested elections during the late seventeenth and early eighteenth centuries were distributed across all franchise types – but this changed following the mid-century. Those constituencies with the most restrictive franchise types (namely, Corporation and Burgage boroughs), which could be most easily managed by patrons, failed to recover their previous rates of contested elections during the second half of the century. Crucially, however, these boroughs – about 31% of all borough constituencies – contained only 6% of the borough electorate. By contrast, boroughs with wider franchises and larger electorates were far more politically active, and largely regained previous rates of contested elections.`,
      showReadmore: false,
      showControls: true,
      widgets: ["year"],
      content: `Let’s focus on the borough constituencies. They operated under a bewildering array of franchises (which determined who was entitled to vote). The graph shows the proportion of contested elections within each major franchise type: the ‘wider’ franchises (Freemen, Householder and Scot and Lot) tended to experience more contests when compared to the ‘restrictive’ franchises (Burgage and Corporation). Try comparing the years 1695–1715 with 1800–1832 to see how often the different franchise types were contested at the beginning and end of the long eighteenth century.`,
      spacing: "150%"
    };
    this.paras.push(para);
    
    para = {
      title:"Percentage of large English borough constituencies contested during general elections",
      index: 10,
      readmore:`The ‘large’ boroughs – which all had electorates of over 1,000 during the late eighteenth century – were: Bedford, Beverley, Bridgnorth, Bristol, Canterbury, Carlisle, Chester, Colchester, Coventry, Cricklade, Dover, Durham City, Evesham, Exeter, Gloucester, Hereford, Kingston-Upon-Hull, Lancaster, Leicester, Lincoln, Liverpool, London, Maidstone, Newark, Newcastle-upon-Tyne, Northampton, Norwich, Nottingham, Oxford, Southwark, Westminster, Worcester, York. The proportion of contested elections in these boroughs never fell below 39%, and averaged 57% across the whole period. The majority of the electorate were therefore called upon to exercise their franchise far more regularly than an average across all constituencies might suggest. This evidence also encourages us to rethink our chronology of electoral activity – suggesting that the high points of electoral conflict occurred in 1722–1734 and the early nineteenth century, rather than the ‘first Age of Party’.`,
      showReadmore: true,
      showControls: true,
      widgets: ['general'],
      content: `This graph shows the proportion of elections contested in the thirty-three largest English boroughs, which contained a full two-thirds of the total borough electorate.`,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"Percentage of contested elections in English constituencies compared with the total number of elections",
      index: 11,
      readmore:`As we have already seen, it was the boroughs with wider franchises and larger electorates which experienced the highest proportions of contested elections. These included major urban areas like Maidstone, Southwark and Coventry. By contrast, small boroughs with restrictive franchises – which fell under the management of wealthy landowners – were almost never contested, such as Thirsk, Castle Rising and St. Germans. Another interesting feature of this graph is that it was often in these ‘pocket boroughs’ that the most elections were held. They were particularly useful places where parliamentary candidates who wanted to stand for prestigious (but competitive) boroughs could be elected as ‘insurance’, in case their primary election was unsuccessful. If the candidates were successful in the larger constituency, a by-election would be held in the smaller constituency to fill the seat. Similarly, the government often used these patron-controlled constituencies as ‘safe seats’ to return their supporters. When, inevitably, that MP was promoted to government offices, he would be obliged by law to seek re-election and a by-election would ensue (almost always without opposition).`,
       showReadmore: false,
      showControls: true,
      widgets: ["franchise","constituency"], 
      content: `This graph shows the percentage of contested elections within each constituency, compared to the total number of elections it witnessed. A constituency that appears on the far right of the graph, but low down (like Yarmouth on the Isle of Wight) had lots of elections, but they were very rarely contested.`,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"Acknowledgements",
      index: 12,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: `The data behind this story comes from a number of sources to whom we are indebted. The underlying data on contested elections comes from History of Parliament: House of Commons volumes, covering the years 1690–1832, supplemented by John Cannon, ‘Polls Supplementary to the History of Parliament Volumes 1715–90’, Historical Research, 47 (1974), 110–116. Some additional contested elections have been identified by the survival of verified poll books. All other data was collated by the ECPPEC project.`,
      spacing: "150%"
    };
    this.paras.push(para);
    para = {
      title:"",
      index: 13,
      readmore:``,
      showReadmore: false,
      showControls: false,
      widgets: [],
      content: ``,
      spacing: "150%"
    };
    this.paras.push(para);


  }
}
