import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {HammerModule} from '@angular/platform-browser';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatTableModule} from '@angular/material/table'; 
import {MatGridListModule} from '@angular/material/grid-list'; 

import { SlideshowComponent } from './slideshow/slideshow.component';
import { HymnInfoComponent } from './hymn-info/hymn-info.component';
import { YoutubeComponent } from './youtube/youtube.component';
import { SpotifyComponent } from './spotify/spotify.component';
import { ItunesComponent } from './itunes/itunes.component';

import { HttpErrorHandler }     from './http-error-handler.service';
import { MessageService }       from './message.service';



@NgModule({
  declarations: [
    AppComponent,
    SlideshowComponent,
    HymnInfoComponent,
    YoutubeComponent,
    SpotifyComponent,
    ItunesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSliderModule,
    MatSidenavModule,
    HammerModule,
    MatExpansionModule,
    MatListModule,
    MatCardModule,
    MatBadgeModule,
    HttpClientModule,
    LayoutModule,
    MatTabsModule,
    MatIconModule,
    MatTableModule,
    MatGridListModule
    
  ],
  providers: [HttpErrorHandler, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
