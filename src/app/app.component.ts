import { Component ,OnInit, SimpleChanges, OnChanges, ViewChild} from '@angular/core';
import { MouseEvent } from '@agm/core';

import { GeojsonServiceService } from './geojson-service.service';
// import {MatTableDataSource} from '@angular/material/table';

// import {MatPaginator} from '@angular/material/paginator';
import {DataSource} from '@angular/cdk/collections';

import { GetLocationsService } from './get-locations.service';

import { GetPollBooksService } from './get-poll-books.service';
import { HOPService } from './hop.service';

import {TooltipPosition} from '@angular/material/tooltip';

import { DownloadService } from './download.service';
import { DownloadPollBooksService } from './download-poll-books.service';


import { GetLatLonService } from './get-lat-lon.service';
import { Options, ChangeContext, PointerType } from 'ng5-slider';

import { HttpParams, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import {MatPaginator} from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';

import { Location } from './location';

import { MatFormFieldControl } from '@angular/material/form-field';
import { FormControl } from '@angular/forms';

import {MatDialog} from '@angular/material/dialog';
import { DialogueComponent } from './dialogue/dialogue.component';

// 
// @Component({
//   selector: 'dialog-elements-example-dialog',
//   templateUrl: './dialog-elements-example-dialog.html',
// })
// export class DialogElementsExampleDialog {}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})




export class AppComponent implements OnInit, OnChanges {
  
  constructor( public dialog: MatDialog) { }

  // 
    //zoom: number = 7;
    navSwitch: string = "switch_right";
    isShowing: boolean;
  myInnerHeight: number;
  sideBarWidth: number;
  sideBarContentHeight: number;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  openDialog() {
    
  }
  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
  }
  ngOnInit(){
    // this.dialog.open(DialogueComponent);
    this.myInnerHeight = window.innerHeight;
    this.sideBarContentHeight = this.myInnerHeight *0.5;
    this.sideBarWidth= window.innerWidth *0.15;
    console.log("innerHeight",this.myInnerHeight);

    setTimeout(()=>{
        
        this.isShowing =true;




      },1000);

  }
  toggleSidenav() {
   this.isShowing = !this.isShowing;
   if(this.isShowing){
    this.navSwitch = "switch_right";
   }
   else{
    this.navSwitch = "switch_left";
   }
}
    onResize(event) {
  // event.target.innerWidth;
  this.myInnerHeight = event.target.innerHeight;
  console.log(this.myInnerHeight);
  }
}

