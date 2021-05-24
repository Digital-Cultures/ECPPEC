import { ElementRef, ApplicationRef, Component, Directive, Inject, OnInit, OnDestroy, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { HttpParams, HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
 
import { Injectable } from '@angular/core';
import { DatasourceService } from '../datasource.service';
import { TableComponent} from '../table/table.component';
import {mapStyles} from '../mapStyles';// import { FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


import { DialogueComponent } from '../dialogue/dialogue.component';

import { of } from 'rxjs';
@Component({
  selector: 'app-elections-map',
  templateUrl: './elections-map.component.html',
  styleUrls: ['./elections-map.component.scss']
})
export class ElectionsMapComponent implements OnInit {

  constructor(private datasourceService: DatasourceService,  public dialog: MatDialog) { }
 

  ngOnInit(): void {
    // this.tablecomponent.openDialogue();

  }
  
}
