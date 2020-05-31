import { Component,  Input, OnChanges, SimpleChanges } from '@angular/core';
import { Spotify } from './spotify';
import { SpotifyService } from './spotify.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  providers: [SpotifyService],
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnChanges {
 spotifymessage = 'spotify';
 @Input() message: string;
  safeSrc: SafeResourceUrl;
  stringurl: string;
  spotify: Spotify[];
  constructor(private spotifyService: SpotifyService, private sanitizer: DomSanitizer) { }
   ngOnChanges(changes: SimpleChanges) {
    this.searchSpotify(changes.message.currentValue);
   }



  searchSpotify(term: string): void {
    this.spotifyService.getSpotify(term)
      .subscribe(spotify => (this.spotify = spotify));
    this.spotifymessage = term;
  }

  public getSafeSrc(id: string): SafeResourceUrl {
     this.stringurl = "https://open.spotify.com/embed/track/"+id;
     this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(this.stringurl);
     return this.safeSrc;
  }

}
