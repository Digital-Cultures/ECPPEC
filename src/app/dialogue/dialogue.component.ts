import { Component, OnInit } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FormControl } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
	selector: 'app-dialogue',
	templateUrl: './dialogue.component.html',
	styleUrls: ['./dialogue.component.scss']
})

export class DialogueComponent implements OnInit {
	constructor(
		private dialogRef: MatDialogRef<DialogueComponent>,
		) { }
	filteredValues = {
		Month: '', Constituency: '',Year: '', CountyBoroughUniv: '', Contested: '',ByElectionGeneral:'',PollBookCode:''

	};
	constituencyList : string []= [];
	monthList : string []= [];
	yearList : string []= [];
	constituencyFilter = new FormControl();
	monthFilter = new FormControl();
	yearFilter = new FormControl();
	yearFromFilter = new FormControl({value: '', disabled: true});
	yearToFilter = new FormControl({value: '', disabled: true});
	countyFilter = new FormControl();
	contestedFilter = new FormControl();
	byElectionGeneralFilter = new FormControl();
	pollBookCodeFilter = new FormControl();
	yearChooser: String = "single";
	ngOnInit() {
	}
	arrToCommaSeparatedString(list, value){
		var listString = "";
		if(value!=null){
			if(value.length>0){
				listString = value;
			}
			else{
				for (var i = 0; i < list.length; i++) {
					listString+=list[i]+",";
				}
			}
		}

		return listString.slice(0, -1);

	}
	closeWithRandomSearch(){
		var obj = {
			triggerRandomSearch: true,
			updateSearch:false,
			constituency:"",
			month:""  ,
			year:"",
			country:"",
			contested:"",
			byElectionGeneral:"",
			pollBookCode:""
		}
		this.dialogRef.close(obj);

	}

	save() {
		
		var yearVal = "";

		if(this.yearChooser=="single"){
			if(this.yearFilter.value!=null){
				if(this.yearFilter.value.length>=4){
					yearVal = this.yearFilter.value;
				}
			}
		}
		else if(this.yearChooser=="list"){
			if(this.yearList.length>0){
				yearVal = this.arrToCommaSeparatedString(this.yearList, this.yearFilter.value);
			}
		}
		// if(this.yearFilter.value!=null){
		// 	if(this.yearFilter.value.length>=4){

		// 	}

		// }

		if(this.yearFromFilter.value!=null && this.yearToFilter.value!=null){
			if(this.yearFromFilter.value.length==4 && this.yearToFilter.value.length==4){
				yearVal = this.yearFromFilter.value +"-"+this.yearToFilter.value;
			}

		}


		var obj = {
			updateSearch:true,
			constituency:this.arrToCommaSeparatedString(this.constituencyList, this.constituencyFilter.value),
			month:this.arrToCommaSeparatedString(this.monthList, this.monthFilter.value)  ,
			year:yearVal,
			county:this.countyFilter.value,
			contested:this.contestedFilter.value,
			byElectionGeneral:this.byElectionGeneralFilter.value,
			pollBookCode:this.pollBookCodeFilter.value
		}
		this.dialogRef.close(obj);
	}

	close() {
		console.log("closed");
		var obj = {
			updateSearch:false,
			constituency:"",
			month:""  ,
			year:"",
			country:"",
			contested:"",
			byElectionGeneral:"",
			pollBookCode:""
		}
		this.dialogRef.close(obj);
	}
	getConstituencies(){
		return this.constituencyList;
    	// if(this.constituencyFilter.value!=null){
    	// 	return this.constituencyFilter.value.split(",");
    	// }

    }
    keyDownFunction(event) {
    	if (event.keyCode === 13) {
    		this.constituencyList.push(this.constituencyFilter.value);
    		this.constituencyFilter.setValue("");
    	}
    }

    yearKeyDownFunction(event) {
    	if (event.keyCode === 13) {
    		if(this.yearChooser == "list"){
    			this.yearList.push(this.yearFilter.value);
    			this.yearFilter.setValue("");
    		}
    	}
    	// else if(this.yearChooser == "single"){
    	// 	this.yearList.push(this.yearFilter.value);
    	// }

    }

// yearKeyDownFromFunction(event) {
// 	if (event.keyCode === 13) {
// 		if(this.yearChooser == "range"){}
// 		//	this.yearList.push(this.yearFromFilter.value);
// 		this.yearFilter.setValue(this.yearFromFilter.value);
// 	}
// }
// yearKeyDownToFunction(event) {
// 	if (event.keyCode === 13) {
// 		if(this.yearChooser == "range"){}
// 		//	this.yearList.push(this.yearFromFilter.value);
// 		this.yearFilter.setValue(this.yearFilter.value+"-"+this.yearToFilter.value);
// 	}
// }


yearButtonChange(val){
	console.log("button",val);
	this.yearChooser = val;
	if(val=="single" || val=="list"){
		this.yearToFilter.setValue("");
		this.yearFromFilter.setValue("");


		this.yearFilter.enable();

		this.yearFromFilter.disable();
		this.yearToFilter.disable();
	}
	else if(val=="range"){
		this.yearFilter.setValue("");
		this.yearFilter.disable();

		this.yearFromFilter.enable();
		this.yearToFilter.enable();
	}

}
numberOnly(event): boolean {
	const charCode = (event.which) ? event.which : event.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}
	return true;

}
monthChange(event) {
    	// if (event.keyCode === 13) {
    		if(this.monthList.includes(this.monthFilter.value)){
    			alert("You already have that month in your list!");
    			this.monthFilter.setValue("");
    		}
    		else{
    			this.monthList.push(this.monthFilter.value);
    			this.monthFilter.setValue("");
    		}
    		
    	// }
    }
    constituencyClick(constituency){
    	this.constituencyList = this.constituencyList.filter(e => e !== constituency);
    }
    monthClick(month){
    	this.monthList = this.monthList.filter(e => e !== month);
    }
    yearClick(year){
    	this.yearList = this.yearList.filter(e => e !== year);
    }
}
