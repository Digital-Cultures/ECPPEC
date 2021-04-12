import { ElementRef, ApplicationRef, Component, Directive, OnInit, OnDestroy, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { HttpParams, HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
 
import { Injectable } from '@angular/core';
import { DatasourceService } from '../datasource.service';
import { TableComponent} from '../table/table.component';
import {mapStyles} from '../mapStyles';// import { FormControl } from '@angular/forms';
// import * as cloneDeep from 'lodash/cloneDeep';
// import { DoCheck, KeyValueDiffers, KeyValueChangeRecord } from '@angular/core';

// import { FilterObj } from  '../viz/viz.component';
// import { Elections } from  '../viz/viz.component';
// import { Election } from  '../viz/viz.component';

import { of } from 'rxjs';
@Component({
  selector: 'app-elections-map',
  templateUrl: './elections-map.component.html',
  styleUrls: ['./elections-map.component.scss']
})
export class ElectionsMapComponent implements OnInit {

  constructor(private datasourceService: DatasourceService) { }
 

  ngOnInit(): void {
  }
  mapReady(){

  }
  mapZoomChanged(){

  }
  mapIdle(){

  }
}
