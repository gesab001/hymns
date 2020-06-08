import { Component,  Input, OnChanges, SimpleChanges,ViewChild, OnInit } from '@angular/core';
import { Spotify } from './spotify';
import { SpotifyService } from './spotify.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  providers: [SpotifyService],
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnChanges {
 spotifymessage = 'spotify';
  displayedColumns: string[] = ['title', 'artist', 'album'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
 @Input() message: any;
  safeSrc: SafeResourceUrl;
  stringurl: string;
  spotify: Spotify[];
  constructor(private spotifyService: SpotifyService, private sanitizer: DomSanitizer) { }
   ngOnChanges(changes: SimpleChanges) {
    this.searchSpotify(changes.message.currentValue.filename);
   }



  searchSpotify(term: string): void {
    this.spotifyService.getSpotify(term)
      .subscribe(spotify => (this.spotify = spotify["tracks"]["items"]));
    this.spotifymessage = term;
  }

  public getSafeSrc(url: string): SafeResourceUrl {
     this.stringurl = url;
     this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(this.stringurl);
     return this.safeSrc;
  }

}
