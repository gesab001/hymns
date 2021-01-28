import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { DeviceDetectorModule } from 'ngx-device-detector';

import { AppComponent } from './app.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { HymnInfoComponent } from './hymn-info/hymn-info.component';
import { YoutubeComponent } from './youtube/youtube.component';
import { SpotifyComponent } from './spotify/spotify.component';
import { ItunesComponent } from './itunes/itunes.component';

import { HttpErrorHandler }     from './http-error-handler.service';
import { MessageService }       from './message.service';
import { SettingsComponent } from './settings/settings.component';
import { ScoreComponent } from './score/score.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { LinksComponent } from './links/links.component';
import { MusicSheetComponent } from './music-sheet/music-sheet.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HistoryComponent } from './history/history.component';
import { LocalstorageComponent } from './localstorage/localstorage.component';
import { DropboxComponent } from './dropbox/dropbox.component';
import { GoogledriveComponent } from './googledrive/googledrive.component';
import { OnedriveComponent } from './onedrive/onedrive.component';
import { GooglephotosComponent } from './googlephotos/googlephotos.component';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    SlideshowComponent,
    HymnInfoComponent,
    YoutubeComponent,
    SpotifyComponent,
    ItunesComponent,
    SettingsComponent,
    ScoreComponent,
    DownloadsComponent,
    LinksComponent,
    MusicSheetComponent,
    HistoryComponent,
    LocalstorageComponent,
    DropboxComponent,
    GoogledriveComponent,
    OnedriveComponent,
    GooglephotosComponent
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
    MatGridListModule,
    DeviceDetectorModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule
    
  ],
  providers: [HttpErrorHandler, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
