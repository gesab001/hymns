import { Component,  Input, OnChanges, SimpleChanges,ViewChild, OnInit } from '@angular/core';
import { Youtube } from './youtube';
import { YoutubeService } from './youtube.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  providers: [YoutubeService],
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnChanges{
  displayedColumns: string[] = ['preview', 'title', 'artist', 'album', 'cover'];

 

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
 youtubemessage = 'youtube';

 @Input() message: any;
  safeSrc: SafeResourceUrl;
  stringurl: string;
  youtube: Youtube[];

  constructor(private youtubeService: YoutubeService, private sanitizer: DomSanitizer) { 

   }
   ngOnChanges(changes: SimpleChanges) {
    this.searchYoutube(changes.message.currentValue.filename);

    
   }

 

  searchYoutube(term: string): void {
    this.youtubeService.getYoutube(term)
      .subscribe(youtube => (this.youtube = youtube["items"]));
    this.youtubemessage = term;
  }

  public getSafeSrc(videoId: string): SafeResourceUrl {
     this.stringurl = "https://www.youtube.com/embed/"+videoId;
     this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(this.stringurl);
     return this.safeSrc;
  }

 

}
