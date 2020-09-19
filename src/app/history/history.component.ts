import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DropboxService } from '../dropbox/dropbox.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  providers: [DropboxService],
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnChanges, OnInit {
 @Input() message: any;
  historylist: any;
  updateresponse: any;
  error = "none";
  subscription;
  items = [];
  constructor(private dropboxService: DropboxService) { }



  ngOnInit(): void {
      this.message = { "recentItem": { "title": "Praise to the Lord", "number": "1" } };
      this.getHistory();
      //this.updateHistory("test");

  }
  ngOnChanges(change: SimpleChanges){
       this.updateHistory(change.message.currentValue.recentItem);
  }	  
 getHistory() {
    this.subscription = this.dropboxService.getHistory().subscribe(
      res => (this.items = res.items, localStorage.setItem('history', JSON.stringify({'items': this.items}))), 
      error =>(this.historylist = error),
    );
  }
  
  
  updateHistory(hymn: string) {
    this.items.push(hymn);
    let jsondata = {'items': this.items};
    this.subscription = this.dropboxService.updateHistory(JSON.stringify(jsondata)).subscribe(
      res => (this.updateresponse = res), 
      error =>(this.updateresponse = error),
    );
  }

  clearHistory() {
    this.items = [];
    let jsondata = {'items': this.items};
    this.subscription = this.dropboxService.updateHistory(JSON.stringify(jsondata)).subscribe(
      res => (this.updateresponse = res), 
      error =>(this.updateresponse = error),
    );
  }
  
} 
