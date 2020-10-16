import { Component, OnInit,Inject } from '@angular/core';
// import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-warning-dialogue',
  templateUrl: './warning-dialogue.component.html',
  styleUrls: ['./warning-dialogue.component.scss']
})
export class WarningDialogueComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<WarningDialogueComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  	closeAndStopUnlinking(){
		var obj = {
			stopUnlinking: true
		}
		this.dialogRef.close(obj);

	}

}
