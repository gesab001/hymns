import { DOCUMENT } from '@angular/common';
import {Component, OnInit, ViewChild, Inject, SimpleChanges, OnChanges, HostListener, AfterViewInit} from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';


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
  elem: any;
  title = 'Seventh-day Adventist Hymnal';
  subtitle = 'We may ascend near to heaven on the wings of praise';
  hymnNumbers = Object.keys(hymnsData);
  hymnsJson = hymnsData;
  myControl = new FormControl();
  selectedLanguage = 'english ';
  filteredOptions: Observable<string[]>; 
  // isShown = false ; // hidden by default
  showFiller = true;
  currentHymn: string = '1. Praise to the Lord';
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
     if(key=="Escape"){
        this.closeFullscreen();
     }
  }
  
  constructor(@Inject(DOCUMENT) private document: any, dropboxService: DropboxService, private route: ActivatedRoute, breakpointObserver: BreakpointObserver, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
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
       this.elem = document.documentElement;

    this.route.paramMap.subscribe(params => { 
        var hymnNumber = parseInt(params.get('number'));
        console.log(hymnNumber);
        if(Number.isNaN(hymnNumber)){
          this.currentHymn = '1. Praise to the Lord';
        }else{
          this.currentHymn = this.currentHymn = this.hymnNumbers[hymnNumber-1]; 
        }


            

     });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    

 
  }
  
   ngAfterViewInit(){
         this.openFullscreen();
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
    document.activeElement.blur();
    this.closeDrawer();


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
 

  isDrawerOpen: boolean = false;
  isDrawerClose: boolean = true;
   
  openDrawer() {
     this.drawer.open();
     this.isDrawerOpen = true;
     this.isDrawerClose = false;
  }

  closeDrawer() {
     this.drawer.close();
     this.isDrawerOpen = false;
     this.isDrawerClose = true;
     this.imageIndex = this.getRandomNumberBetween(0, this.totalImages-1);
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.hymnNumbers.filter(option => option.toLowerCase().includes(filterValue));
  }
  
   openFullscreen() {
     console.log("fullscreen mode");
        if (this.elem.requestFullscreen) {
          this.elem.requestFullscreen();
        } else if (this.elem.mozRequestFullScreen) {
          /* Firefox */
          this.elem.mozRequestFullScreen();
        } else if (this.elem.webkitRequestFullscreen) {
          /* Chrome, Safari and Opera */
          this.elem.webkitRequestFullscreen();
        } else if (this.elem.msRequestFullscreen) {
          /* IE/Edge */
          this.elem.msRequestFullscreen();
        }
 }
 /* Close fullscreen */
 closeFullscreen() {
        if (this.document.exitFullscreen) {
          this.document.exitFullscreen();
        } else if (this.document.mozCancelFullScreen) {
          /* Firefox */
          this.document.mozCancelFullScreen();
        } else if (this.document.webkitExitFullscreen) {
          /* Chrome, Safari and Opera */
          this.document.webkitExitFullscreen();
        } else if (this.document.msExitFullscreen) {
          /* IE/Edge */
          this.document.msExitFullscreen();
        }
  }
}
