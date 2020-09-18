import { Component, OnInit } from '@angular/core';
import { DropboxService } from '../dropbox/dropbox.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  providers: [DropboxService],
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  historylist: any;
  error = "none";
  subscription;
  constructor(private dropboxService: DropboxService) { }


  ngOnInit(): void {
      this.historylist = ["1"];
      this.loadData();

  }
  
 loadData() {
    this.subscription = this.dropboxService.updateHistory(2).subscribe(
      res => (this.historylist = res), 
      error =>(this.error = error),
    );
  }


} 
