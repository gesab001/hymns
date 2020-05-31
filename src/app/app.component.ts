import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith, takeUntil} from 'rxjs/operators';
import {ThemePalette} from '@angular/material/core';
// @ts-ignore
import hymnsData from '../assets/hymns-spotify.json';
import {MatSliderChange} from '@angular/material/slider';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
// import {HttpClient, HttpClientModule, HttpParams} from '@angular/common/http';
// import {NgxSpinnerService} from 'ngx-spinner';
// import {YoutubeService} from './youtube.service';
import { Subject } from 'rxjs';
// export interface ChipColor {
//   name: string;
//   color: ThemePalette;
// }
// import { Video } from './videos';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // providers: [YoutubeService],
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  isMobile = false;
 constructor(breakpointObserver: BreakpointObserver) {
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
  }

  activateWebLayout(){
     this.isMobile = false;
  };

  activateHandsetLayout(){
     this.isMobile = true;
  };
  panelOpenState = false;
  @ViewChild('slider')slider;
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
  // availableColors: ChipColor[] = [
  //   {name: 'none', color: undefined},
  //   {name: 'Primary', color: 'primary'},
  //   {name: 'Accent', color: 'accent'},
  //   {name: 'Warn', color: 'warn'}
  // ];
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
    this.currentVerse = 0;
    this.totalVerses = 0;
    this.slideNumber = 0;
    this.slider.value = 0;
    this.verseTitle = 'R';
    this.max = 3;
    this.slider.focus();
  }

  // searchVideos(): void {
  //   this.youtubeService.searchVideos('praise to the lord')
  //     .subscribe(videos => (this.videos = videos));
  // }
  itemSelected(evt: string) {
    this.currentHymn = evt;
    this.max = this.hymnsJson[this.currentHymn].verses.length - 1;
    this.slideNumber = 0;
    this.slider.value = 0;
    this.drawer.close();
    this.slider.focus();


    // this.totalVerses = this.hymnsJson[this.currentHymn].verses.length;
  }

  onInputChange(event: MatSliderChange) {
    this.slideNumber = event.value;
  }

  onSwipeLeft(evt) {
    if (this.slideNumber < (this.hymnsJson[this.currentHymn].verses.length) - 1) {
      this.slideNumber = this.slideNumber + 1;
      this.slider.value = this.slideNumber;
      this.slider.focus();

    }
  }
  onSwipeRight(evt) {
    // alert('Swipe right!');
    if (this.slideNumber > 0) {
      this.slideNumber = this.slideNumber - 1;
      this.slider.value = this.slideNumber;
      this.slider.focus();


    }
  }
  onTap(evt){
    this.slider.focus();
    this.drawer.close();

  }
  // toggleShow() {
  //
  //   this.isShown = !this.isShown;
  // }
  // onLangChange(e) {
  //   console.log(e);
  //   const languageSelected = e.source.value;
  //   if ( this.selectedLanguage !== languageSelected){
  //
  //     this.selectedLanguage = (languageSelected);
  //
  //   }
  // }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.hymnNumbers.filter(option => option.toLowerCase().includes(filterValue));
  }
}
