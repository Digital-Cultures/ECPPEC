import { keyframes } from '@angular/animations';
import { Injectable } from '@angular/core';
import { cpuUsage } from 'process';

@Injectable({
	providedIn: 'root'
})
export class DownloadService {

	// constructor() { }

	yearExists(arr, year){
		arr.forEach(element => {
			if(element.election_year==year)return true;
		});
		return false;
	}
	compare( a, b ) {
		if ( a['election_year'] < b['election_year'] ){
		  return -1;
		}
		if ( a['election_year'] > b['election_year'] ){
		  return 1;
		}
		return 0;
	  }
	downloadElectionsByYearPerColumn(data, filename='data', filter_name) {
		var eby = [];
		//first row is column headings starting with eleciton year
		

		///get all possible value for this column
		var columns = ['election_year'];
		data.forEach(element => {
			if( columns.indexOf(element[filter_name].trim().replace(/ /g, "_"))==-1){
			
				if(element[filter_name].trim().length>0) columns.push(element[filter_name].trim().replace(/ /g, "_"));
			}
		});
		console.log("columns",columns);
		// eby.push(columns);

		data.forEach(element => {
			var thisYear = element.election_year;

			//do we already have a row for this year?
			var year_exists= false;
			for(var i=0;i<eby.length;i++){
				if(eby[i]["election_year"]==thisYear){
					year_exists=true;
				}
			}

			if(!year_exists){
				//insert a blank row apart from the year
				var row = {};
			
				for(var i=0;i<columns.length;i++){
					var n = columns[i];
					

					if(columns[i]=="election_year"){
						// var obj = {};
						// obj[n]= thisYear
						// row.push(obj);
						row[n]=thisYear;

					}
					else{
						row[n]=0;
					}
				}
				//console.log("row",row);
			//	row['election_year'] = thisYear;
				//console.log("inserting row for",thisYear,row);
				eby.push(row)
			}else{
				for(var i=0;i<eby.length;i++){
				//	console.log(eby[i]);
					if(eby[i]['election_year']==thisYear){

						//for(var j=0;j<eby[i].length;j++){
							for (const key in eby[i]) {
								if(key==element[filter_name].trim().replace(/ /g, "_")){
									eby[i][key]++;
								}
							}
					//	}
						// for(var j=0;j<eby[i].length;j++){
						// 	console.log("eby[i][j][0]",eby[i][j][0],element[filter_name].trim().replace(/ /g, "_"));
						// if(eby[i][j][0]==element[filter_name].trim().replace(/ /g, "_")){
						// 	eby[i][j][1]++
						// }
						// 	// eby[i][j][element[filter_name].trim().replace(/ /g, "_")]++;
						// }

					}
				}
			}

		});
		//this.datasourceService.dataSource.filteredData.sort(this.compare).forEach(element => {
	
		eby = eby.sort(this.compare);
		console.log("sorted",eby);
	
		//eby = eby.pop();
		
		// var refactored = [];
		// //eby.forEach(element => {
		// for(var j=0;j<eby.length;j++){
		// 	var arr = [];
		// 	console.log("eby element ",eby[j])
		// 	// element.forEach(ielement  => {
				
		// 	// });
		// 	console.log("element.length",eby[j].length, "columns.length",columns.length);
		// 	var index = 0;
		// 	eby[j].forEach(ielement => {
		// 		console.log( "element",ielement);
		// 		console.log( "columns",columns[index])
		// 		var name = columns[index];//.replace(/ /g, "_");;

		// 		console.log(name);
		// 		// arr.push({ name: element[i]});
		// 		arr[name]= eby[j][index];

		// 		index++;
		// 	});


		// 	refactored.push(arr);
		// };

	//	console.log("refactored",refactored);
		let csvData = this.ConvertToCSV(eby, columns);
		 console.log('csvData',csvData)
		let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
		let dwldLink = document.createElement("a");
		let url = URL.createObjectURL(blob);
		let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
        if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
        	dwldLink.setAttribute("target", "_blank");
        }
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", filename + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
	}
	downloadElectionsByYear(data, filename='data') {
		var eby = [];
		data.forEach(element => {
			
			var thisYear = element.election_year;
			if(!this.yearExists(eby,thisYear)){
				var obj = {
					election_year:element.election_year,
					constituencies: [{constituency:element.constituency, count: 1}],
					months: [{election_month:element.election_month, count: 1}],
					countyboroughunivs: [{countyboroughuniv:element.countyboroughuniv, count: 1}],
					contesteds: [{contested:element.contested, count: 1}],
					franchise_details: [{franchise_detail:element.franchise_detail, count: 1}],
					by_election_causes: [{by_election_cause:element.by_election_cause, count: 1}],
					lats: [{lat:element.lat, count: 1}],
					lngs: [{lng:element.lng, count: 1}],
					franchise_types: [{franchise_type:element.franchise_type, count: 1}],
					byelectiongenerals: [{byelectiongeneral:element.byelectiongeneral, count: 1}]
				}
				eby.push(element);
			}
			else{
				//find the appropriate year 
				var yindex = -1;
				eby.forEach(element, index => {
					if(element.election_year==thisYear) yindex = index;
				});
				//incrememner the count of constituenceis for this year
				eby[yindex].constituencies.forEach(y => {
					if(y.constituency ==element.constituency) element.count++;
				});
			}
		});
		let csvData = this.ConvertToCSV(data, ['constituencies','election_year', 'election_months', 'countyboroughunivs', 'contesteds',  'franchise_details','by_election_causes','lats','lngs','franchise_types','byelectiongenerals','pollbook_ids']);
		// console.log(csvData)
		let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
		let dwldLink = document.createElement("a");
		let url = URL.createObjectURL(blob);
		let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
        if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
        	dwldLink.setAttribute("target", "_blank");
        }
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", filename + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
    }
	downloadFile(data, filename='data') {
		console.log("data",data);
		let csvData = this.ConvertToCSV(data, ['constituency','election_year', 'election_month', 'countyboroughuniv', 'contested',  'franchise_detail','by_election_cause','lat','lng','franchise_type','byelectiongeneral','pollbook_id']);
		console.log("csvData",csvData)
		let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
		let dwldLink = document.createElement("a");
		let url = URL.createObjectURL(blob);
		let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
        if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
        	dwldLink.setAttribute("target", "_blank");
        }
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", filename + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
    }
    ConvertToCSV(objArray, headerList) {
    	let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    	let str = '';
    	let row = 'S.No,';
    	for (let index in headerList) {
    		row += headerList[index] + ',';
    	}
    	row = row.slice(0, -1);
    	str += row + '\r\n';
    	for (let i = 0; i < array.length; i++) {
    		let line = (i+1)+'';
    		for (let index in headerList) {
    			let head = headerList[index];
    			line += ',' + array[i][head];
    		}
    		str += line + '\r\n';
    	}
    	return str;
    }
}
