import { Component,  Input, OnChanges, SimpleChanges,ViewChild, OnInit } from '@angular/core';
import { Youtube } from './youtube';
import { YoutubeService } from './youtube.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  providers: [YoutubeService],
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnChanges{
  displayedColumns: string[] = ['preview', 'title', 'artist', 'album', 'cover'];
    deviceInfo = null;
 

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
 youtubemessage = 'youtube';

 @Input() message: any;
  safeSrc: SafeResourceUrl;
  stringurl: string;
  youtube: Youtube[];

  constructor(private youtubeService: YoutubeService, private sanitizer: DomSanitizer, private deviceService: DeviceDetectorService) 
       { this.epicFunction();}
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

  public getSafeSrcChannel(channelId: string): SafeResourceUrl {
     const isMobile = this.epicFunction();
     this.stringurl = "https://www.youtube.com/channel/"+channelId;
     if (isMobile){
         this.stringurl = "https://m.youtube.com/channel/"+channelId;
     }
     this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(this.stringurl);
     return this.safeSrc;
  }

  public epicFunction(): boolean {
      console.log('hello `Home` component');
      this.deviceInfo = this.deviceService.getDeviceInfo();
      const isMobile = this.deviceService.isMobile();
      const isTablet = this.deviceService.isTablet();
      const isDesktopDevice = this.deviceService.isDesktop();
      console.log(this.deviceInfo);
      return isMobile;
    }
 
  public goToLink(url: string){
    window.open(url, "_blank");
  }

}
