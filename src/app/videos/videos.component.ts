import { Component, Input, OnChanges } from '@angular/core';
import { Video } from './video';
import { VideosService } from './videos.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  providers: [VideosService],
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  @Input() message: string;
  safeSrc: SafeResourceUrl;
   ngOnChanges(changes: SimpleChanges) {
    this.searchVideos(changes.message.currentValue);
   }

  videos: Video[];
  constructor(private videosService: VideosService, private sanitizer: DomSanitizer) { this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/c9F5kMUfFKk");
}

  searchVideos(term: string): void {
    this.videosService.getVideos(term)
      .subscribe(videos => (this.videos = videos));
  }
}
