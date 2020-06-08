import { Component,  Input, OnChanges, SimpleChanges,ViewChild, OnInit } from '@angular/core';
import { Itunes } from './itunes';
import { ItunesService } from './itunes.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-itunes',
  templateUrl: './itunes.component.html',
  providers: [ItunesService],
  styleUrls: ['./itunes.component.css']
})
export class ItunesComponent implements OnChanges{
  displayedColumns: string[] = ['title', 'artist', 'album'];

 

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
 itunesmessage = 'itunes';

 @Input() message: any;
  safeSrc: SafeResourceUrl;
  stringurl: string;
  itunes: Itunes[];

  constructor(private itunesService: ItunesService, private sanitizer: DomSanitizer) { 

   }
   ngOnChanges(changes: SimpleChanges) {
    this.searchItunes(changes.message.currentValue.filename);

    
   }

 

  searchItunes(term: string): void {
    this.itunesService.getItunes(term)
      .subscribe(itunes => (this.itunes = itunes["results"]));
    this.itunesmessage = term;
  }

  public getSafeSrc(url: string): SafeResourceUrl {
     this.stringurl = url;
     this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(this.stringurl);
     return this.safeSrc;
  }

 

}
