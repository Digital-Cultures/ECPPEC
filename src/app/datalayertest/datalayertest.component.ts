import { Component,Directive,EventEmitter, Output,OnDestroy,OnInit,ElementRef } from '@angular/core';
import {DataMouseEvent, DataLayerManager, AgmDataLayer} from '@agm/core';
import { Subscription } from 'rxjs/Subscription';
import { GeojsonServiceService } from '../geojson-service.service';

import {DataSource} from '@angular/cdk/collections';
export interface GEOJSON {
	type:string;
	features:any[];
}
@Component({
	selector: 'app-datalayertest',
	templateUrl: './datalayertest.component.html',
	styleUrls: ['./datalayertest.component.scss']
})
@Directive({
	selector: 'agm-data-layer'
})
export class DatalayertestComponent implements OnDestroy, OnInit {


	@Output()
	layerAddfeature = new EventEmitter<DataMouseEvent>();

	@Output()
	layerDblclick = new EventEmitter<DataMouseEvent>();

	@Output()
	layerMousedown = new EventEmitter<DataMouseEvent>();

	@Output()
	layerMouseout = new EventEmitter<DataMouseEvent>();

	@Output()
	layerMouseover = new EventEmitter<DataMouseEvent>();

	@Output()
	layerMouseup = new EventEmitter<DataMouseEvent>();

	@Output()
	layerRemovefeature = new EventEmitter<DataMouseEvent>();

	@Output()
	layerRemoveproperty = new EventEmitter<DataMouseEvent>();

	@Output()
	layerRightclick = new EventEmitter<DataMouseEvent>();

	@Output()
	layerSetgeometry = new EventEmitter<DataMouseEvent>();

	@Output()
	layerSetproperty = new EventEmitter<DataMouseEvent>();

	private _subscriptions: Subscription[] = [];


	constructor(
		private ref: ElementRef,
		private dataLayerManager: DataLayerManager,
		private agmDataLayer: AgmDataLayer,
		private geojsonServiceService:GeojsonServiceService
		) { }
	zoom: number = 7;

	geojson: GEOJSON;
	ngOnInit() {


		this.geojsonServiceService.getData()
		.subscribe((data: GEOJSON) => this.geojson = data,err => console.error(err),() => this.addIsActive() );


	}
	ngOnDestroy() {
  	// this._subscriptions.forEach(s => s.unsubscribe());
  }
  geoClicked(){
  	console.log("click!");
  }
  mouseOver(){
  	console.log("mouseOver");
  }
  addIsActive(){
  	const listeners = [
  	{ name: 'addfeature', handler: (ev) => this.layerAddfeature.emit(ev) },
  	{ name: 'dblclick', handler: (ev) => this.layerDblclick.emit(ev) },
  	{ name: 'mousedown', handler: (ev) => this.layerMousedown.emit(ev) },
  	{ name: 'mouseout', handler: (ev) => this.layerMouseout.emit(ev) },
  	{ name: 'mouseover', handler: (ev) => this.layerMouseover.emit(ev) },
  	{ name: 'mouseup', handler: (ev) => this.layerMouseup.emit(ev) },
  	{ name: 'removefeature', handler: (ev) => this.layerRemovefeature.emit(ev) },
  	{ name: 'removeproperty', handler: (ev) => this.layerRemoveproperty.emit(ev) },
  	{ name: 'rightclick', handler: (ev) => this.layerRightclick.emit(ev) },
  	{ name: 'setgeometry', handler: (ev) => this.layerSetgeometry.emit(ev) },
  	{ name: 'setproperty', handler: (ev) => this.layerSetproperty.emit(ev) }
  	];
  	console.log("agmDataLayer 1",this.agmDataLayer);
  	console.log("dataLayerManager 1",this.dataLayerManager);
  	console.log("active",this.geojson);
  	// const os = this.dataLayerManager.createEventObservable(listeners[0].name, this.agmDataLayer)


  	// listeners.forEach((obj) => {
  	// 	console.log('obj',obj);
  	// 	const os = this.dataLayerManager.createEventObservable(obj.name, this.agmDataLayer);//.subscribe(obj.handler);
  	// 	if(os!=undefined) {
  	// 		os.subscribe(obj.handler);
  	// 		this._subscriptions.push(os);
  	// 	}
  	// });

  }

}
