import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Spotify } from './spotify';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

@Injectable()

export class SpotifyService {
  private handleError: HandleError;
  spotifyUrl = 'assets/spotify/tracks/';
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('HeroesService');
  }

  /** GET heroes from the server */
  getSpotify (term: string): Observable<Spotify[]> {
    return this.http.get<Spotify[]>(this.spotifyUrl+term)
      .pipe(
        catchError(this.handleError('getSpotify', []))
      );
  }

}
