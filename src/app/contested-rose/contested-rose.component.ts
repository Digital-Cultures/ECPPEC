import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContestedUtils } from '../contested-utils';
import { DataStoryService } from '../data-story.service';
import { DatasourceService } from '../datasource.service';

@Component({
  selector: 'app-contested-rose',
  templateUrl: './contested-rose.component.html',
  styleUrls: ['./contested-rose.component.scss']
})
export class ContestedRoseComponent implements OnInit {

  constructor(private datasourceService: DatasourceService,private ref: ChangeDetectorRef,private dataStoryService: DataStoryService) { }
  subscription: Subscription;
  utils: ContestedUtils;
  seriesData: any[] = [] ;
  chartInstance: any;
  updateParams: any = {};
  epy: number []=[];
  years: number [] = [];
  ngOnInit(): void {
    this.utils = new ContestedUtils(this.datasourceService);
    this.datasourceService.getData();

    this.datasourceService.ready.subscribe(value => { this.gotData(value) });
    for (var i = 1695; i < 1835; i++) {
      this.years.push(i);
    }

  }
  gotData(value){
    
  }

}
