import { ElementRef, ApplicationRef, Component, Directive, Output, EventEmitter, ViewChild } from '@angular/core';
import { GoogleMapsModule,GoogleMap } from '@angular/google-maps'

import { ResizeEvent } from 'angular-resizable-element';
import { GeojsonServiceService } from '../geojson-service.service';

import { GetElectionsService } from '../get-elections.service';

import { BoroughService } from '../borough.service';
import { CentroidsService } from '../centroids.service';
import { GetPollBooksService } from '../get-poll-books.service';
import { HOPService } from '../hop.service';

import { DownloadService } from '../download.service';
import { DownloadPollBooksService } from '../download-poll-books.service';


import { GetLatLonService } from '../get-lat-lon.service';
//import { Options, ChangeContext, PointerType } from 'ng5-slider';

import { HttpParams, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Location } from '../location';

import { MatFormFieldControl } from '@angular/material/form-field';

import { FormControl } from '@angular/forms';
import * as cloneDeep from 'lodash/cloneDeep';
import { DoCheck, KeyValueDiffers, KeyValueChangeRecord } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { PollbookDialogueComponent } from '../pollbook-dialogue/pollbook-dialogue.component';
import { DialogueComponent } from '../dialogue/dialogue.component';
import { WarningDialogueComponent } from '../warning-dialogue/warning-dialogue.component';

import { WalkthroughModule } from 'ngx-walkthrough';
import { TooltipPosition } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { Injectable } from '@angular/core';
import { ThisReceiver, ThrowStmt } from '@angular/compiler';
//import { FilterObj, Elections, Election , PollBook, PollBookResponse, HOPData} from  '../viz/viz.component';


export interface Election {
	election_year: string;
	election_month: string;
	constituency: string;
	countyboroughuniv: string;
	by_election_general: string;
	contested: string;
	election_id: string;
	franchise_type:string;
	pollbook_id: string;
	by_election_cause: string;
	notes: string;
	latitude: string;
	longitude: string;
	lat:number;
	lng:number;
}
export interface PollBook {

	BookCode: string;
	PrintMS: string;
	Citation: string;
	Holdings: string;
	Source: string;
	ElectionCode: string;
	Notes: string;
}

export interface PollBookResponse {

	num_results: number;
	poll_books: PollBook[];
}

export interface Elections {
	num_results: number;
	earliest_year: number;
	latest_year: number;
	elections: any[];
}
export interface FilterObj {
	lowValue: number;
	highValue: number;
}
export interface APIResponse {
	books: PollBook[];
}
export interface HOPData {
	innerText: string;
	yearRange: string;
	url: string;
	constituency: string;
	fetch: boolean;
}

export interface GEOJSON {
	type: string;
	features: any[];
}

export interface googleMapsMarkerWrapper {
	position: google.maps.LatLngLiteral;
	options: google.maps.MarkerOptions;
	title: string;
	type:string;
}


export interface constituency {
	lat: number;
	lng: number;
	formatted_address?: string;
	pollbooks: PollBook[];
	
}



@Component({
	templateUrl: './viz.component.html',
	styleUrls: ['./viz.component.scss']
})
export class VizComponent {
	

	private _differ: any;

	constructor(){
	}


	
	
}
