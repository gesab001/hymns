import { Component,  Input, OnChanges, SimpleChanges,ViewChild, OnInit } from '@angular/core';
import { WikipediaService } from './wikipedia.service';
import { Wikipedia } from './wikipedia';

@Component({
  selector: 'app-hymn-info',
  templateUrl: './hymn-info.component.html',
  styleUrls: ['./hymn-info.component.css'],
  providers: [WikipediaService],

})
export class HymnInfoComponent implements OnChanges, OnInit {

 @Input() message: any;
   wiki: Wikipedia[];

  constructor(private wikipediaService: WikipediaService) { }

  ngOnChanges(changes: SimpleChanges) {
     this.searchWikipedia(changes.message.currentValue.filename);
   
   }
   
  ngOnInit(): void {
  }

  searchWikipedia(term: string): void {
    this.wikipediaService.getWikipedia(term)
      .subscribe(wiki => (this.wiki = wiki, console.log(wiki)));
  }
}
