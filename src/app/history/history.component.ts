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
  items = {};
  constructor(private dropboxService: DropboxService) { }



  ngOnInit(): void {
      this.message = { "recentItem": { "title": "Praise to the Lord", "number": "1" } };
      this.getHistory();
      //this.updateHistory("test");

  }
  ngOnChanges(change: SimpleChanges){
      // this.updateHistory(change.message.currentValue.recentItem);
       this.getHistoryUpdate(change.message.currentValue.recentItem);

  }	  
 getHistory() {
    this.subscription = this.dropboxService.getHistory().subscribe(
      res => (this.historylist = res.items, this.items = this.historylist), 
      error =>(this.historylist = error),
    );
  }
 
 getHistoryUpdate(hymn: string) {
    this.subscription = this.dropboxService.getHistory().subscribe(
      res => (this.historylist = res.items, this.items = this.historylist, this.updateHistory(hymn)), 
      error =>(this.historylist = error),
    );
  } 
  
  updateHistory(hymn: any) {
	this.getHistory();
	this.items[hymn.number] = hymn.title;
	let jsondata = {'items': this.items};
	this.subscription = this.dropboxService.updateHistory(JSON.stringify(jsondata)).subscribe(
	  res => (this.updateresponse = res, this.getHistory()), 
	  error =>(this.updateresponse = error),
	);
	
   
  }

  clearHistory() {
  
	let password = window.prompt('please enter password');
	if (password!=null){
		if (password=='john316'){
				this.items = {};
				let jsondata = {'items': this.items};
				this.subscription = this.dropboxService.updateHistory(JSON.stringify(jsondata)).subscribe(
					res => (this.updateresponse = res, this.getHistory()), 
					error =>(this.updateresponse = error),
				);
			}else{
				alert('wrong password');
				this.clearHistory();
			}	
	}
    
  }
  
} 
