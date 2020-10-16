import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DownloadPollBooksService } from '../download-poll-books.service';

@Component({
  selector: 'app-pollbook-dialogue',
  // template: 'passed in {{ data.name }}',
  templateUrl: './pollbook-dialogue.component.html',
  styleUrls: ['./pollbook-dialogue.component.scss']
})
export class PollbookDialogueComponent implements OnInit {

  constructor(private downloadPollBooksService: DownloadPollBooksService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    // console.log("got data in dialogue",this.data);
  }
  	downloadPollBooks(){

			this.downloadPollBooksService.downloadFile(this.data.poll_books, 'pollBooks');
		}

}


