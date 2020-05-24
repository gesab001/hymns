import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
// @ts-ignore
import hymnsData from '../assets/hymns-options.json';
import {MatSliderChange} from '@angular/material/slider';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Seventh-day Adventist Hymnal';
  subtitle = 'We may ascend near to heaven on the wings of praise';
  list: string[] = [];
  hymnNumbers = Object.keys(hymnsData);
  hymnsJson = hymnsData;
  myControl = new FormControl();
  selectedLanguage = 'english ';
  filteredOptions: Observable<string[]>;
  // isShown = false ; // hidden by default

  currentHymn = '';
  currentVerse = 0;
  totalVerses = 0;
  slideNumber = 0;
  formatLabel(value: number) {
    // if (value >= 1000) {
    //   return Math.round(value / 1000) + 'k';
    // }

    return value + 1;
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
  }
  itemSelected(evt: string) {
    this.currentHymn = evt;
    this.slideNumber = 0;
  }

  onInputChange(event: MatSliderChange) {
    this.slideNumber = event.value;
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
