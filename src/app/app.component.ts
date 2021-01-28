import {Component, OnInit, ViewChild, SimpleChanges, OnChanges, HostListener} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith, takeUntil} from 'rxjs/operators';
import {ThemePalette} from '@angular/material/core';
// @ts-ignore
import hymnsData from '../assets/hymns-youtube.json';
import flowerImages from '../assets/images/flowers/image-list.json';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

import { Subject } from 'rxjs';
import { DropboxService } from './dropbox/dropbox.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [DropboxService],
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnChanges {
  updateresponse = 'waiting for response';
  subscription;
  message:number = 1;
  historylist: any;
  error = "none";
  items = [];
  value = '';
  isMobile = false;
  totalImages = flowerImages.items.length;
  imageIndex = this.getRandomNumberBetween(0, this.totalImages-1);
  currentImage = flowerImages.items[this.imageIndex];
  hymnNumberKeyBoardInput: string = "";
 
 
  
  getNewImage(){
    this.imageIndex = this.getRandomNumberBetween(0, this.totalImages-1);
    this.currentImage = flowerImages.items[this.imageIndex];
  }
 
  getRandomNumberBetween(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }
  activateWebLayout(){
     this.isMobile = false;
  };

  activateHandsetLayout(){
     this.isMobile = true;
  };
  panelOpenState = false;
  panelOpen: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
     changes.panelOpenState.currentValue;
     this.panelOpen = true;  
   }
  @ViewChild('drawer')drawer;
  title = 'Seventh-day Adventist Hymnal';
  subtitle = 'We may ascend near to heaven on the wings of praise';
  hymnNumbers = Object.keys(hymnsData);
  hymnsJson = hymnsData;
  myControl = new FormControl();
  selectedLanguage = 'english ';
  filteredOptions: Observable<string[]>; 
  // isShown = false ; // hidden by default
  showFiller = true;
  currentHymn = '1. Praise to the Lord';
  max = this.hymnsJson[this.currentHymn].verses.length - 1;
  currentVerse = 0;
  totalVerses = 0;
  slideNumber = 0;
  verseTitle = 'R';
  objExp = {"background-image": "url(./assets/images/flowers/"+this.currentImage+")", 
            "background-height": "50%", 
            "background-position": "center",
             "background-size": "cover",
             "position": "absolute",
             "top": "0",
             "bottom": "0",
             "width": "100%"
  };
 receiveMessage($event) {
    this.message = this.getRandomNumberBetween(0, this.totalImages-1);
    this.imageIndex = this.getRandomNumberBetween(0, this.totalImages-1);
    this.currentImage = flowerImages.items[this.imageIndex];
    this.objExp = {"background-image": "url(./assets/images/flowers/"+this.currentImage+")", 
            "background-height": "50%", 
            "background-position": "center",
             "background-size": "cover",
             "position": "absolute",
             "top": "0",
             "bottom": "0",
             "width": "100%"
    };

  }
  
   @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
     var key = event.key;

     var intkey = parseInt(event.key);
     var numbers = [1,2,3,4,5,6,7,8,9,0]
     if(numbers.includes(intkey)){ 

       this.hymnNumberKeyBoardInput = this.hymnNumberKeyBoardInput + key;
       //alert (this.hymnNumberKeyBoardInput);
     }
     if(key=="Enter"){
       //alert("get hymn number " + this.hymnNumberKeyBoardInput);
       var hymnNumber = parseInt(this.hymnNumberKeyBoardInput) - 1;
       
      // console.log(this.hymnNumbers[hymnNumber]);
       this.currentHymn = this.hymnNumbers[hymnNumber]; 
       this.hymnNumberKeyBoardInput = "";
       
     }
  }
  
  constructor(dropboxService: DropboxService, breakpointObserver: BreakpointObserver, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.activateHandsetLayout();
      }
      else {
        this.activateWebLayout();
      }
    });
    iconRegistry.addSvgIcon(
        'spotify',
        sanitizer.bypassSecurityTrustResourceUrl('assets/images/examples/spotify.svg'));
    iconRegistry.addSvgIcon(
        'itunes',
        sanitizer.bypassSecurityTrustResourceUrl('assets/images/examples/itunes.svg'));
    iconRegistry.addSvgIcon(
        'music-sheet',
        sanitizer.bypassSecurityTrustResourceUrl('assets/images/examples/music-sheet.svg'));
  }
  formatLabel(value: number) {
    return value + 1;
  }
  getVerseTitle(){
    return this.verseTitle;
  }


  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.currentHymn = '1. Praise to the Lord';

 
  }


  itemSelected(evt: string) {

    this.currentHymn = evt;
    this.imageIndex = this.getRandomNumberBetween(0, this.totalImages-1);
    this.currentImage = flowerImages.items[this.imageIndex];
    this.objExp = {"background-image": "url(assets/images/flowers/"+this.currentImage+")", 
            "background-height": "50%", 
            "background-position": "center",
             "background-size": "cover",
             "position": "absolute",
             "top": "0",
             "bottom": "0",
             "width": "100%"
    };


  }
  getHistory(){
      var jsondata = {};
      if('history' in localStorage){
      
        jsondata = JSON.parse(localStorage.getItem('history'));

      } else {

       jsondata = {"items": []};
      }
      return jsondata;
  }
 

  
  openDrawer(evt) {
     this.drawer.open();
  }

  closeDrawer(evt) {
     this.drawer.close();
     this.imageIndex = this.getRandomNumberBetween(0, this.totalImages-1);
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.hymnNumbers.filter(option => option.toLowerCase().includes(filterValue));
  }
}
